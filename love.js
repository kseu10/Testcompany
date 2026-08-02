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
    title: "4. 데이트 중 갑작스러운 비가 올 때 당신의 반응은?",
    a: { text: "현실적으로 근처 편의점 달려가 우산 2개 빠르게 사기", score: "S" },
    b: { text: "'우산 하나로 같이 쓰면 로맨틱 영화 한 장면인가?' 상상하기", score: "N" }
  },
  {
    title: "5. 첫 데이트 후 집으로 돌아가는 길, 가장 먼저 드는 생각은?",
    a: { text: "오늘 나눈 대화를 복기하며 '나한테 호감 있었나?' 감정 체크", score: "F" },
    b: { text: "오늘 피곤했는데 집에 가서 씻고 쉬어야지 현실 체력 체크", score: "T" }
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
    a: { text: "넷플릭스 같이 보며 맛있는 배달 음식 먹고 꽁냥거리기", score: "E" },
    b: { text: "각자 자기 할 일(게임, 독서) 하면서 중간중간 대화하기", score: "I" }
  },
  {
    title: "9. 연인과 해외여행 계획을 세울 때 당신의 행동은?",
    a: { text: "일자별/시간별 분 단위 엑셀 일정을 미리 짠다", score: "J" },
    b: { text: "항공권과 숙소만 잡고 구체적 일정은 현지에서 끌리는 대로", score: "P" }
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
  
  const eCount = userScores.filter(s => s === 'E').length;
  const iCount = userScores.filter(s => s === 'I').length;
  const sCount = userScores.filter(s => s === 'S').length;
  const nCount = userScores.filter(s => s === 'N').length;
  const tCount = userScores.filter(s => s === 'T').length;
  const fCount = userScores.filter(s => s === 'F').length;
  const jCount = userScores.filter(s => s === 'J').length;
  const pCount = userScores.filter(s => s === 'P').length;

  const mbti = `${eCount >= iCount ? 'E' : 'I'}${sCount >= nCount ? 'S' : 'N'}${tCount >= fCount ? 'T' : 'F'}${jCount >= pCount ? 'J' : 'P'}`;

  const mbtiProfiles = {
    ENFP: {
      img: "love_enfp.jpg",
      badge: "SSS TIER (로맨스 비타민)", class: "tier-sss-plus",
      title: `"${name}님은 로맨틱 직진 에너자이저 (ENFP)"`,
      desc: "내 사람에게 100% 올인! 함께 있으면 웃음이 끊이지 않는 세상 달콤한 비타민 사랑꾼.",
      best: "INTJ (차분하게 품어주는 갓생 힐러)", worst: "ISTJ (차가운 지적질 팩폭러)",
      style: `${name}님은 밀당 없이 직진하며 데이트마다 감동과 웃음을 선물하는 '로맨틱 에너자이저'입니다.`,
      strength: "표현력이 풍부하고 상대방에게 세상에서 가장 사랑받고 있다는 확신을 지속적으로 선사합니다.",
      weaknessDetail: "상대방이 차분하고 혼자만의 시간이 필요할 때도 억지로 밖으로 끌어내려다 일시적 마찰을 겪을 수 있습니다.",
      bestPartner: "💖 INTJ : 내 열정을 차분하게 들어주고 흔들리지 않는 중심을 잡아주는 이성적 힐러",
      worstPartner: "🚫 ISTJ : 감정 표현에 차갑고 사사건건 원칙과 규칙으로 팩트 지적질하는 타입",
      advice: "연인에게도 가끔 혼자 쉴 수 있는 힐링 타임을 선사하는 센스를 발휘하면 완벽한 로맨스가 완성됩니다."
    },
    INFJ: {
      img: "love_infj.jpg",
      badge: "SS TIER (소울메이트)", class: "tier-ss",
      title: `"${name}님은 깊은 감성 힐링 오아시스 (INFJ)"`,
      desc: "상대방의 마음 깊은 곳까지 진심으로 보듬어주는 1:1 영혼의 소울메이트 연애러.",
      best: "ENTP (재치만점 아이디어러)", worst: "ESTP (대화 없이 행동만 앞서는 타입)",
      style: `${name}님은 겉보다 마음의 결이 깊고 신뢰를 최우선으로 여기는 '영혼의 소울메이트'입니다.`,
      strength: "상대방의 작은 상처와 기분 변화를 캐치해 감동적인 안식처가 되어 줍니다.",
      weaknessDetail: "서운함이 쌓여도 바로 말하지 않고 혼자 속으로 삭히다가 한 번에 마음의 문을 닫아버리는 경향이 있습니다.",
      bestPartner: "💖 ENTP : 답답한 마음을 재치 있게 뚫어주고 신나는 비전을 보여주는 아이디어러",
      worstPartner: "🚫 ESTP : 깊은 대화 없이 겉핥기식 데이트만 즐기며 조급하게 행동하는 타입",
      advice: "혼자 참지 말고 속상한 점을 즉시 부드럽게 표현하세요! 대화가 관계를 훨씬 건강하게 만듭니다."
    },
    INFP: {
      img: "love_infp.jpg",
      badge: "S+ TIER (순정 댕댕이)", class: "tier-sss",
      title: `"${name}님은 감성 폭발 다정 댕댕이 (INFP)"`,
      desc: "오직 나만을 바라보는 순정파! 상대방 눈빛만 봐도 기분을 캐치하는 로맨티스트.",
      best: "ENTJ (카리스마 든든 수호자)", worst: "ESTJ (감정 무시하고 호통치는 타입)",
      style: `${name}님은 몽글몽글한 감수성과 순수한 사랑으로 연인을 소중히 아끼는 '순정파 댕댕이'입니다.`,
      strength: "상대방을 향한 진심 어린 응원과 손편지/서프라이즈로 잊지 못할 낭만을 선물합니다.",
      weaknessDetail: "상대방의 무뚝뚝한 한 마디에 혼자 섭섭해하며 소설을 쓰다가 혼자 상처받는 일이 잦습니다.",
      bestPartner: "💖 ENTJ : 내 우유부단함을 든든하게 리드해 주고 확실한 확신을 주는 카리스마 수호자",
      worstPartner: "🚫 ESTJ : 감정 이입 전혀 없이 내 낭만을 '쓸데없는 짓'으로 치부하는 현실주의자",
      advice: "상대방의 무뚝뚝함이 당신을 싫어해서가 아님을 인지하세요! 스스로에게 확신을 갖는 것이 중요합니다."
    },
    INTJ: {
      img: "love_intj.jpg",
      badge: "SS TIER (스마트 갓생러)", class: "tier-ss",
      title: `"${name}님은 갓생 연애 스마트 팩폭러 (INTJ)"`,
      desc: "연애도 이성적이고 똑똑하게! 쓸데없는 감정 소모 없이 미래를 함께 일구는 갓생 러버.",
      best: "ENFP (달콤한 로맨틱 에너자이저)", worst: "ESFP (계획 없이 놀기만 좋아하는 타입)",
      style: `${name}님은 이성적인 대화와 명확한 기준으로 건강한 연애 관계를 지향하는 '스마트 갓생러'입니다.`,
      strength: "오해가 생겼을 때 객관적으로 문제를 분석하고 소통하여 깔끔하게 갈등을 해결합니다.",
      weaknessDetail: "연인이 감정적 위로를 바랄 때도 팩트와 해결책만 제시해 서운함을 유발할 수 있습니다.",
      bestPartner: "💖 ENFP : 딱딱한 내 일상에 웃음과 감성을 불어넣어 주는 러블리 비타민",
      worstPartner: "🚫 ESFP : 약속이나 미래 계획 없이 무작증 충동적으로만 행동하는 럭비공",
      advice: "때로는 옳고 그름을 가리는 것보다 \"속상했겠네\"라는 공감 한 마디가 훨씬 강력한 사랑의 무기입니다."
    },
    ENTP: {
      badge: "S TIER (재치만점 밀당러)", class: "tier-s-plus",
      title: `"${name}님은 재치만점 티키타카 마스터 (ENTP)"`,
      desc: "지루할 틈이 없는 유쾌한 연애! 솔직하고 센스 넘치는 티키타카 능력자.",
      best: "INFJ (깊은 감성 힐링 오아시스)", worst: "ISFJ (답답하게 속마음 안 말하는 타입)",
      style: `${name}님은 유쾌한 장난과 재치 있는 대화로 연애의 재미를 극대화하는 '티키타카 마스터'입니다.`,
      strength: "상대방을 웃게 만들고 새로운 데이트 장소와 아이디어를 끊임없이 제공합니다.",
      weaknessDetail: "가끔 진지해야 할 순간에도 농담으로 넘기려다 상대방에게 진정성 부족으로 오해받습니다.",
      bestPartner: "💖 INFJ : 내 재치를 따스하게 받아주고 깊은 대화를 나눠주는 영혼의 파트너",
      worstPartner: "🚫 ISFJ : 내 농담에 서운해하면서 말없이 혼자 가슴에 꽁하게 담아두는 타입",
      advice: "연인이 진지한 표정일 때는 농담을 멈추고 깊이 있게 들어주는 진정성을 보여주세요!"
    },
    ESTJ: {
      badge: "SS TIER (든든한 해결사)", class: "tier-ss",
      title: `"${name}님은 든든한 가성비 오피서 (ESTJ)"`,
      desc: "말보다 확실한 행동과 준비성! 연인의 문제를 대신 해결해 주는 든든한 버팀목.",
      best: "ISFP (자유로운 힐링 아티스트)", worst: "INFP (유유부단하고 감정적인 타입)",
      style: `${name}님은 확실한 리더십과 준비성으로 연인을 케어하는 '든든한 기둥'입니다.`,
      strength: "데이트 계획부터 어려운 문제 해결까지 막힘없이 착착 집행하는 실행력을 가졌습니다.",
      weaknessDetail: "내 방식만 맞다고 고집하거나 상대방의 감정 표현을 비효율적으로 치부할 수 있습니다.",
      bestPartner: "💖 ISFP : 내 리드를 고마워하며 조용히 안식처가 되어주는 다정한 아티스트",
      worstPartner: "🚫 INFP : 현실 대책 없이 우유부단하게 징징거리기만 하는 타입",
      advice: "상대방의 자율성도 인정해 주고 조급하게 가르치려 하지 않는 자세가 필요합니다."
    },
    ISFP: {
      badge: "S TIER (힐링 아티스트)", class: "tier-s",
      title: `"${name}님은 자유로운 힐링 아티스트 (ISFP)"`,
      desc: "구속은 거절한다! 따뜻한 온기와 편안함으로 마음을 녹여주는 힐링 러버.",
      best: "ESTJ (든든하게 가이드해 주는 타입)", worst: "ENTJ (명령조로 통제하려는 타입)",
      style: `${name}님은 온화하고 따뜻한 태도로 연인에게 최상의 편안함을 선사하는 '힐링 아티스트'입니다.`,
      strength: "상대방의 취향을 세심하게 배려하고 어떤 의견이든 온화하게 수용해 줍니다.",
      weaknessDetail: "갈등을 너무 피하려다 본인의 의견을 말하지 않고 속으로 포기해 버리는 약점이 있습니다.",
      bestPartner: "💖 ESTJ : 결단력 있게 데이트와 미래를 이끌어 주는 든든한 리더",
      worstPartner: "🚫 ENTJ : 내ペース를 무시하고 군대식으로 통제하려는 카리스마 꼰대",
      advice: "좋고 싫음을 명확하게 표현해 보세요! 연인도 당신의 진짜 취향을 알고 싶어 합니다."
    },
    ENTJ: {
      badge: "SSS TIER (카리스마 리더)", class: "tier-sss-plus",
      title: `"${name}님은 비전 100% 카리스마 리더 (ENTJ)"`,
      desc: "연애도 함께 승승장구! 연인의 성장을 돕고 미래를 설계하는 비전형 사랑꾼.",
      best: "INFP (감성 폭발 다정 댕댕이)", worst: "ISFP (무계획으로 누워만 있는 타입)",
      style: `${name}님은 확실한 연애 비전과 성장을 함께 도모하는 '카리스마 비전 리더'입니다.`,
      strength: "어려운 상황에서도 연인에게 명확한 확신과 든든한 아군이 되어 주는 힘이 있습니다.",
      weaknessDetail: "상대방을 가르치려 들거나 연애조차 일처럼 승패로 접근하여 피로감을 줄 수 있습니다.",
      bestPartner: "💖 INFP : 내 강인함을 다정하게 보듬어주고 낭만을 불어넣어 주는 댕댕이",
      worstPartner: "🚫 ISFP : 아무 계획 없이 하루 종일 누워서 뒹굴거리기만 하는 무기력 타입",
      advice: "연애는 성과를 내는 프로젝트가 아닙니다. 때로는 느긋하게 함께 쉬어가는 여유를 가지세요!"
    }
  };

  const archetype = mbtiProfiles[mbti] || mbtiProfiles.ENFP;

  if (archetype.img) {
    document.getElementById('loveArchetypeImg').src = archetype.img;
  }

  document.getElementById('loveBadge').innerText = archetype.badge;
  document.getElementById('loveBanner').className = `tier-banner ${archetype.class}`;
  document.getElementById('loveTitle').innerText = archetype.title;
  document.getElementById('loveDesc').innerText = archetype.desc;
  document.getElementById('bestMatch').innerText = archetype.best;
  document.getElementById('worstMatch').innerText = archetype.worst;

  document.getElementById('statLoveExpress').innerText = fCount >= 3 ? 'SSS Grade' : 'A Grade';
  document.getElementById('statJealousy').innerText = eCount >= 3 ? 'A Grade' : 'SSS Grade';
  document.getElementById('statSomeWin').innerText = sCount >= 3 ? 'S+ Grade' : 'A Grade';
  document.getElementById('statDateCost').innerText = jCount >= 3 ? 'SSS Grade' : 'S Grade';

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
