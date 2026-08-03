import os
import sys
from instagrapi import Client

def main():
    print("=" * 60)
    print("🚀 2026 연봉계급도 인스타그램 무인 자동 업로더 (instagrapi)")
    print("=" * 60)

    # 1. 인스타그램 로그인 정보 설정
    username = input("인스타그램 아이디 입력 (예: info.test1234): ").strip()
    password = input("인스타그램 비밀번호 입력: ").strip()

    if not username or not password:
        print("❌ 아이디와 비밀번호를 모두 입력해야 합니다!")
        return

    image_path = os.path.join(os.path.expanduser("~"), "OneDrive", "바탕 화면", "insta_day1_salary_kr.jpg")
    if not os.path.exists(image_path):
        image_path = os.path.join(os.path.dirname(__file__), "insta_day1_salary_kr.jpg")

    if not os.path.exists(image_path):
        print(f"❌ 이미지 파일을 찾을 수 없습니다: {image_path}")
        return

    caption = """🚨 2026년 내 연봉은 대한민국 상위 몇 %일까?

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

    print(f"\n🔑 계정 (@{username}) 로그인 중...")
    cl = Client()
    
    session_file = f"session_{username}.json"
    if os.path.exists(session_file):
        try:
            cl.load_settings(session_file)
            print("💾 세션 설정 로드 완료!")
        except Exception as e:
            print(f"⚠️ 세션 로드 실패: {e}")

    try:
        cl.login(username, password)
        cl.dump_settings(session_file)
        print("✅ 인스타그램 로그인 성공!")
    except Exception as e:
        print(f"❌ 로그인 실패: {e}")
        return

    print(f"\n📸 이미지 업로드 중: {os.path.basename(image_path)}")
    try:
        media = cl.photo_upload(image_path, caption)
        print("🎉 [100% 성공] 인스타그램 게시물이 자동으로 성공적으로 발행되었습니다!")
        print(f"🔗 게시물 URL: https://www.instagram.com/p/{media.code}/")
    except Exception as e:
        print(f"❌ 업로드 중 오류 발생: {e}")

if __name__ == "__main__":
    main()
