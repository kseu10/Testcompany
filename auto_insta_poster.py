import os
import sys

# Windows CP949 인코딩 유니코드(이모지) 에러 방지
if sys.platform.startswith('win'):
    try:
        sys.stdout.reconfigure(encoding='utf-8')
        sys.stderr.reconfigure(encoding='utf-8')
    except Exception:
        pass

from instagrapi import Client

# 총 12개의 프로젝트 콘텐츠 12일 자동 순환 (매일 다른 게시물)
POSTS = {
    "1": {
        "title": "Day 1: 2026 연봉 세부계급 & 소득 팩트 분석",
        "image": "insta_day1_salary_kr.jpg",
        "caption": """🚨 2026년 내 연봉은 대한민국 상위 몇 %일까?

통계청 최신 데이터를 바탕으로 계산한 
2026 현실 연봉·자산 15단계 계급도 공개! 🔥

내 소득으로 카푸어 안 당하고 살 수 있는 현실적인 차·집, 
그리고 10년 후 미래 자산 타임라인까지 3초 만에 진단받아보세요!

👇 지금 바로 무료 진단하기
[ 프로필 링크 클릭 👉 @info.test1234 ]

#연봉계급도 #현실연봉시뮬레이터 #30대연봉 #카푸어지수 #재테크"""
    },
    "2": {
        "title": "Day 2: 최악의 직장 상사 32강 월드컵",
        "image": "boss_13_rude.jpg",
        "caption": """🔥 "퇴사 마려운 최악의 직장 상사 1위는?"

매일 화내는 분노조절장애 상사 VS 내 공 가로채는 얌체 상사!
대한민국 직장인들이 뽑은 최악의 빌런 상사 32강 월드컵! 🏆

당신의 혈압을 오르게 하는 최악의 상사는 누구인가요?
직장인 공감 200% 분노 테스트!

👇 지금 바로 월드컵 시작하기
[ 프로필 링크 클릭 👉 @info.test1234 ]

#이상형월드컵 #상사월드컵 #퇴사마려울때 #직장인공감 #빌런상사 #직장생활"""
    },
    "3": {
        "title": "Day 3: MBTI 연애 부캐 테스트",
        "image": "love_doodle.jpg",
        "caption": """💖 "나의 숨겨진 연애 세포 부캐는?"

귀여운 일러스트와 함께 알아보는 나의 찐 연애 스타일! 🥰
친구, 연인과 함께 해보면 뼈 맞는 MBTI 연애 부캐 테스트!

당신의 연애 매력 포인트와 찰떡 궁합/상극 부캐를 지금 바로 확인해보세요!

👇 나의 연애 부캐 진단하기
[ 프로필 링크 클릭 👉 @info.test1234 ]

#연애테스트 #심리테스트 #MBTI연애 #연애부캐 #커플테스트 #mbti유형"""
    },
    "4": {
        "title": "Day 4: 최악의 지하철/대중교통 밉상 월드컵",
        "image": "wc_petty_bus.jpg",
        "caption": """🚇 "출퇴근길 진짜 명존쎄 때리고 싶은 최악의 민폐객은?"

백팩으로 밀고 들어오는 사람 VS 안 내렸는데 타는 사람!
지하철/버스 출퇴근러 공감 500% 밉상 월드컵! 🏆

당신이 겪어본 최악의 대중교통 빌런을 우승시켜 보세요!

👇 밉상 월드컵 플레이하기
[ 프로필 링크 클릭 👉 @info.test1234 ]

#지하철빌런 #대중교통민폐 #이상형월드컵 #직장인출근길 #공감월드컵"""
    },
    "5": {
        "title": "Day 5: 직장인 업무 성향 부캐 테스트",
        "image": "work_doodle.jpg",
        "caption": """💻 "회사에서의 진짜 내 모습은?"

워커홀릭? 프로월급루팡? 
MBTI 기반 직장인 업무 성향 팩폭 테스트! 📊

상사에게 절대 들키면 안 되는 나의 진짜 오피스 부캐를 찾아보세요!

👇 오피스 부캐 테스트하기
[ 프로필 링크 클릭 👉 @info.test1234 ]

#직장인테스트 #오피스부캐 #MBTI검사 #성향테스트 #직장인공감 #심리테스트"""
    },
    "6": {
        "title": "Day 6: 최악의 영화관 관크 월드컵",
        "image": "wc_movie_phone.jpg",
        "caption": """🎬 "영화관에서 만난 최악의 관크 1위는?"

시작부터 끝까지 폰 반딧불이 VS 중요 장면에서 스포일러 투척!
진짜 팝콘 던지고 싶은 최악의 영화관 빌런 월드컵 🏆

여러분이 겪은 최악의 관크는 무엇인가요?

👇 영화관 빌런 월드컵 시작
[ 프로필 링크 클릭 👉 @info.test1234 ]

#영화관크 #관크월드컵 #이상형월드컵 #영화관민폐 #영화추천"""
    },
    "7": {
        "title": "Day 7: 나의 평생 사주 & 수호 동물 진단",
        "image": "saju_doodle.jpg",
        "caption": """🐯 "내 사주팔자에 숨겨진 평생 수호 동물은?"

어려운 한자 없이 귀여운 일러스트로 풀어보는 
나의 평생 사주 & 재물운 풀이! 🔮

내 사주를 상징하는 귀여운 수호 캐릭터와 2026년 대운을 확인해보세요!

👇 무료 사주 풀이하기
[ 프로필 링크 클릭 👉 @info.test1234 ]

#무료사주 #사주팔자 #신년운세 #운세테스트 #수호동물 #성격테스트"""
    },
    "8": {
        "title": "Day 8: 소비 요정 성향 테스트",
        "image": "spending_1.jpg",
        "caption": """💸 "나는 탕진요정일까, 프로저축러일까?"

월급 며칠 만에 텅장 되는 사람 필수 시청!
당신의 소비 패턴을 뼈 때리는 소비 부캐 테스트 💳

나는 과연 어떤 스타일의 쇼퍼홀릭일까요?

👇 나의 소비 성향 알아보기
[ 프로필 링크 클릭 👉 @info.test1234 ]

#소비테스트 #재테크 #짠테크 #심리테스트 #텅장 #소비요정"""
    },
    "9": {
        "title": "Day 9: 최악의 여행 메이트 월드컵",
        "image": "wc_travel_stingy.jpg",
        "caption": """✈️ "같이 여행 가면 무조건 손절각인 친구 1위는?"

모든 일정에 불만만 갖는 징징이 VS 돈 계산할 때만 화장실 가는 짠돌이!
최악의 여행 빌런 월드컵 32강! 🏆

우정 파괴 여행 메이트, 당신의 최악의 선택은?

👇 여행 빌런 월드컵 하기
[ 프로필 링크 클릭 👉 @info.test1234 ]

#여행메이트 #여행빌런 #이상형월드컵 #손절각 #여행스타그램 #우정테스트"""
    },
    "10": {
        "title": "Day 10: 멘탈 생존력 성향 테스트",
        "image": "mental_1.jpg",
        "caption": """🛡️ "나의 유리멘탈 지수는 얼마나 될까?"

위기 상황에서 빛나는 당신의 멘탈 생존력 테스트! 🧠
나는 강철 멘탈일까, 쿠크다스 멘탈일까?

귀여운 멘탈 부캐 캐릭터와 함께 내 멘탈을 진단해 보세요!

👇 멘탈 테스트 시작하기
[ 프로필 링크 클릭 👉 @info.test1234 ]

#멘탈테스트 #심리테스트 #스트레스테스트 #강철멘탈 #유리멘탈 #성향검사"""
    },
    "11": {
        "title": "Day 11: 2026 연봉별 현실 자동차 추천 가이드",
        "image": "insta_day2_car_kr.jpg",
        "caption": """🚗 "내 연봉에 그랜저 타면 카푸어 될까?"

실수령액과 유지비를 철저히 분석한 2026 현실 자동차 권장 가이드!
여유자금별 추천 차종 팩트 체크 완료! ✔️

내 소득으로 숨 쉬고 탈 수 있는 차 수준이 궁금하다면?

👇 3초 만에 카푸어 지수 확인하기
[ 프로필 링크 클릭 👉 @info.test1234 ]

#카푸어지수 #연봉별자동차 #현실차추천 #아반떼 #그랜저 #제네시스"""
    },
    "12": {
        "title": "Day 12: 오늘의 행운 부적 뽑기",
        "image": "today_doodle.jpg",
        "caption": """🍀 "오늘 나에게 필요한 행운의 기운은?"

매일 아침 확인하는 귀여운 행운 부적 & 운세 뽑기! 🔮
오늘 나의 재물운, 애정운, 직장운을 1초 만에 확인하세요!

스토리에 공유하고 행운을 나눠보세요!

👇 오늘의 운세 부적 뽑기
[ 프로필 링크 클릭 👉 @info.test1234 ]

#오늘의운세 #무료운세 #행운부적 #타로 #일일운세 #운세테스트"""
    }
}

def safe_print(msg):
    try:
        print(msg)
    except Exception:
        try:
            print(msg.encode('utf-8', 'ignore').decode('cp949', 'ignore'))
        except Exception:
            pass

def main():
    is_auto = "--auto" in sys.argv
    safe_print("============================================================")
    safe_print("[2026 부업 통합 플랫폼] 인스타그램 12일 순환 무인 자동 업로더")
    safe_print("============================================================")

    if is_auto:
        from datetime import datetime
        # 1일부터 12일까지 순환 (12일 주기)
        # 만약 13일이면 1번 콘텐츠, 14일이면 2번 콘텐츠 등 자동 배정
        day_of_year = datetime.now().timetuple().tm_yday
        choice_num = (day_of_year % 12) + 1
        choice = str(choice_num)
        safe_print(f"[자동 모드] 날짜 기준 콘텐츠 {choice}번(총 12개 중) 자동 선택됨")
    else:
        for k, v in POSTS.items():
            safe_print(f" {k}) {v['title']}")
        safe_print("============================================================")
        choice = input("발행할 콘텐츠 번호 선택 (기본 1): ").strip()
        if choice not in POSTS:
            choice = "1"

    post_info = POSTS[choice]
    safe_print(f"\n선택된 콘텐츠: {post_info['title']}")

    image_filename = post_info["image"]
    image_path = os.path.join(os.path.expanduser("~"), "OneDrive", "바탕 화면", image_filename)
    if not os.path.exists(image_path):
        image_path = os.path.join(os.path.dirname(__file__), image_filename)

    if not os.path.exists(image_path):
        safe_print(f"[오류] 이미지 파일을 찾을 수 없습니다: {image_path}")
        return

    # 저장된 세션 파일명 자동 탐색
    saved_session = None
    for file in os.listdir(os.path.dirname(os.path.abspath(__file__))):
        if file.startswith("session_") and file.endswith(".json"):
            saved_session = file
            break
            
    if saved_session:
        username = saved_session.replace("session_", "").replace(".json", "")
    else:
        if is_auto:
            safe_print("[오류] 자동 모드 실패: 저장된 세션 파일이 없습니다. 수동으로 1회 실행하여 로그인하세요.")
            return
        username = input("\n인스타그램 로그인 아이디(이메일 또는 전화번호/사용자명) 입력: ").strip()
        if not username:
            safe_print("[오류] 아이디를 입력해야 진행할 수 있습니다!")
            return

    session_file = os.path.join(os.path.dirname(os.path.abspath(__file__)), f"session_{username}.json")
    cl = Client()

    logged_in = False
    if os.path.exists(session_file):
        try:
            cl.load_settings(session_file)
            cl.login(username, "")
            safe_print(f"[성공] 기존 세션({username})으로 자동 로그인 완료!")
            logged_in = True
        except Exception:
            safe_print("[안내] 기존 세션 만료. 로그인 정보를 재입력하세요.")

    if not logged_in:
        if is_auto:
            safe_print("[오류] 자동 모드 실패: 로그인이 풀렸습니다. 수동으로 1회 로그인하세요.")
            return
            
        password = input(f"[{username}] 비밀번호 입력 (최초 1회만 저장됨): ").strip()
        if not password:
            safe_print("[오류] 비밀번호를 입력해야 합니다!")
            return
        try:
            cl.login(username, password)
            cl.dump_settings(session_file)
            safe_print("[성공] 로그인 성공 및 세션 저장 완료!")
        except Exception as e:
            safe_print(f"[오류] 로그인 실패: {e}")
            return

    safe_print(f"\n[진행중] 이미지 전처리 및 업로드 준비: {os.path.basename(image_path)}")
    try:
        from PIL import Image
        with Image.open(image_path) as img:
            img = img.convert('RGB')
            # 1080x1080 비율에 맞춰 자르거나 리사이징 (여백은 흰색)
            img.thumbnail((1080, 1080), Image.Resampling.LANCZOS)
            new_img = Image.new("RGB", (1080, 1080), (255, 255, 255))
            new_img.paste(img, ((1080 - img.size[0]) // 2, (1080 - img.size[1]) // 2))
            
            processed_path = os.path.join(os.path.dirname(__file__), "upload_temp.jpg")
            new_img.save(processed_path, "JPEG", quality=95)
            upload_target = processed_path
    except Exception:
        upload_target = image_path

    safe_print("[진행중] 인스타그램 게시글 업로드 전송 중...")
    try:
        media = cl.photo_upload(upload_target, post_info["caption"])
        post_url = f"https://www.instagram.com/p/{media.code}/"
        safe_print("\n[축하합니다!] 인스타그램 게시물이 100% 정상 업로드되었습니다!")
        safe_print(f"게시물 URL: {post_url}")
        
        if not is_auto:
            import webbrowser
            webbrowser.open(post_url)
    except Exception as e:
        safe_print(f"[오류] 업로드 중 예외 발생: {e}")

if __name__ == "__main__":
    main()
