const loveQuestions = [
  {
    title: "1. 짝사랑하는 사람이 생겼을 때, 당신의 행동은?",
    a: { text: "눈치 보지 않고 은근슬쩍 다가가 적극적으로 호감 표시하기", score: "E" },
    b: { text: "속으로 혼자 짝사랑하며 상대방의 행동을 관찰하기", score: "I" }
  },
  {
    title: "2. 연인과의 데이트 코스를 짤 때 당신의 스타일은?",
    a: { text: "분 단위 동선과 식당 예약, 주차장까지 완벽하게 준비", score: "J" },
    b: { text: "그날 기분 따라 당일 끌리는 대로 자유롭게 이동", score: "P" }
  },
  {
    title: "3. 연인이 '오늘 나 회사에서 너무 속상했어'라고 말할 때?",
    a: { text: "\"무슨 일이야? 힘들었겠다 ㅠㅠ\" 감정 이입하며 토닥이기", score: "F" },
    b: { text: "\"누가 무슨 문제 원인을 제공했는데?\" 객관적 해결책 제시", score: "T" }
  },
  {
    title: "4. 연인의 이성 친구(여사친/남사친) 문제에 대한 당신의 마지노선은?",
    a: { text: "단둘이 술이나 영화는 절대 불가! 명확한 선이 필요함", score: "HIGH" },
    b: { text: "서로 간의 신뢰가 있다면 크게 신경 쓰지 않고쿨하게 방목", score: "LOW" }
  },
  {
    title: "5. 첫 데이트 후 집으로 돌아가는 길, 가장 먼저 드는 생각은?",
    a: { text: "오늘 나눈 대화를 복기하며 '나한테 호감 있었나?' 체크", score: "F" },
    b: { text: "오늘 피곤했는데 집에 가서 씻고 유튜브 볼 생각에 신남", score: "T" }
  },
  {
    title: "6. 연인과 말다툼이 일어났을 때 당신의 대화 해결법은?",
    a: { text: "서운했던 감정을 솔직히 털어놓고 당일 바로 풀어야 함", score: "F" },
    b: { text: "서로 감정이 가라앉을 때까지 이성적으로 쿨다운 타임 갖기", score: "T" }
  },
  {
    title: "7. 기념일 선물로 더 선호하는 스타일은?",
    a: { text: "손편지와 평소 상대방이 갖고 싶어했던 감동 서프라이즈", score: "F" },
    b: { text: "실용성 100% 최신 가전/브랜드 필수 아이템", score: "T" }
  },
  {
    title: "8. 연인과 주말에 같이 집데이트할 때 선호하는 일과는?",
    a: { text: "넷플릭스 같이 보며 맛있는 배달 음식 먹고 꽁냥거리기", score: "F" },
    b: { text: "각자 자기 할 일(게임, 독서) 하면서 중간중간 대화하기", score: "T" }
  },
  {
    title: "9. 연락 답장 속도에 대한 당신의 연애관은?",
    a: { text: "가능하면 실시간 톡이나 틈틈이 연락을 이어가는 게 예의", score: "HIGH" },
    b: { text: "일하거나 바쁠 때는 수 시간 늦어져도 서로 이해하기", score: "LOW" }
  },
  {
    title: "10. 당신이 생각하는 이상적인 연애 상태란?",
    a: { text: "서로의 삶에 깊이 동화되어 세상 제일 친한 베프가 되는 것", score: "F" },
    b: { text: "서로의 주체성과 갓생 라이프를 존중하며 함께 성장하는 것", score: "T" }
  }
];

let currentQIdx = 0;
let userScores = [];

function startLoveQuiz() {
  const nickname = document.getElementById('nickname').value.trim();
  if (!nickname) {
    alert('닉네임을 입력해 주세요!');
    return;
  }
  document.getElementById('startSection').classList.add('hidden');
  document.getElementById('quizSection').classList.remove('hidden');
  currentQIdx = 0;
  userScores = [];
  renderLoveQuestion();
}

function renderLoveQuestion() {
  const q = loveQuestions[currentQIdx];
  const progressPercent = Math.round(((currentQIdx + 1) / loveQuestions.length) * 100);
  
  document.getElementById('progressFill').style.width = `${progressPercent}%`;
  document.getElementById('progressText').innerText = `${currentQIdx + 1} / ${loveQuestions.length} 문항 (${progressPercent}%)`;

  const qContainer = document.getElementById('questionContainer');
  qContainer.innerHTML = `
    <h3 class="q-title">${q.title}</h3>
    <div class="q-options">
      <button class="option-btn" onclick="answerLoveQuestion('${q.a.score}')">
        <span class="opt-icon">💘</span>
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
    worst: "연락 두절되는 마이웨이 냉혈한",
    style: `${name}님은 상대방에게 애정을 아낌없이 쏟아부으며 일상의 소소한 기쁨을 함께 나누는 '순정파 댕댕이 사랑꾼'입니다.`,
    strength: "상대방의 기분 변화를 민감하게 캐치하여 따뜻한 위로와 특급 서프라이즈 감동을 선사합니다.",
    weaknessDetail: "상대방의 작고 무뚝뚝한 반응이나 답장 지연에 혼자 속으로 섭섭해하다 홧김에 감정의 방어벽을 쌓는 약점이 있습니다.",
    bestPartner: "💖 내 감정을 그대로 흡수하고 항상 따뜻하게 안심시켜 주는 '다정다감 힐링러'",
    worstPartner: "🚫 연락 두절에 감정 표현 0%인 '읽씹 마이웨이 얼음 인형'",
    advice: "혼자 서운함을 삼키지 말고 원하는 바를 유쾌하게 이야기해 보세요! 연인도 당신의 솔직함에 더 깊이 빠져들 것입니다."
  };

  if (fCount >= 3 && eCount >= 2) {
    archetype = {
      badge: "SSS TIER", class: "tier-sss-plus",
      title: `"${name}님은 연애 직진 로맨틱 인싸"`,
      desc: "내 사람에게 100% 직진! 함께 있으면 웃음이 끊이지 않는 세상 달콤한 에너지 파워업 타입.",
      best: "같이 신나게 놀아주는 활력소 댕댕이",
      worst: "표정 어둡고 무뚝뚝한 얼음 인형",
      style: `${name}님은 연애할 때 밀당 없이 직진하며 데이트마다 활력과 웃음을 선물하는 '로맨틱 에너자이저'입니다.`,
      strength: "표현력이 풍부하고 숨김없이 사랑을 고백하여 연인에게 세상에서 가장 사랑받고 있다는 확신을 줍니다.",
      weaknessDetail: "상대방이 차분하고 혼자만의 시간이 필요할 때도 억지로 밖으로 끌어내려다 일시적 마찰을 겪을 수 있습니다.",
      bestPartner: "💖 내 열정적인 리드에 기쁘게 호응해 주는 '맑고 밝은 인싸 댕댕이'",
      worstPartner: "🚫 만날 때마다 시니컬하고 분위기 깨는 '얼음 공주/왕자'",
      advice: "연인에게도 가끔 혼자 쉴 수 있는 힐링 타임을 선사하는 센스를 발휘하면 완벽한 로맨스가 완성됩니다."
    };
  } else if (fCount < 2 && jCount >= 2) {
    archetype = {
      badge: "SS TIER", class: "tier-ss",
      title: `"${name}님은 갓생 연애 스마트 팩폭러"`,
      desc: "연애도 효율적이고 똑똑하게! 오해 없이 명확한 대화로 관계를 키워나가는 이성파 크리에이터.",
      best: "독립적이고 스마트한 갓생 러버",
      worst: "매일 서운하다고 징징거리는 떼쟁이",
      style: `${name}님은 쓸데없는 밀당이나 감정 소모를 싫어하며, 이성적이고 스마트하게 연애를 이끄는 '갓생 팩폭러'입니다.`,
      strength: "오해가 생겼을 때 이성적으로 원인을 분석하고 명확하게 소통하여 감정 낭비 없는 성숙한 연애를 합니다.",
      weaknessDetail: "상대방이 감정적인 위로를 원할 때 팩트 위주의 해결책만 제시하여 공감 능력이 부족하다는 오해를 살 수 있습니다.",
      bestPartner: "💖 서로의 존중하며 갓생 라이프를 함께하는 '독립적인 스마트 러버'",
      worstPartner: "🚫 사소한 일에 매일 서운하다고 징징거리고 감정 기복 심한 '떼쟁이'",
      advice: "때로는 정답보다 따뜻한 \"많이 힘들었겠네\" 한마디가 연인의 마음을 녹이는 가장 강력한 해결책입니다."
    };
  } else if (highCount >= 2) {
    archetype = {
      badge: "S TIER", class: "tier-s",
      title: `"${name}님은 밀착 연애 집착 0.1% 수호자"`,
      desc: "내 연인이 세상 제일 소중함! 24시간 실시간 공유와 꼼꼼한 케어로 안심을 선사하는 집착 요정.",
      best: "칼답해주고 일상 공유 즐기는 귀요미",
      worst: "답장 3시간 걸리는 방목형 읽씹러",
      style: `${name}님은 연인과의 깊은 친밀감과 일상 공유를 최고의 가치로 두는 '밀착형 사랑 수호자'입니다.`,
      strength: "상대방의 안전과 건강을 꼼꼼히 챙기며, 연인만을 바라보는 변함없는 헌신으로 강력한 신뢰를 형성합니다.",
      weaknessDetail: "연락이 늦거나 예고 없는 일정이 생기면 불안감이 커져 의구심을 표현하는 약점이 있습니다.",
      bestPartner: "💖 사소한 일상도 실시간 톡으로 공유하며 안심시켜 주는 '칼답 댕댕이'",
      worstPartner: "🚫 바쁘다는 핑계로 몇 시간씩 잠수 타고 방목하는 '읽씹 마이웨이'",
      advice: "서로에게 약간의 개인 시간을 허용할 때 애정이 더 깊어집니다. 내 개인 취미에도 몰입해 보세요!"
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

  /* 심층 연애 리포트 렌더링 */
  document.getElementById('loveStyleText').innerText = archetype.style;
  document.getElementById('loveStrengthText').innerText = archetype.strength;
  document.getElementById('loveWeaknessDetailText').innerText = archetype.weaknessDetail;
  document.getElementById('loveBestPartnerText').innerText = archetype.bestPartner;
  document.getElementById('loveWorstPartnerText').innerText = archetype.worstPartner;
  document.getElementById('loveAdviceText').innerText = archetype.advice;

  document.getElementById('quizSection').classList.add('hidden');
  document.getElementById('resultSection').classList.remove('hidden');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function toggleLoveDeepReport() {
  const el = document.getElementById('loveDeepDashboard');
  const btns = document.querySelectorAll('#toggleLoveDeepBtn');
  if (el.classList.contains('hidden')) {
    el.classList.remove('hidden');
    btns.forEach(btn => {
      btn.innerHTML = '<span><i class="fa-solid fa-chevron-up"></i> 2026 연애 심층 리포트 접기 ▲</span>';
    });
    el.scrollIntoView({ behavior: 'smooth' });
  } else {
    el.classList.add('hidden');
    btns.forEach(btn => {
      btn.innerHTML = '<span><i class="fa-solid fa-heart"></i> 📖 2026 연애 부캐 심층 연애 리포트 보기 (클릭시 열림) ▼</span>';
    });
  }
}

function resetForm() {
  document.getElementById('resultSection').classList.add('hidden');
  document.getElementById('quizSection').classList.add('hidden');
  document.getElementById('startSection').classList.remove('hidden');
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
  html2canvas(cardNode, { scale: 2, backgroundColor: '#ffffff', useCORS: true }).then(canvas => {
    const a = document.createElement('a');
    a.href = canvas.toDataURL("image/png");
    a.download = `2026_연애성향_귀염부캐카드.png`;
    a.click();
  });
}
