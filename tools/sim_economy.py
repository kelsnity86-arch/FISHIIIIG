"""경제 계산: 해역마다 다음 장비를 사서 넘어가기까지 몇 분 걸리는지 낚시를 수천 번 돌려 본다.
게임 화면은 돌리지 않고 숫자만 쓴다 (등급 확률·값은 src/config.js 와 같은 값).

python3 tools/sim_economy.py
"""
import random

GRADES = [  # 이름, 힘, 확률, 값
    ('일반', 0.5, 50, 40), ('고급', 0.7, 25, 120), ('희귀', 0.9, 13, 400),
    ('영웅', 1.15, 7, 1500), ('전설', 1.4, 3.5, 6000), ('환상', 1.7, 1.5, 0)]
CATCH_SEC = 30          # 던지기부터 어창에 싣기까지
FAIL_SEC = 16           # 줄이 끊어졌을 때 날린 시간
HOLD = 8                # 어창
HARBOR_SEC = 12         # 항구 다녀오기


def land_chance(r):
    """생물의 힘 ÷ 내 장비의 힘 = r 일 때 끌어올릴 확률. 같으면 87%, 1.7배면 44%, 4배면 2%."""
    return 1 / (1 + (r / 1.6) ** 4)


def run(pow_x, price_x, gear_x, first_gear, skills, seed=1, trials=40):
    """해역 1→8. 돌려주는 값: 해역마다 걸린 분, 낚은 수"""
    out = []
    for region in range(1, 8):
        tier = region                                  # 그 해역 단계의 장비를 갖고 있다
        cost = first_gear * gear_x ** (region - 1)     # 다음 단계 장비 값
        mins = fish = 0
        for t in range(trials):
            rnd = random.Random(seed * 1000 + region * 50 + t)
            gold = sec = n = 0; hold = []; bonus = 1.0; lv = 0
            steps = [0.05, 0.08, 0.12, 0.18] if skills else []     # 수익 스킬 4단계: 장비 값의 5·8·12·18%, 각 +25%
            while gold < cost:
                if lv < len(steps) and gold >= cost * steps[lv]:
                    gold -= cost * steps[lv]; lv += 1; bonus *= 1.25; continue
                g = rnd.choices(GRADES, [x[2] for x in GRADES])[0]
                r = g[1] * pow_x ** (region - 1) / (0.9 * pow_x ** (tier - 1))     # 장비의 힘 0.9 = 희귀 등급과 비김
                if rnd.random() < land_chance(r):
                    sec += CATCH_SEC; n += 1
                    if g[3]:
                        hold.append(g[3] * price_x ** (region - 1) * (0.7 + 1.3 * rnd.random() ** 1.6) * bonus)
                else:
                    sec += FAIL_SEC
                if len(hold) >= (HOLD + (4 if skills else 0)):
                    gold += sum(hold); hold = []; sec += HARBOR_SEC
                if not hold and gold >= cost: break
                if gold + sum(hold) >= cost:
                    gold += sum(hold); hold = []; sec += HARBOR_SEC
            mins += sec / 60; fish += n
        out.append((mins / trials, fish / trials))
    return out


# ── 장비 5종으로 나눈 계산 ──
# 한 해역 안에서 다음 단계 장비 5가지를 하나씩 산다. 살 때마다 지금 해역의 낚시가 조금씩 편해진다.
#        이름      값의 비중  사면 좋아지는 것
GEAR = [('복장',   0.10, 'price'),     # 값 +25%
        ('릴',     0.15, 'time'),      # 낚는 시간 -20%
        ('줄',     0.20, 'power'),     # 힘 ×2
        ('낚싯대', 0.25, 'power'),     # 힘 ×2  (줄과 합쳐 ×4 = 다음 해역의 힘)
        ('배',     0.30, 'unlock')]    # 다음 해역 해금, 어창 +2


def run5(pow_x, price_x, gear_x, first_gear, skills, seed=1, trials=40):
    out = []
    for region in range(1, 8):
        total = first_gear * gear_x ** (region - 1)
        mins = fish = 0; gaps = [0.0] * 5
        for t in range(trials):
            rnd = random.Random(seed * 1000 + region * 50 + t)
            gold = sec = n = 0; hold = []; price_b = 1.0; time_b = 1.0; power = 0.9; cap = HOLD + 2 * (region - 1)
            sk = [0.06, 0.14] if skills else []; lv = 0; last = 0
            for gi, (name, share, kind) in enumerate(GEAR):
                cost = total * share
                while True:
                    if lv < len(sk) and gold >= total * sk[lv]:
                        gold -= total * sk[lv]; lv += 1; price_b *= 1.5; continue     # 수익 스킬: 한 번에 ×1.5
                    if gold >= cost: break
                    g = rnd.choices(GRADES, [x[2] for x in GRADES])[0]
                    if rnd.random() < land_chance(g[1] / power):
                        sec += CATCH_SEC * time_b; n += 1
                        if g[3]: hold.append(g[3] * price_x ** (region - 1) * (0.7 + 1.3 * rnd.random() ** 1.6) * price_b)
                    else:
                        sec += FAIL_SEC * time_b
                    if len(hold) >= cap or gold + sum(hold) >= cost:
                        gold += sum(hold); hold = []; sec += HARBOR_SEC
                gold -= cost
                if kind == 'price': price_b *= 1.25
                elif kind == 'time': time_b *= 0.8
                elif kind == 'power': power *= pow_x ** 0.5
                gaps[gi] += (sec - last) / 60; last = sec
            mins += sec / 60; fish += n
        out.append((mins / trials, fish / trials, [x / trials for x in gaps]))
    return out


if __name__ == '__main__':
    print('끌어올릴 확률 (장비 대비 생물의 힘): ' + ', '.join(f'{g[0]} {land_chance(g[1] / 0.9) * 100:.0f}%' for g in GRADES))
    print('  장비가 한 단계 모자랄 때(힘 4배): ' + ', '.join(f'{g[0]} {land_chance(g[1] * 4 / 0.9) * 100:.0f}%' for g in GRADES))
    for name, px, vx, gx, first in [('기본안  힘×4 값×6 장비×8', 4, 6, 8, 12000), ('가파르게 힘×5 값×8 장비×12', 5, 8, 12, 12000), ('완만하게 힘×3 값×5 장비×6', 3, 5, 6, 12000)]:
        print(f'\n{name}  (첫 장비 {first:,} G)')
        a, b = run(px, vx, gx, first, False), run(px, vx, gx, first, True)
        print('  넘어갈 해역 | 스킬 없이: 분 (마리) | 스킬 찍고: 분 (마리)')
        for i, ((m0, f0), (m1, f1)) in enumerate(zip(a, b)):
            print(f'   {i + 1} → {i + 2}    | {m0:7.0f} ({f0:5.0f})      | {m1:7.0f} ({f1:5.0f})')
        print(f'   합계        | {sum(x[0] for x in a) / 60:7.1f} 시간         | {sum(x[0] for x in b) / 60:7.1f} 시간')

    print('\n\n=== 장비 5종 (복장 → 릴 → 줄 → 낚싯대 → 배 순서로 삼), 기본안 힘×4 값×6 장비×8 ===')
    for label, sk in (('스킬 없이', False), ('스킬 찍고 (수익 ×1.5 두 번)', True)):
        r = run5(4, 6, 8, 12000, sk)
        print(f'\n{label}')
        print('  넘어갈 해역 | 합계 분 (마리) | 살 때마다 걸린 분: 복장  릴  줄  낚싯대  배')
        for i, (m, f, gaps) in enumerate(r):
            print(f'   {i + 1} → {i + 2}    | {m:6.0f} ({f:4.0f})   | ' + '  '.join(f'{x:4.0f}' for x in gaps))
        print(f'   합계        | {sum(x[0] for x in r) / 60:6.1f} 시간')


# ══ 골드로 계속 찍는 구조: 장비 5종 × 단계마다 10강 + 스킬 노드(레벨 무제한) ══
# 계산은 평균값으로 한다 (수입 = 초당 평균 골드). 사는 순서: 본전을 가장 빨리 뽑는 것부터,
# 본전이 4분 넘게 걸리는 것만 남으면 다음 해역에 필요한 것(줄·낚싯대·배)을 모아서 산다.
import math

STEP_W = [1.15 ** j for j in range(9)] + [1.15 ** 9 * 3]          # 한 단계 안의 10번: 9번의 강화 + 마지막은 새 장비(3배)
STEP_W = [w / sum(STEP_W) for w in STEP_W]
# 스킬 노드: 수익·행운은 레벨마다 값이 조금씩 곱해지고(×1.02, ×1.015), 효율은 낚는 속도가 더해진다(+2%, 최대 2배).
# 값은 레벨마다 1.15배. 효과를 약하게 잡아야 한다: 세게 잡으면 스킬만으로 수입이 폭발해 해역의 벽이 무의미해진다.
SK = {'수익': 1.02, '효율': 0.02, '행운': 1.015}
MILE = {10: 1.1, 25: 1.1, 50: 1.15, 100: 1.2}                     # 마일스톤 보너스 (그 노드 전체에 곱)

def plan(pow_x, price_x, gear_x, first_gear, payback=600.0, skill_base=0.003):
    lv = {g[0]: 0 for g in GEAR}                                   # 장비 레벨: 10 = 다음 단계 장비
    sk = {k: 0 for k in SK}
    gold = t = 0.0; region = 1; log = []; buys = 0; t0 = 0.0; b0 = 0

    def rate(lv, sk, region):
        power = 0.9 * pow_x ** (0.05 * (lv['줄'] + lv['낚싯대']))
        def node(n):
            v = SK[n] ** sk[n] if SK[n] > 1 else 1 + SK[n] * sk[n]
            for m, b in MILE.items():
                if sk[n] >= m: v *= b
            return v
        price_m = 1.25 ** (lv['복장'] / 10) * node('수익') * node('행운')
        time_m = max(0.3, 0.8 ** (lv['릴'] / 10)) / min(2.0, node('효율'))
        cap = HOLD + 2 * (lv['배'] // 10)
        wsum = sum(g[2] for g in GRADES); val = sec = landed = 0.0
        for name, gp, w, price in GRADES:
            p = land_chance(gp * pow_x ** (region - 1) / power); w /= wsum
            val += w * p * price * price_x ** (region - 1) * 1.2 * price_m
            sec += w * (p * CATCH_SEC + (1 - p) * FAIL_SEC) * time_m
            landed += w * p
        return val / (sec + landed * HARBOR_SEC / cap)

    def gear_cost(name, share):
        tier, step = divmod(lv[name], 10)
        return first_gear * gear_x ** tier * share * STEP_W[step]

    while region < 8:
        r = rate(lv, sk, region)
        opts = []
        for name, share, kind in GEAR:
            if lv[name] >= region * 10: continue                    # 이 해역에서 살 수 있는 것은 다음 단계 장비까지
            c = gear_cost(name, share); l2 = dict(lv); l2[name] += 1
            opts.append((c, rate(l2, sk, region) - r, 'g', name))
        for node in SK:
            c = first_gear * skill_base * 1.15 ** sk[node]; s2 = dict(sk); s2[node] += 1
            opts.append((c, rate(lv, s2, region) - r, 's', node))
        good = [o for o in opts if o[1] > 0 and o[0] / o[1] < payback]
        if good: c, _, kind, name = min(good, key=lambda o: o[0] / o[1])
        else:
            need = [o for o in opts if o[2] == 'g' and o[3] in ('줄', '낚싯대', '배')]
            if not need: need = [o for o in opts if o[2] == 'g']
            c, _, kind, name = min(need, key=lambda o: o[0])
        if gold < c: t += (c - gold) / r; gold = c
        gold -= c; buys += 1
        if kind == 'g': lv[name] += 1
        else: sk[name] += 1
        if all(lv[n] >= region * 10 for n in ('줄', '낚싯대', '배')):
            log.append(((t - t0) / 60, buys - b0, dict(sk))); t0, b0 = t, buys; region += 1
    return t / 3600, log


def tune(target_h, gear_x, pow_x=4, price_x=6):
    """전체 길이가 target_h 시간이 되는 첫 장비 값"""
    lo, hi = 500.0, 5e7
    for _ in range(50):
        mid = math.sqrt(lo * hi)
        if plan(pow_x, price_x, gear_x, mid)[0] < target_h: lo = mid
        else: hi = mid
    return math.sqrt(lo * hi)


if __name__ == '__main__':
    print('\n\n=== 골드로 계속 찍는 구조 (장비 5종 × 10강, 스킬 노드 무제한) — 힘×4 값×6 고정 ===')
    print('장비 배율은 "해역마다 걸리는 시간이 고르게 늘어나도록", 첫 장비 값은 전체 길이에 맞춰 찾는다.')
    for h in (3, 5, 10):
        best = None
        for gx in range(14, 71, 2):
            first = tune(h, gx); total, log = plan(4, 6, gx, first)
            ms = [x[0] for x in log]
            # 고르게 늘어나는 정도: 이웃한 해역의 시간 비율이 1.4 에서 얼마나 벗어나는가
            err = sum(abs(math.log(ms[i + 1] / ms[i]) - math.log(1.4)) for i in range(len(ms) - 1))
            if best is None or err < best[0]: best = (err, gx, first, total, log)
        _, gx, first, total, log = best
        n = sum(x[1] for x in log)
        print(f'\n목표 {h}시간 → 장비 배율 ×{gx}, 첫 단계 장비 한 벌 {first:,.0f} G  (실제 {total:.1f}시간, 구매 {n}번, 평균 {total * 3600 / n:.0f}초마다 한 번)')
        print('  넘어갈 해역 | 분    | 구매 수 | 초/구매 | 스킬 레벨 (수익·효율·행운)')
        for i, (m, b, sk_) in enumerate(log):
            print(f'   {i + 1} → {i + 2}    | {m:5.0f} | {b:5d}   | {m * 60 / b:5.0f}   | {sk_["수익"]}·{sk_["효율"]}·{sk_["행운"]}')
