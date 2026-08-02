const todayQuestions = [
  {
    title: "Q1. 오늘 아침 눈을 떴을 때 개운함과 컨디션은 어땠나요?",
    a: { text: "완전 상쾌함! 바로 침대에서 벌떡 일어남", score: "HIGH" },
    b: { text: "조금 피곤함... 5분만 더 자고 싶다", score: "LOW" }
  },
  {
    title: "Q2. 오늘 아침 옷을 골라 입을 때 나의 분위기는?",
    a: { text: "화사하고 자신감 넘치는 깔끔한 룩", score: "HIGH" },
    b: { text: "편안하고 무난한 데일리 캐주얼 룩", score: "LOW" }
  },
  {
    title: "Q3. 오늘 길 가다가 만난 첫 타인과의 소통은?",
    a: { text: "상냥하게 인사하거나 엘리베이터 문을 잡아줌", score: "HIGH" },
    b: { text: "내 갈 길 바쁘게 마이웨이 이동", score: "LOW" }
  },
  {
    title: "Q4. 오늘 나에게 어울리는 최고의음료를 고른다면?",
    a: { text: "시원하고 청량한 아이스 아메리카노 / 라떼", score: "HIGH" },
    b: { text: "따뜻하고 힐링되는 핫초코 / 캐모마일 차", score: "LOW" }
  },
  {
    title: "Q5. 지갑이나 통장을 확인할 때 드는 오늘 내 기분은?",
    a: { text: "\"이번 달도 자산 관리 잘하고 있어! 든든해\"", score: "HIGH" },
    b: { text: "\"월급 언제 들어오지... 돈 좀 모아야지\"", score: "LOW" }
  },
  {
    title: "Q6. 소중한 사람으로부터 뜬금없는 메시지가 온다면?",
    a: { text: "기분 좋게 칼답하고 수다 파티 시작", score: "HIGH" },
    b: { text: "할 일 마치고 차분하게 확인 후 답장", score: "LOW" }
  },
  {
    title: "Q7. 오늘 직장/학교에서 중요한 과제가 주어졌을 때 자세는?",
    a: { text: "\"내가 바로 해결해주지!\" 자신감 당당", score: "HIGH" },
    b: { text: "차근차근 하나씩 순서대로 처리", score: "LOW" }
  },
  {
    title: "Q8. 퇴근/하교 후 오늘 저녁 일상 계획은?",
    a: { text: "좋아하는 맛집 탐방이나 신나는 운동 라이프", score: "HIGH" },
    b: { text: "집에서 아늑하게 쉬면서 유튜브 시청", score: "LOW" }
  },
  {
    title: "Q9. 오늘 나에게 다가오는 직감(촉)의 느낌은?",
    a: { text: "오늘 왠지 로또 사야 될 것 같은 대박 촉!", score: "HIGH" },
    b: { text: "잔잔하고 무탈하게 하루를 보낼 조용한 촉", score: "LOW" }
  },
  {
    title: "Q10. 오늘 하루 나 자신에게 해주고 싶은 한 마디는?",
    a: { text: "\"넌 오늘도 최고야! 대운 만발하자!\"", score: "HIGH" },
    b: { text: "\"수고했어 오늘도, 조용히 푹 쉬자\"", score: "LOW" }
  }
];

let todayQIdx = 0;
let todayScores = [];

function startTodayQuiz() {
  const name = document.getElementById('todayName').value.trim();
  if (!name) {
    alert('이름 또는 닉네임을 입력해 주세요!');
    return;
  }
  todayQIdx = 0;
  todayScores = [];
  document.getElementById('startSection').classList.add('hidden');
  document.getElementById('quizSection').classList.remove('hidden');
  renderTodayQuestion();
}

function renderTodayQuestion() {
  const q = todayQuestions[todayQIdx];
  const total = todayQuestions.length;
  const pct = Math.round(((todayQIdx + 1) / total) * 100);

  document.getElementById('progressFill').style.width = `${pct}%`;
  document.getElementById('progressText').innerText = `${todayQIdx + 1} / ${total} 문항 (${pct}%)`;

  const container = document.getElementById('questionContainer');
  container.innerHTML = `
    <h3 class="q-title">${q.title}</h3>
    <div class="q-options">
      <button class="option-btn" onclick="answerTodayQuestion('${q.a.score}')">
        <span class="opt-icon">🍀</span>
        <span>${q.a.text}</span>
      </button>
      <button class="option-btn" onclick="answerTodayQuestion('${q.b.score}')">
        <span class="opt-icon">✨</span>
        <span>${q.b.text}</span>
      </button>
    </div>
  `;
}

function answerTodayQuestion(score) {
  todayScores.push(score);
  todayQIdx++;
  if (todayQIdx < todayQuestions.length) {
    renderTodayQuestion();
  } else {
    calculateFinalTodayResult();
  }
}

function calculateFinalTodayResult() {
  const name = document.getElementById('todayName').value.trim() || '오늘의 주인공';

  const highCount = todayScores.filter(s => s === 'HIGH').length;
  const score = Math.min(100, Math.max(78, 80 + highCount * 2));

  let fortune = {
    badge: `${score}점 (대길 ♠)`, class: "tier-sss-plus",
    title: `"${name}님, 금전운 폭발! 돈이 굴러들어오는 날"`,
    desc: "오늘 귀인을 만나고 생각지 못한 뜻밖의 기쁨이나 자산 수익이 찾아오는 완벽한 하루입니다!",
    luckyItem: "행운 음식: 아이스 라떼 | 행운 방위: 동남쪽",
    warning: "충동 구매 & 성급한 오지랖 주의"
  };

  if (highCount <= 4) {
    fortune = {
      badge: `${score}점 (평온 🍀)`, class: "tier-s-plus",
      title: `"${name}님, 마음이 평화롭고 무탈하게 풀어지는 날"`,
      desc: "막혔던 고민이 자연스레 해소되고 따뜻한 온기가 감도는 힐링의 하루입니다.",
      luckyItem: "행운 아이템: 4잎 클로버 | 행운 장소: 산책로",
      warning: "계단 이용 시 스마트폰 조심"
    };
  }

  document.getElementById('todayBadge').innerText = fortune.badge;
  document.getElementById('todayBanner').className = `tier-banner ${fortune.class}`;
  document.getElementById('todayTitle').innerText = fortune.title;
  document.getElementById('todayDesc').innerText = fortune.desc;
  document.getElementById('todayLuckyItem').innerText = fortune.luckyItem;
  document.getElementById('todayWarning').innerText = fortune.warning;

  document.getElementById('statTodayMoney').innerText = `${score}점 (최상)`;
  document.getElementById('statTodayLove').innerText = `${Math.max(80, score - 2)}점 (상승)`;
  document.getElementById('statTodayWork').innerText = `${Math.max(82, score - 1)}점 (원활)`;
  document.getElementById('statTodayGuard').innerText = '철통 방어';

  document.getElementById('quizSection').classList.add('hidden');
  document.getElementById('resultSection').classList.remove('hidden');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function copyTodayLink() {
  navigator.clipboard.writeText(window.location.href).then(() => {
    alert('오늘의 운세 링크가 복사되었습니다! 친구들에게 공유해보세요!');
  });
}

function shareKakao() {
  alert('카카오톡 공유 링크가 복사되었습니다!');
  copyTodayLink();
}

function captureStoryCard() {
  const cardNode = document.getElementById('storyCardContainer');
  html2canvas(cardNode, { scale: 2, backgroundColor: '#031209', useCORS: true }).then(canvas => {
    const a = document.createElement('a');
    a.href = canvas.toDataURL("image/png");
    a.download = `2026_오늘의운세_귀염행운부적.png`;
    a.click();
  });
}
