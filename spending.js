const spendingQuestions = [
  {
    title: "1. 스트레스를 극심하게 받은 날, 당신이 가장 먼저 찾는 해소법은?",
    a: { text: "배달 앱 켜서 맛있는 음식 지르고 쇼핑 장바구니 결제하기", score: "SPEND" },
    b: { text: "조용히 유튜브 보면서 홈트하거나 음악 들으며 정신 가다듬기", score: "SAVE" }
  },
  {
    title: "2. 인터넷 쇼핑 중 맘에 드는 예쁜 옷을 발견했을 때 당신의 결제 속도는?",
    a: { text: "\"고민은 배송만 늦출 뿐!\" 빛의 속도로 바로 결제 버튼 클릭", score: "SPEND" },
    b: { text: "위시리스트에 담아두고 3일 동안 최저가 및 후기 비교해 보기", score: "SAVE" }
  },
  {
    title: "3. 편의점이나 마트에 장 보러 갔을 때 당신의 구매 스타일은?",
    a: { text: "원래 사려던 것 외에도 눈에 띄는 신상 간식들 수북이 담기", score: "SPEND" },
    b: { text: "미리 적어둔 메모장 품목만 딱 사고 미련 없이 계산대로 직행", score: "SAVE" }
  },
  {
    title: "4. 택시비나 배달 팁 등 소소한 잔돈 지출에 대한 당신의 마인드는?",
    a: { text: "편의성과 기분 전환이 최우선! 몇 천원쯤은 기꺼이 지불한다", score: "SPEND" },
    b: { text: "아까운 배달 팁 3천원 아끼려고 걸어가서 포장해 오거나 버스 탐", score: "SAVE" }
  },
  {
    title: "5. 월급이 통장에 들어온 당일, 당신이 가장 먼저 하는 행동은?",
    a: { text: "그동안 갖고 싶었던 아이템 결제 및 맛집 투어로 월급빵 파티", score: "SPEND" },
    b: { text: "적금/투자 계좌로 정해진 시드머니 자동 이체부터 집행하기", score: "SAVE" }
  },
  {
    title: "6. 브랜드 신상 팝업스토어나 세일 행사를 접했을 때 당신의 행동은?",
    a: { text: "무조건 가서 구경하고 세일 품목 최소 하나는 건져와야 직성 풀림", score: "SPEND" },
    b: { text: "\"진짜 필요한 거 아니면 안 간다\" 쿨하게 무시하기", score: "SAVE" }
  },
  {
    title: "7. 내가 생각하는 '가치 있는 지출'의 기준이란?",
    a: { text: "지금 이 순간의 행복과 특별한 경험, 감성 힐링 라이프", score: "SPEND" },
    b: { text: "미래의 자산 안정성과 확실한 시드머니 불리기", score: "SAVE" }
  },
  {
    title: "8. 카페에서 커피나 디저트를 주문할 때 당신의 행동은?",
    a: { text: "시그니처 음료에 갓 구운 베이커리 디저트까지 팍팍 추가", score: "SPEND" },
    b: { text: "기본 아메리카노 또는 텀블러 할인 혜택 알뜰하게 챙기기", score: "SAVE" }
  },
  {
    title: "9. 나에게 '할부 구매(신용카드)'란 어떤 의미인가?",
    a: { text: "미래의 내가 갚아줄 거니까 일단 갖고 싶은 거 사는 유용한 제도", score: "SPEND" },
    b: { text: "이자가 아깝고 수틀리면 가계부 꼬이니 무조건 일시불/체크카드", score: "SAVE" }
  },
  {
    title: "10. 친구가 뜬금없이 사치스러운 고급 호텔 애플망고 빙수를 먹으러 가자고 한다면?",
    a: { text: "\"오 좋아! 인스타 사진 각이다\" 기분 좋게 따라가서 즐긴다", score: "SPEND" },
    b: { text: "\"빙수 하나에 9만원은 선 넘었지\" 은근슬쩍 대안을 제시한다", score: "SAVE" }
  },
  {
    title: "11. 집 안 구석에 안 쓰는 물건들이 쌓여 있을 때 당신의 해결책은?",
    a: { text: "귀찮아서 구석에 방치하다가 언젠가 쓰겠지 하고 놔둠", score: "SPEND" },
    b: { text: "당근마켓에 부지런히 올려서 현금화하고 동전 모으기", score: "SAVE" }
  },
  {
    title: "12. 내년 1년 후의 내 통장 잔고를 예상해 볼 때 당신의 기분은?",
    a: { text: "\"어떻게든 잘 살겠지 뭐!\" 현재의 소소한 탕진을 즐긴다", score: "SPEND" },
    b: { text: "목표 시드머니 달성을 위해 매달 가계부를 쓰며 치밀하게 관리", score: "SAVE" }
  }
];

let spendingQIdx = 0;
let spendingScores = [];

function startSpendingQuiz() {
  const name = document.getElementById('spendingName').value.trim();
  if (!name) {
    alert('닉네임을 입력해 주세요!');
    return;
  }
  document.getElementById('startSection').classList.add('hidden');
  document.getElementById('quizSection').classList.remove('hidden');
  spendingQIdx = 0;
  spendingScores = [];
  renderSpendingQuestion();
}

function renderSpendingQuestion() {
  const q = spendingQuestions[spendingQIdx];
  const progressPercent = Math.round(((spendingQIdx + 1) / spendingQuestions.length) * 100);
  
  document.getElementById('progressFill').style.width = `${progressPercent}%`;
  document.getElementById('progressText').innerText = `${spendingQIdx + 1} / ${spendingQuestions.length} 문항 (${progressPercent}%)`;

  const qContainer = document.getElementById('questionContainer');
  qContainer.innerHTML = `
    <h3 class="q-title">${q.title}</h3>
    <div class="q-options">
      <button class="option-btn" onclick="answerSpendingQuestion('${q.a.score}')">
        <span class="opt-icon">💳</span>
        <span>${q.a.text}</span>
      </button>
      <button class="option-btn" onclick="answerSpendingQuestion('${q.b.score}')">
        <span class="opt-icon">🌱</span>
        <span>${q.b.text}</span>
      </button>
    </div>
  `;
}

function answerSpendingQuestion(score) {
  spendingScores.push(score);
  spendingQIdx++;
  if (spendingQIdx < spendingQuestions.length) {
    renderSpendingQuestion();
  } else {
    calculateFinalSpendingResult();
  }
}

function calculateFinalSpendingResult() {
  const name = document.getElementById('spendingName').value.trim() || '탕진러';

  const spendCount = spendingScores.filter(s => s === 'SPEND').length;
  const saveCount = spendingScores.filter(s => s === 'SAVE').length;

  const archetypes = [
    {
      img: "work_3.jpg",
      badge: "SSS TIER (탕진 마왕)", class: "tier-sss-plus",
      title: `"${name}님은 감성 충동 탕진 마왕"`,
      desc: "스트레스는 지름신으로 해소! 일단 지르고 보는 감성 충동 1등 탕진러.",
      best: "갓생 가성비 혜택 마왕", worst: "사치 허세 플렉스 빌런",
      shoppingSpree: "SSS Grade (지름신 접신)", emptyAccount: "98% (위험 수치)", couponSense: "B Grade (귀차니즘)", seedMoney: "C Grade (보완 필요)",
      style: `${name}님은 스트레스나 우울함을 즉각적인 장바구니 결제로 해소하는 '감성 충동 탕진러'입니다.`,
      strength: "나 자신과 사랑하는 사람을 위한 선물과 행복에 아낌없이 투자하는 낭만파입니다.",
      weaknessDetail: "소소하게 잔돈 지출과 할부를 무심코 긁다 보면 월말 카드값 명세서에 멘탈이 나가는 지출 구멍이 존재합니다.",
      bestPartner: "💖 내 과소비를 차분하게 잡아주고 혜택을 챙겨주는 '가성비 마왕'",
      worstPartner: "🚫 같이 신나서 신상 지르자고 부추기는 '과소비 수호신'",
      advice: "월급날 자동 적금 이체를 설정하여 강제 시드머니를 선대출 후지출 방식으로 확보하세요!"
    },
    {
      img: "work_1.jpg",
      badge: "SS TIER (가성비 수집가)", class: "tier-ss",
      title: `"${name}님은 갓생 가성비 혜택 수집가"`,
      desc: "쿠폰, 적립금, 텀블러 할인까지 알뜰하게 챙겨 실속만 쏙 뽑아먹는 자산 재테크 장인.",
      best: "감성 충동 탕진 마왕", worst: "무계획 낭비 럭비공",
      shoppingSpree: "A Grade (이성적 지출)", emptyAccount: "15% (안전 지대)", couponSense: "SSS Grade (혜택 만렙)", seedMoney: "SSS Grade (시드머니 팍팍)",
      style: `${name}님은 똑똑한 비교와 할인 혜택으로 쓸데없는 지출을 철저히 차단하는 '스마트 갓생 가성비 장인'입니다.`,
      strength: "적립금, 쿠폰, 최저가 알람을 기가 막히게 활용하여 동일한 물건도 남들보다 30% 싸게 구매합니다.",
      weaknessDetail: "지나치게 몇 백원 할인에 연연하다가 스트레스를 받거나 타인에게 짠돌이로 오해받을 수 있습니다.",
      bestPartner: "💖 내 알뜰함을 칭찬해 주고 시드머니 재테크 비전을 함께하는 '스마트 갓생러'",
      worstPartner: "🚫 무조건 사치품을 자랑하고 짠돌이라고 놀리는 '사치 빌런'",
      advice: "가끔은 나 고생했으니 나에게 주는 소소한 프리미엄 선물로 인생의 낭만을 챙겨보세요!"
    }
  ];

  const archetype = spendCount >= 7 ? archetypes[0] : archetypes[1];

  if (archetype.img) {
    document.getElementById('spendingArchetypeImg').src = archetype.img;
  }

  document.getElementById('spendingBadge').innerText = archetype.badge;
  document.getElementById('spendingBanner').className = `tier-banner ${archetype.class}`;
  document.getElementById('spendingTitle').innerText = archetype.title;
  document.getElementById('spendingDesc').innerText = archetype.desc;
  document.getElementById('spendingBest').innerText = archetype.best;
  document.getElementById('spendingWorst').innerText = archetype.worst;

  document.getElementById('statShoppingSpree').innerText = archetype.shoppingSpree;
  document.getElementById('statEmptyAccount').innerText = archetype.emptyAccount;
  document.getElementById('statCouponSense').innerText = archetype.couponSense;
  document.getElementById('statSeedMoney').innerText = archetype.seedMoney;

  document.getElementById('spendingStyleText').innerText = archetype.style;
  document.getElementById('spendingStrengthText').innerText = archetype.strength;
  document.getElementById('spendingWeaknessDetailText').innerText = archetype.weaknessDetail;
  document.getElementById('spendingBestPartnerText').innerText = archetype.bestPartner;
  document.getElementById('spendingWorstPartnerText').innerText = archetype.worstPartner;
  document.getElementById('spendingAdviceText').innerText = archetype.advice;

  document.getElementById('quizSection').classList.add('hidden');
  document.getElementById('resultSection').classList.remove('hidden');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function toggleSpendingDeepReport() {
  const el = document.getElementById('spendingDeepDashboard');
  const btns = document.querySelectorAll('#toggleSpendingDeepBtn');
  if (el.classList.contains('hidden')) {
    el.classList.remove('hidden');
    btns.forEach(btn => {
      btn.innerHTML = '<span><i class="fa-solid fa-chevron-up"></i> 2026 탕진잼 1:1 영수증 리포트 접기 ▲</span>';
    });
    el.scrollIntoView({ behavior: 'smooth' });
  } else {
    el.classList.add('hidden');
    btns.forEach(btn => {
      btn.innerHTML = '<span><i class="fa-solid fa-receipt"></i> 📖 2026 탕진잼 1:1 영수증 팩폭 리포트 보기 (클릭시 열림) ▼</span>';
    });
  }
}

function resetForm() {
  document.getElementById('resultSection').classList.add('hidden');
  document.getElementById('quizSection').classList.add('hidden');
  document.getElementById('startSection').classList.remove('hidden');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function copySpendingLink() {
  navigator.clipboard.writeText(window.location.href).then(() => {
    alert('소비 성향 테스트 링크가 복사되었습니다!');
  });
}

function shareKakao() {
  alert('카카오톡 공유 링크가 복사되었습니다!');
  copySpendingLink();
}

function captureStoryCard() {
  const cardNode = document.getElementById('storyCardContainer');
  html2canvas(cardNode, { scale: 2, backgroundColor: '#ffffff', useCORS: true }).then(canvas => {
    const a = document.createElement('a');
    a.href = canvas.toDataURL("image/png");
    a.download = `2026_소비성향_귀염부캐카드.png`;
    a.click();
  });
}
