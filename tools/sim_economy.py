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
