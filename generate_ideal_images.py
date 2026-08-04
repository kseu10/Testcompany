import urllib.request
import urllib.parse
import threading

prompts = [
    ("wc_ideal_1.jpg", "A cute mobile game UI style individual profile card, glowing neon pink and blue borders. A handsome cute chibi boy looking sad holding a massive red debt paper. Large clear typography text at top says '얼굴천재 빚1억'. High quality, clean solid background, aesthetic instagram flat illustration style."),
    ("wc_ideal_2.jpg", "A cute mobile game UI style individual profile card, glowing neon pink and blue borders. An average cute chibi boy holding a big bag of gold coins. Large clear typography text at top says '평범 자산10억'. High quality, clean solid background, aesthetic instagram flat illustration style."),
    ("wc_ideal_3.jpg", "A cute mobile game UI style individual profile card, glowing neon pink and blue borders. A cute chibi girl looking anxiously at a glowing smartphone with red hearts. Large clear typography text at top says '1분마다 칼답'. High quality, clean solid background, aesthetic instagram flat illustration style."),
    ("wc_ideal_4.jpg", "A cute mobile game UI style individual profile card, glowing neon pink and blue borders. A cute chibi girl sleeping peacefully with Zzz ignoring phone. Large clear typography text at top says '하루1번 연락'. High quality, clean solid background, aesthetic instagram flat illustration style."),
    ("wc_ideal_5.jpg", "A cute mobile game UI style individual profile card, glowing neon pink and blue borders. A cute chibi boy reading a thick encyclopedia with a glowing halo above. Large clear typography text at top says '핵노잼 바른생활'. High quality, clean solid background, aesthetic instagram flat illustration style."),
    ("wc_ideal_6.jpg", "A cute mobile game UI style individual profile card, glowing neon pink and blue borders. A cute chibi boy with devil horns laughing playfully. Large clear typography text at top says '배꼽도둑 나쁜남자'. High quality, clean solid background, aesthetic instagram flat illustration style."),
    ("wc_ideal_7.jpg", "A cute mobile game UI style individual profile card, glowing neon pink and blue borders. A handsome cute chibi boy wearing ridiculously mismatched neon clothes. Large clear typography text at top says '패션 테러리스트'. High quality, clean solid background, aesthetic instagram flat illustration style."),
    ("wc_ideal_8.jpg", "A cute mobile game UI style individual profile card, glowing neon pink and blue borders. A cute chibi boy drowning in expensive luxury shopping bags. Large clear typography text at top says '명품 콜렉터'. High quality, clean solid background, aesthetic instagram flat illustration style."),
    ("wc_ideal_9.jpg", "A cute mobile game UI style individual profile card, glowing neon pink and blue borders. A cute chibi girl crossing her arms defensively surrounded by an ice cube. Large clear typography text at top says '스킨십제로 철벽'. High quality, clean solid background, aesthetic instagram flat illustration style."),
    ("wc_ideal_10.jpg", "A cute mobile game UI style individual profile card, glowing neon pink and blue borders. A cute chibi girl with octopus tentacles playfully hugging. Large clear typography text at top says '스킨십 몬스터'. High quality, clean solid background, aesthetic instagram flat illustration style."),
    ("wc_ideal_11.jpg", "A cute mobile game UI style individual profile card, glowing neon pink and blue borders. A cute chibi boy confidently surrounded by a huge crowd of girl friends. Large clear typography text at top says '남사친 여사친'. High quality, clean solid background, aesthetic instagram flat illustration style."),
    ("wc_ideal_12.jpg", "A cute mobile game UI style individual profile card, glowing neon pink and blue borders. A cute chibi boy sitting alone in a dark room illuminated by a PC monitor. Large clear typography text at top says '친구0명 은둔형'. High quality, clean solid background, aesthetic instagram flat illustration style."),
    ("wc_ideal_13.jpg", "A cute mobile game UI style individual profile card, glowing neon pink and blue borders. A cute chibi girl confidently holding a paper with huge spelling mistakes. Large clear typography text at top says '맞춤법 파괴자'. High quality, clean solid background, aesthetic instagram flat illustration style."),
    ("wc_ideal_14.jpg", "A cute mobile game UI style individual profile card, glowing neon pink and blue borders. A cute chibi girl in a police hat strictly holding a red pen. Large clear typography text at top says '문법경찰 훈수러'. High quality, clean solid background, aesthetic instagram flat illustration style."),
    ("wc_ideal_15.jpg", "A cute mobile game UI style individual profile card, glowing neon pink and blue borders. A cute chibi boy making extreme heart signs with sparkles everywhere. Large clear typography text at top says '애교만렙 투머치'. High quality, clean solid background, aesthetic instagram flat illustration style."),
    ("wc_ideal_16.jpg", "A cute mobile game UI style individual profile card, glowing neon pink and blue borders. A cute chibi boy looking exactly like an emotionless android robot. Large clear typography text at top says '무뚝뚝 로봇'. High quality, clean solid background, aesthetic instagram flat illustration style.")
]

def download_image(filename, prompt):
    try:
        url = f"https://image.pollinations.ai/prompt/{urllib.parse.quote(prompt)}?width=512&height=512&nologo=true&seed=42"
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})
        with urllib.request.urlopen(req) as response, open(filename, 'wb') as out_file:
            out_file.write(response.read())
        print(f"Downloaded {filename}")
    except Exception as e:
        print(f"Failed {filename}: {e}")

import time

for filename, prompt in prompts:
    download_image(filename, prompt)
    time.sleep(1)

print("Done generating 16 images.")
