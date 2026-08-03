import os
import sys
from instagrapi import Client

POSTS = {
    "1": {
        "title": "Day 1: 2026 연봉 세부계급 & 소득 팩트 분석",
        "image": "insta_day1_salary_kr.jpg",
        "caption": """🚨 2026년 내 연봉은 대한민국 상위 몇 %일까?

통계청 & 고용노동부 최신 소득 데이터를 바탕으로 계산한 
2026 현실 연봉·자산 15단계 계급도 공개! 🔥

💰 30대 평균연봉: 4,980만 원 (월 실수령 약 350만 원)
💰 30대 중위소득: 월 350만 원
💰 상위 10% 연봉: 8,200만 원 이상

내 소득으로 카푸어 안 당하고 살 수 있는 현실적인 차·집, 
그리고 10년 후 미래 자산 타임라인까지 3초 만에 진단받아보세요!

👇 지금 바로 무료 진단하기
[ 프로필 링크 클릭 👉 @info.test1234 ]

#2026연봉계급도 #현실연봉시뮬레이터 #연봉순위 #30대연봉 #카푸어지수 #갓생시뮬레이터 #재테크"""
    },
    "2": {
        "title": "Day 2: 2026 연봉별 현실 자동차 추천 가이드",
        "image": "insta_day2_car_kr.jpg",
        "caption": """🚗 "내 연봉에 그랜저/제네시스 타도 카푸어 안 당할까?"

실수령액 대비 고정비와 유지비를 다 따져본 
2026 현실 자동차 권장 가이드!

🚗 월 여유자금 30만 원 이하: 따릉이 & 버스/지하철 (대중교통이 최고의 재테크)
🚗 월 여유자금 35만 원 선: 캐스퍼 / 레이 (경차)
🚗 월 여유자금 50만 원 선: 아반떼 CN7 / 셀토스 (가성비 갓생 조합)
🚗 월 여유자금 100만 원 이상: 그랜저 GN7 / 제네시스 GV70

내 연봉과 자산으로 숨 쉬고 탈 수 있는 차 수준이 궁금하다면?

👇 지금 3초 만에 확인하기
[ 프로필 링크 클릭 👉 @info.test1234 ]

#카푸어지수 #2026신차 #아반떼CN7 #그랜저GN7 #제네시스G80 #연봉별자동차 #내집마련"""
    }
}

def main():
    print("=" * 60)
    print("🚀 2026 연봉계급도 인스타그램 무인 자동 업로더 (instagrapi)")
    print("=" * 60)
    print(" 1) Day 1: 2026 연봉 세부계급 & 소득 팩트 분석")
    print(" 2) Day 2: 2026 연봉별 현실 자동차 추천 가이드")
    print("=" * 60)

    choice = input("발행할 콘텐츠 번호 선택 (기본 1): ").strip()
    if choice not in POSTS:
        choice = "1"

    post_info = POSTS[choice]
    print(f"\n선택된 콘텐츠: {post_info['title']}")

    image_filename = post_info["image"]
    image_path = os.path.join(os.path.expanduser("~"), "OneDrive", "바탕 화면", image_filename)
    if not os.path.exists(image_path):
        image_path = os.path.join(os.path.dirname(__file__), image_filename)

    if not os.path.exists(image_path):
        print(f"❌ 이미지 파일을 찾을 수 없습니다: {image_path}")
        return

    DEFAULT_USERNAME = "info.test1234"
    username_input = input(f"\n인스타그램 아이디 입력 [기본값: {DEFAULT_USERNAME}]: ").strip()
    username = username_input if username_input else DEFAULT_USERNAME

    session_file = f"session_{username}.json"
    cl = Client()

    logged_in = False
    if os.path.exists(session_file):
        try:
            cl.load_settings(session_file)
            cl.login(username, "")
            print("💾 기존 저장된 세션으로 자동 로그인 성공!")
            logged_in = True
        except Exception as e:
            print("⚠️ 세션 재인증 필요...")

    if not logged_in:
        password = input("인스타그램 비밀번호 입력 (최초 1회만 저장됨): ").strip()
        if not password:
            print("❌ 비밀번호를 입력해야 합니다!")
            return
        try:
            cl.login(username, password)
            cl.dump_settings(session_file)
            print("✅ 인스타그램 로그인 및 세션 저장 성공!")
        except Exception as e:
            print(f"❌ 로그인 실패: {e}")
            return

    print(f"\n📸 이미지 업로드 중: {os.path.basename(image_path)}")
    try:
        media = cl.photo_upload(image_path, post_info["caption"])
        print("\n🎉 [100% 성공] 인스타그램 게시물이 성공적으로 발행되었습니다!")
        print(f"🔗 게시물 URL: https://www.instagram.com/p/{media.code}/")
    except Exception as e:
        print(f"❌ 업로드 중 오류 발생: {e}")

if __name__ == "__main__":
    main()
