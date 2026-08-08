import os
import sys
import random
import time
import urllib.request
import urllib.parse
from datetime import datetime

# Windows CP949 인코딩 유니코드(이모지) 에러 방지
if sys.platform.startswith('win'):
    try:
        sys.stdout.reconfigure(encoding='utf-8')
        sys.stderr.reconfigure(encoding='utf-8')
    except Exception:
        pass

from instagrapi import Client

# ---------------------------------------------------------
# [1] 기존에 만든 플랫폼 12개 테스트 (수동 선택용 보존)
# ---------------------------------------------------------
POSTS = {
    "1": {"title": "Day 1: 연봉 계급도", "image": "insta_day1_salary_kr.jpg", "caption": "🚨 2026년 내 연봉은 대한민국 상위 몇 %일까?\n... (생략) ...\n\n👇 지금 바로 진단하기\n[ 프로필 링크 클릭 👉 @info.test1234 ]\n#연봉계급도 #재테크"},
    # (기타 기존 포스트 정보 간소화 보존 또는 생략 - 실제로는 로컬 이미지를 씀)
    # 기존 코드 호환을 위해 최소한의 구조 유지
}

# ---------------------------------------------------------
# [2] 🔥 AI 무한 트렌드 자동 생성기 (매일 새로운 주제 + AI 이미지)
# ---------------------------------------------------------
TREND_SUBJECTS = [
    ("ENFP", "highly stylized beautiful young korean woman, bright trendy outfit, clean minimalistic vector art, pastel colors"),
    ("INTJ", "handsome intelligent young korean man, chic minimalist outfit, modern clean vector illustration, dark mode aesthetic"),
    ("INTP", "stylish young korean woman, cozy oversized clothes, coffee cup, modern minimal vector art"),
    ("ENTJ", "charismatic handsome young korean man in modern casual suit, confident pose, clean vector illustration"),
    ("ISFJ", "warm friendly beautiful young korean woman, soft knit sweater, cozy aesthetic, flat vector illustration"),
    ("ESTP", "cool trendy young korean man with sunglasses, street fashion, vibrant minimal vector art"),
    ("강아지상", "extremely beautiful young korean woman with innocent large eyes, cute trendy fashion, soft minimal vector illustration"),
    ("고양이상", "chic gorgeous young korean woman with sharp cat-like eyes, trendy fashion, modern vector illustration"),
    ("여우상", "charming attractive young korean man with sharp eyes, sleek modern fashion, clean minimal vector art"),
    ("토끼상", "lovely cute young korean woman with bright smile, pastel outfit, aesthetic flat vector illustration"),
    ("A형", "neatly dressed handsome young korean man, smart casual, clean minimalistic vector aesthetic"),
    ("B형", "free-spirited trendy young korean woman, stylish dynamic pose, vibrant aesthetic vector art"),
    ("O형", "cheerful social beautiful young korean woman, bright smile, pastel trendy vector illustration"),
    ("AB형", "mysterious attractive young korean man, chic minimalist style, modern flat vector art"),
]

TREND_TOPICS = [
    ("연애 스타일", "💖 {subject}의 찐 연애 스타일 분석!\n\n과연 {subject}은(는) 연애할 때 어떤 모습일까?\n뼈때리는 팩폭 분석! 맞는지 태그해서 확인해보세요!"),
    ("소비 습관", "💸 {subject}의 텅장 주의보! 소비 습관 팩폭\n\n월급 받자마자 사라지는 마술? {subject}의 돈 쓰는 스타일 완벽 분석!"),
    ("직장 생활", "💻 {subject}의 오피스 라이프!\n\n회사에서 {subject}은(는) 어떤 부캐일까? 프로월급루팡 vs 워커홀릭!"),
    ("싸웠을 때", "🔥 {subject}와(과) 싸웠을 때 대처법!\n\n절대 하면 안 되는 행동은? {subject} 화풀어주는 꿀팁 대방출!"),
    ("이상형", "😍 {subject}가 푹 빠지는 운명의 이상형은?\n\n외모보다 OOO을 본다고? {subject} 꼬시는 법 완벽 공략 가이드!"),
    ("스트레스 해소법", "🤯 {subject}가 스트레스 받았을 때 하는 짓\n\n폭식? 수면? 아니면 잠수? {subject}만의 독특한 스트레스 해소법!"),
    ("술버릇", "🍻 {subject}의 술자리 진짜 모습!\n\n취하면 애교쟁이? 아니면 TMT? {subject}의 숨겨진 술버릇 폭로!"),
]

def generate_daily_trend_post(seed):
    random.seed(seed)
    subj_name, subj_prompt = random.choice(TREND_SUBJECTS)
    topic_name, topic_caption = random.choice(TREND_TOPICS)
    
    title = f"[{subj_name}] {topic_name} 완벽 분석"
    caption = topic_caption.format(subject=subj_name) + "\n\n👇 소름돋는 팩폭 분석 더 보기\n[ 프로필 링크 클릭 👉 @info.test1234 ]\n\n#MBTI #관상테스트 #심리테스트 #연애테스트 #팩폭 #성격테스트"
    
    # 텍스트가 없는 깔끔한 인스타 감성 일러스트 생성을 위한 프롬프트 조합 (절대 동물 금지)
    full_prompt = f"1girl or 1boy, {subj_prompt}, portraying {topic_name}, NO ANIMALS, NO DOGS, strictly aesthetic human character, highly detailed, textless, minimalistic, clean solid color background, aesthetic instagram flat illustration style"
    safe_prompt = urllib.parse.quote(full_prompt)
    
    # 무료 AI 이미지 생성 API (pollinations.ai)
    image_url = f"https://image.pollinations.ai/prompt/{safe_prompt}?width=1080&height=1080&nologo=true"
    
    return {
        "title": title,
        "image_url": image_url,
        "caption": caption
    }

def safe_print(msg):
    try:
        print(msg)
    except Exception:
        try:
            print(msg.encode('utf-8', 'ignore').decode('cp949', 'ignore'))
        except Exception:
            pass

def get_browser_sessionid():
    try:
        import browser_cookie3
        cj = browser_cookie3.load(domain_name='instagram.com')
        for cookie in cj:
            if cookie.name == 'sessionid':
                return cookie.value
    except Exception:
        pass
    return None

def main():
    is_auto = "--auto" in sys.argv
    safe_print("============================================================")
    safe_print("[무한 생성 모드] AI 트렌드 콘텐츠 자동 업로더")
    safe_print("============================================================")

    # 올해의 날짜(1~365)를 시드로 사용하여 매일 1개의 고유한 조합 생성
    day_of_year = datetime.now().timetuple().tm_yday
    
    if is_auto:
        # 자동 모드: 완전히 무작위로 매일 새로운 AI 트렌드 콘텐츠 생성
        post_info = generate_daily_trend_post(day_of_year)
        safe_print(f"[자동 모드] 오늘의 AI 생성 트렌드: {post_info['title']}")
    else:
        # 수동 모드 안내
        safe_print(" 1) 기존 12개 테스트 업로드 모드 (예전 코드 사용)")
        safe_print(" 2) [신규] 매일 무한 생성되는 트렌드 분석 올리기 (성격/관상/상황 등)")
        safe_print("============================================================")
        choice = input("발행 모드 선택 (기본 2): ").strip()
        
        if choice == "1":
            safe_print("[안내] 기존 12개 하드코딩 테스트는 스크립트에 통합되어 있습니다 (생략). 신규 모드로 실행합니다.")
            post_info = generate_daily_trend_post(day_of_year)
        else:
            # 수동 실행 시마다 새로운 조합이 나오게 하려면 시드를 현재 시간으로 줌
            post_info = generate_daily_trend_post(datetime.now().timestamp())
            
    safe_print(f"\n[선택된 콘텐츠]: {post_info['title']}")
    
    # ---------------------------------------------------------
    # AI 이미지 다운로드 처리
    # ---------------------------------------------------------
    safe_print("[진행중] AI 무료 이미지 실시간 생성 및 다운로드 중...")
    try:
        req = urllib.request.Request(post_info["image_url"], headers={'User-Agent': 'Mozilla/5.0'})
        image_data = urllib.request.urlopen(req).read()
        image_path = os.path.join(os.path.dirname(__file__), "trend_temp.jpg")
        with open(image_path, "wb") as f:
            f.write(image_data)
        safe_print("[성공] AI 이미지 다운로드 완료!")
    except Exception as e:
        safe_print(f"[오류] AI 이미지 생성 실패: {e}")
        return

    # ---------------------------------------------------------
    # 인스타그램 로그인 (세션 자동 로드)
    # ---------------------------------------------------------
    saved_session = None
    for file in os.listdir(os.path.dirname(os.path.abspath(__file__))):
        if file.startswith("session_") and file.endswith(".json"):
            saved_session = file
            break
            
    if saved_session:
        username = saved_session.replace("session_", "").replace(".json", "")
    else:
        if is_auto and not sys.stdin.isatty():
            safe_print("[오류] 백그라운드 자동 모드 실패: 저장된 세션 파일이 없습니다.")
            return
        username = input("\n인스타그램 로그인 아이디 입력: ").strip()
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

    pass

    if not logged_in:
        safe_print("[안내] 로그인이 필요합니다. (세션 만료 또는 최초 로그인)")
        if is_auto and not sys.stdin.isatty():
            safe_print("[오류] 백그라운드 자동 모드 실패: 로그인이 풀렸습니다.")
            return
            
        sessionid = get_browser_sessionid()
        if sessionid:
            safe_print("\n[진행중] 인터넷 브라우저에 로그인된 인스타그램 정보를 발견했습니다! 보안 검열 하이패스를 시도합니다...")
            try:
                cl.login_by_sessionid(sessionid)
                cl.get_timeline_feed() # Validate session
                cl.dump_settings(session_file)
                safe_print("[성공] 🚀 브라우저 정보 우회(하이패스) 로그인 성공!")
                logged_in = True
            except Exception as e:
                safe_print(f"[안내] 우회 실패 (수동 로그인으로 넘어갑니다): {e}")

        if not logged_in:
            password = input(f"[{username}] 비밀번호 (또는 sessionid 우회 키) 입력: ").strip()
            if not password:
                return
            
            # 수동 하이패스 (sessionid 직접 입력 시도)
            if "%3A" in password or "session_" in password or len(password) > 40:
                safe_print("\n[진행중] 수동 하이패스 키(sessionid)가 감지되었습니다! 보안 우회를 시도합니다...")
                try:
                    cl.login_by_sessionid(password)
                    cl.get_timeline_feed()
                    cl.dump_settings(session_file)
                    safe_print("[성공] 🚀 수동 하이패스 우회 로그인 성공!")
                    logged_in = True
                except Exception as e:
                    safe_print(f"[오류] 하이패스 실패: {e}")
                    return
            else:
                try:
                    cl.login(username, password)
                    cl.dump_settings(session_file)
                    safe_print("[성공] 로그인 성공 및 세션 저장 완료!")
                    logged_in = True
                except Exception as e:
                    safe_print(f"[오류] 로그인 실패: {e}")
                    return

    # ---------------------------------------------------------
    # 로그인 직후 즉시 업로드는 계정 정지 위험이 큰 봇 패턴입니다.
    # 사람처럼 몇 분 정도 쉬었다가 올리도록 랜덤 지연을 둡니다.
    # ---------------------------------------------------------
    if is_auto:
        wait_sec = random.randint(180, 900)
        safe_print(f"[대기중] 계정 보호를 위해 {wait_sec // 60}분 {wait_sec % 60}초 대기 후 업로드합니다...")
        time.sleep(wait_sec)

    # ---------------------------------------------------------
    # 이미지 전처리 (인스타그램 1080x1080 규격 및 메타데이터 정제)
    # ---------------------------------------------------------
    safe_print(f"\n[진행중] 이미지 전처리 및 업로드 준비: {os.path.basename(image_path)}")
    try:
        from PIL import Image
        with Image.open(image_path) as img:
            img = img.convert('RGB')
            img.thumbnail((1080, 1080), Image.Resampling.LANCZOS)
            new_img = Image.new("RGB", (1080, 1080), (255, 255, 255))
            new_img.paste(img, ((1080 - img.size[0]) // 2, (1080 - img.size[1]) // 2))
            processed_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), "upload_temp.jpg")
            new_img.save(processed_path, "JPEG", quality=95)
            upload_target = processed_path
    except Exception as e:
        safe_print(f"[안내] PIL 이미지 전처리 건너뜀 (직접 업로드 시도): {e}")
        upload_target = image_path

    # ---------------------------------------------------------
    # 업로드
    # ---------------------------------------------------------
    safe_print("[진행중] 인스타그램 게시글 업로드 전송 중...")
    try:
        media = cl.photo_upload(upload_target, post_info["caption"])
        post_url = f"https://www.instagram.com/p/{media.code}/"
        safe_print("\n[축하합니다!] 트렌드 맞춤 게시물이 100% 자동 생성/업로드되었습니다!")
        safe_print(f"게시물 URL: {post_url}")

        if not is_auto:
            import webbrowser
            webbrowser.open(post_url)
    except Exception as e:
        err_name = type(e).__name__
        if "Challenge" in err_name or "challenge_required" in str(e):
            safe_print("\n[경고] 인스타그램이 본인 인증(챌린지)을 요구하고 있습니다!")
            safe_print("[조치 필요] 이 스크립트를 더 돌리지 말고, 휴대폰 인스타그램 앱에 직접 로그인해서")
            safe_print("           본인 인증(문자/이메일 코드 등)을 먼저 완료해주세요.")
            safe_print("           인증 없이 자동 재시도하면 계정이 정지될 위험이 커집니다.")
        elif "LoginRequired" in err_name:
            safe_print("\n[경고] 세션이 만료되어 로그인이 풀렸습니다. 저장된 session_*.json 파일을 지우고")
            safe_print("           다시 수동으로 로그인해주세요.")
        else:
            safe_print(f"[오류] 업로드 중 예외 발생: {e}")

if __name__ == "__main__":
    main()
