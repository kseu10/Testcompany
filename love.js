const loveQuestions = [
  {
    title: "Q1. 주말 데이트 약속이 갑자기 취소되었을 때 나는?",
    a: { text: "신난다! 집에서 즉시 침대와 물아일체 넷플릭스 타임", score: "I" },
    b: { text: "이대로 주말을 보낼 수 없지! 바로 친구들 번개 호출", score: "E" }
  },
  {
    title: "Q2. 연인이 \"나 오늘 기분이 우울해서 빵 먹었어\"라고 할 때 내 반응은?",
    a: { text: "\"무슨 일 있었어? 마음 아파 ㅠㅠ\" (감정 우선 공감)", score: "F" },
    b: { text: "\"무슨 빵 먹었는데? 맛있는 거 먹었네\" (팩트 우선 관심)", score: "T" }
  },
  {
    title: "Q3. 연인과 해외여행을 가기 한 달 전 나의 행동은?",
    a: { text: "시간대별 분 단위 동선, 맛집 백업 리스트 완벽 작성", score: "J" },
    b: { text: "비행기랑 숙소만 정하면 끝! 현지 가서 슉슉 구경하기", score: "P" }
  },
  {
    title: "Q4. 소개팅 자리에 처음 나갔을 때 나의 모습은?",
    a: { text: "어색함을 못 참아서 끊임없이 리액션과 질문을 폭풍 투척", score: "E" },
    b: { text: "상대방이 말할 때 경청하며 수줍은 미소로 응답", score: "I" }
  },
  {
    title: "Q5. 연인이 서운함을 토로할 때 대화 스타일은?",
    a: { text: "속상했을 마음을 보듬고 공감부터 한 뒤 따뜻하게 안아준다", score: "F" },
    b: { text: "어떤 오해가 있었는지 원인을 객관적으로 분석하고 해결책 제시", score: "T" }
  },
  {
    title: "Q6. 연인과의 연락 주기에 관한 내 가치관은?",
    a: { text: "칼답 필수! 사소한 일상도 실시간으로 공유해야 마음 편함", score: "HIGH" },
    b: { text: "서로 개인 일 집중하고 저녁에 따뜻하게 통화하면 충분", score: "LOW" }
  },
  {
    title: "Q7. 데이트 중 가려던 식당이 문을 닫았을 때 반응은?",
    a: { text: "당황하지 않고 리저브 해둔 2순위 맛집으로 바로 이동", score: "J" },
    b: { text: "\"오 오히려 좋아! 근처 보이는 예쁜 카페나 가볼까?\"", score: "P" }
  },
  {
    title: "Q8. 연인에게 선물을 준비할 때 나의 스타일은?",
    a: { text: "실용성 100%! 연인이 지금 진짜 필요한 물건 탐색 후 전달", score: "T" },
    b: { text: "감성 100%! 손편지와 추억이 담긴 서프라이즈 선물 준비", score: "F" }
  },
  {
    title: "Q9. 연인의 이성 친구(남사친/여사친) 문제에 관한 기준은?",
    a: { text: "단둘이 술이나 영화는 절대 불가! 명확한선 지키기 필수", score: "HIGH" },
    b: { text: "나를 향한 신뢰만 확실하다면 이성 친구 모임도 오케이", score: "LOW" }
  },
  {
    title: "Q10. 길 가다 우연히 이쁜 야경을 보았을 때 반응은?",
    a: { text: "\"우와 너무 이쁘다~\" 감성에 젖어 인생샷 사진 촬영", score: "F" },
    b: { text: "\"여기 조명이 이쁜 조명인가 보네\" 기술적 원리 생각", score: "T" }
  }
];

let currentQIdx = 0;
let userScores = [];

function startLoveQuiz() {
  const name = document.getElementById('nickname').value.trim();
  if (!name) {
    alert('이름 또는 닉네임을 입력해 주세요!');
    return;
  }
  currentQIdx = 0;
  userScores = [];
  document.getElementById('startSection').classList.add('hidden');
  document.getElementById('quizSection').classList.remove('hidden');
  renderLoveQuestion();
}

function renderLoveQuestion() {
  const q = loveQuestions[currentQIdx];
  const total = loveQuestions.length;
  const pct = Math.round(((currentQIdx + 1) / total) * 100);

  document.getElementById('progressFill').style.width = `${pct}%`;
  document.getElementById('progressText').innerText = `${currentQIdx + 1} / ${total} 문항 (${pct}%)`;

  const container = document.getElementById('questionContainer');
  container.innerHTML = `
    <h3 class="q-title">${q.title}</h3>
    <div class="q-options">
      <button class="option-btn" onclick="answerLoveQuestion('${q.a.score}')">
        <span class="opt-icon">💖</span>
        <span>${q.a.text}</span>
      </button>
      <button class="option-btn" onclick="answerLoveQuestion('${q.b.score}')">
        <span class="opt-icon">✨</span>
        <span>${q.b.text}</span>
      </button>
    </div>
  `;
}

function answerLoveQuestion(score) {
  userScores.push(score);
  currentQIdx++;
  if (currentQIdx < loveQuestions.length) {
    renderLoveQuestion();
  } else {
    calculateFinalLoveResult();
  }
}

function calculateFinalLoveResult() {
  const name = document.getElementById('nickname').value.trim() || '익명';
  
  const fCount = userScores.filter(s => s === 'F').length;
  const eCount = userScores.filter(s => s === 'E').length;
  const jCount = userScores.filter(s => s === 'J').length;
  const highCount = userScores.filter(s => s === 'HIGH').length;

  let archetype = {
    badge: "S+ TIER", class: "tier-sss",
    title: `"${name}님은 감성 폭발 다정다감 댕댕이"`,
    desc: "상대방 눈빛만 봐도 기분 캐치! 서프라이즈 이벤트와 오직 나만을 바라보는 순정파 사랑꾼.",
    best: "차분하고 묵묵하게 지켜주는 힐링 오아시스",
    worst: "연락 두절되는 마이웨이 냉혈한"
  };

  if (fCount >= 3 && eCount >= 2) {
    archetype = {
      badge: "SSS TIER", class: "tier-sss-plus",
      title: `"${name}님은 연애 직진 로맨틱 인싸"`,
      desc: "내 사람에게 100% 직진! 함께 있으면 웃음이 끊이지 않는 세상 달콤한 에너지 파워업 타입.",
      best: "같이 신나게 놀아주는 활력소 댕댕이",
      worst: "표정 어둡고 무뚝뚝한 얼음 인형"
    };
  } else if (fCount < 2 && jCount >= 2) {
    archetype = {
      badge: "SS TIER", class: "tier-ss",
      title: `"${name}님은 갓생 연애 스마트 팩폭러"`,
      desc: "연애도 효율적이고 똑똑하게! 오해 없이 명확한 대화로 관계를 키워나가는 이성파 크리에이터.",
      best: "독립적이고 스마트한 갓생 러버",
      worst: "매일 서운하다고 징징거리는 떼쟁이"
    };
  } else if (highCount >= 2) {
    archetype = {
      badge: "S TIER", class: "tier-s",
      title: `"${name}님은 밀착 연애 집착 0.1% 수호자"`,
      desc: "내 연인이 세상 제일 소중함! 24시간 실시간 공유와 꼼꼼한 케어로 안심을 선사하는 집착 요정.",
      best: "칼답해주고 일상 공유 즐기는 귀요미",
      worst: "답장 3시간 걸리는 방목형 읽씹러"
    };
  }

  document.getElementById('loveBadge').innerText = archetype.badge;
  document.getElementById('loveBanner').className = `tier-banner ${archetype.class}`;
  document.getElementById('loveTitle').innerText = archetype.title;
  document.getElementById('loveDesc').innerText = archetype.desc;
  document.getElementById('bestMatch').innerText = archetype.best;
  document.getElementById('worstMatch').innerText = archetype.worst;

  document.getElementById('statLoveExpress').innerText = fCount >= 3 ? 'SSS Grade' : 'A Grade';
  document.getElementById('statJealousy').innerText = highCount >= 2 ? 'A Grade' : 'SSS Grade';
  document.getElementById('statSomeWin').innerText = eCount >= 2 ? 'S+ Grade' : 'A Grade';
  document.getElementById('statDateCost').innerText = jCount >= 2 ? 'SSS Grade' : 'S Grade';

  document.getElementById('quizSection').classList.add('hidden');
  document.getElementById('resultSection').classList.remove('hidden');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function copyLoveLink() {
  navigator.clipboard.writeText(window.location.href).then(() => {
    alert('테스트 링크가 클립보드에 복사되었습니다! 인스타/스레드에 공유해보세요!');
  });
}

function shareKakao() {
  alert('카카오톡 공유 링크가 복사되었습니다!');
  copyLoveLink();
}

function captureStoryCard() {
  const cardNode = document.getElementById('storyCardContainer');
  html2canvas(cardNode, { scale: 2, backgroundColor: '#120515', useCORS: true }).then(canvas => {
    const a = document.createElement('a');
    a.href = canvas.toDataURL("image/png");
    a.download = `2026_연애성향_귀염부캐카드.png`;
    a.click();
  });
}
