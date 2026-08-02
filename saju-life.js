const sajuQuestions = [
  {
    title: "Q1. 내 인생에서 가장 소중하게 생각하는 인생의 가치는?",
    a: { text: "통장 잔고 든든한 안정적 재물과 자산", score: "MONEY" },
    b: { text: "나를 알아주는 명예와 자유로운 라이프스타일", score: "HONOR" }
  },
  {
    title: "Q2. 새로운 도전을 앞두고 주저될 때 나의 선택은?",
    a: { text: "\"실패해도 경험이다!\" 화끈하게 기회를 잡고 본다", score: "FIRE" },
    b: { text: "돌다리도 10번 두들겨보고 철저히 검증 후 시작", score: "EARTH" }
  },
  {
    title: "Q3. 나에게 뜻밖의 행운(횡재수)이 찾아온다면 어떤 형태일까?",
    a: { text: "로또 당첨이나 부동산 값 급등 등 현금/자산 폭발", score: "MONEY" },
    b: { text: "귀인을 만나 내 분야에서 일약 유명해지는 스타성", score: "HONOR" }
  },
  {
    title: "Q4. 사람들과의 인연에서 나를 상징하는 분위기는?",
    a: { text: "주변 사람들을 따뜻하게 품어주고 경청해 주는 넓은 대지", score: "EARTH" },
    b: { text: "차가운 이성과 똑부러지는 정답을 제시하는 황금 칼날", score: "METAL" }
  },
  {
    title: "Q5. 스트레스를 받을 때 나만의 마인드 컨트롤 방식은?",
    a: { text: "맛있는 음식 먹고 푹 자며 육체적 에너지를 충전", score: "EARTH" },
    b: { text: "혼자만의 시간을 가지며 명상하거나 좋아하는 취미에 몰입", score: "WATER" }
  },
  {
    title: "Q6. 내 사주에 꼭 하나 있었으면 하는 운은?",
    a: { text: "마르지 않는 샘물 같은 평생 재물운(財運)", score: "MONEY" },
    b: { text: "나를 평생 도우는 인복과 귀인운(貴人運)", score: "HONOR" }
  },
  {
    title: "Q7. 직감이나 늑대가 뇌리를 스칠 때 나의 느낌은?",
    a: { text: "내 직감은 90% 이상 맞아떨어지는 촉의 소유자", score: "WATER" },
    b: { text: "직감보다는 객관적 데이터와 수치를 신뢰", score: "METAL" }
  },
  {
    title: "Q8. 재테크나 돈 관리할 때 나의 스타일은?",
    a: { text: "공격적인 과감한 투자로 단기 대박 노리기", score: "FIRE" },
    b: { text: "안정적인 적금, 파킹통장, 안전자산 중심으로 모으기", score: "EARTH" }
  },
  {
    title: "Q9. 내 인생 최고의 전성기는 몇 세일까?",
    a: { text: "30대! 가장 젊고 정력적일 때 자산을 불리고 싶다", score: "FIRE" },
    b: { text: "40~50대! 묵직하게 숙성되어 자산가로 군림할 때", score: "EARTH" }
  },
  {
    title: "Q10. 내가 바라는 나의 노년 모습은?",
    a: { text: "한강뷰 아파트에서 여유롭게 여행 다디는 조물주 위 건물주", score: "MONEY" },
    b: { text: "모든 사람들에게 존경받고 대우받는 인품의 어른", score: "HONOR" }
  }
];

let sajuQIdx = 0;
let sajuScores = [];

function startSajuQuiz() {
  const name = document.getElementById('sajuName').value.trim();
  if (!name) {
    alert('이름 또는 닉네임을 입력해 주세요!');
    return;
  }
  sajuQIdx = 0;
  sajuScores = [];
  document.getElementById('startSection').classList.add('hidden');
  document.getElementById('quizSection').classList.remove('hidden');
  renderSajuQuestion();
}

function renderSajuQuestion() {
  const q = sajuQuestions[sajuQIdx];
  const total = sajuQuestions.length;
  const pct = Math.round(((sajuQIdx + 1) / total) * 100);

  document.getElementById('progressFill').style.width = `${pct}%`;
  document.getElementById('progressText').innerText = `${sajuQIdx + 1} / ${total} 문항 (${pct}%)`;

  const container = document.getElementById('questionContainer');
  container.innerHTML = `
    <h3 class="q-title">${q.title}</h3>
    <div class="q-options">
      <button class="option-btn" onclick="answerSajuQuestion('${q.a.score}')">
        <span class="opt-icon">🔮</span>
        <span>${q.a.text}</span>
      </button>
      <button class="option-btn" onclick="answerSajuQuestion('${q.b.score}')">
        <span class="opt-icon">🌟</span>
        <span>${q.b.text}</span>
      </button>
    </div>
  `;
}

function answerSajuQuestion(score) {
  sajuScores.push(score);
  sajuQIdx++;
  if (sajuQIdx < sajuQuestions.length) {
    renderSajuQuestion();
  } else {
    calculateFinalSajuResult();
  }
}

function calculateFinalSajuResult() {
  const name = document.getElementById('sajuName').value.trim() || '사주 주주';

  const moneyCount = sajuScores.filter(s => s === 'MONEY').length;
  const fireCount = sajuScores.filter(s => s === 'FIRE').length;
  const earthCount = sajuScores.filter(s => s === 'EARTH').length;

  let archetype = {
    badge: "대운 만발", class: "tier-sss-plus",
    title: `"${name}님은 화(火) 기운 만발! 재물 대운의 수호자"`,
    desc: "열정과 행동력이 넘치며 30대 후반 최고의 재물 대운이 찾아오는 사주입니다!",
    luckyAge: "30대 후반 ~ 40대 초반 (재물 폭발기)",
    luckyItem: "행운 색상: 딥 블루 | 행운 숫자: 7, 3"
  };

  if (earthCount >= 3) {
    archetype = {
      badge: "황금 건물주", class: "tier-ss",
      title: `"${name}님은 토(土) 기운 충만! 땅과 주택 황금 사주"`,
      desc: "대지처럼 묵직하게 자산이 축적되며, 부동산과 내 집 마련으로 10억 클럽에 진입하는 대기만성형 사주입니다.",
      luckyAge: "40대 초반 (부동산/자가 횡재수)",
      luckyItem: "행운 색상: 골드 & 에메랄드 | 행운 숫자: 8, 5"
    };
  } else if (moneyCount >= 4) {
    archetype = {
      badge: "재물 폭발", class: "tier-sss",
      title: `"${name}님은 평생 금전운 마르지 않는 샘물 사주"`,
      desc: "돈을 당기는 강력한 자석! 사업이든 재테크든 돈 냄새를 맡는 능력이 일품인 횡재수 최고조 사주.",
      luckyAge: "30대 중반 (재물 스노우볼 결실)",
      luckyItem: "행운 색상: 바이올렛 & 블랙 | 행운 숫자: 1, 9"
    };
  }

  document.getElementById('sajuBadge').innerText = archetype.badge;
  document.getElementById('sajuBanner').className = `tier-banner ${archetype.class}`;
  document.getElementById('sajuTitle').innerText = archetype.title;
  document.getElementById('sajuDesc').innerText = archetype.desc;
  document.getElementById('sajuLuckyAge').innerText = archetype.luckyAge;
  document.getElementById('sajuLuckyItem').innerText = archetype.luckyItem;

  document.getElementById('statSajuMoney').innerText = moneyCount >= 3 ? 'SSS Grade' : 'S Grade';
  document.getElementById('statSajuCareer').innerText = fireCount >= 2 ? 'SS Grade' : 'A Grade';
  document.getElementById('statSajuLove').innerText = 'S Grade';
  document.getElementById('statSajuElement').innerText = earthCount >= 2 ? '토(土) 기운' : '화(火) 기운';

  document.getElementById('quizSection').classList.add('hidden');
  document.getElementById('resultSection').classList.remove('hidden');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function copySajuLink() {
  navigator.clipboard.writeText(window.location.href).then(() => {
    alert('사주 테스트 링크가 복사되었습니다! 인스타/스레드에 자랑해보세요!');
  });
}

function shareKakao() {
  alert('카카오톡 공유 링크가 복사되었습니다!');
  copySajuLink();
}

function captureStoryCard() {
  const cardNode = document.getElementById('storyCardContainer');
  html2canvas(cardNode, { scale: 2, backgroundColor: '#0c0714', useCORS: true }).then(canvas => {
    const a = document.createElement('a');
    a.href = canvas.toDataURL("image/png");
    a.download = `2026_사주인생총운_귀염부캐카드.png`;
    a.click();
  });
}
