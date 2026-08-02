const workQuestions = [
  {
    title: "Q1. 퇴근 10분 전, 예상치 못한 추가 업무가 내려왔을 때 나의 행동은?",
    a: { text: "\"내일 출근하자마자 1순위로 빠르게 처리하겠습니다!\" 6시 칼퇴", score: "LEAVE" },
    b: { text: "한숨 한 번 크게 쉬고 컴퓨터 다시 켜서 야근 시작", score: "OVERTIME" }
  },
  {
    title: "Q2. 점심시간 메뉴를 정할 때 나의 자세는?",
    a: { text: "\"오늘 은화수식당 돈까스 가시죠!\" 메뉴와 장소 주도적 제안", score: "LEAD" },
    b: { text: "\"저는 다 좋습니다!\" 무난하게 대세에 합류", score: "FOLLOW" }
  },
  {
    title: "Q3. 상사의 썰렁한 아재 개그를 들었을 때 나의 멘탈은?",
    a: { text: "\"와 부장님 진짜 미쳤다 ㅋㅋㅋ\" 리액션 폭발 사회생활 갓생", score: "SOCIAL" },
    b: { text: "은은하게 입꼬리만 올려 예의상 미소 발사", score: "QUIET" }
  },
  {
    title: "Q4. 월요일 아침 출근길 버스/지하철 안에서 드는 생각은?",
    a: { text: "\"이번 주도 갓생 살아서 통장 두둑하게 불려야지!\"", score: "WORK" },
    b: { text: "\"아... 로또 1등 당첨되게 해주세요 제발...\"", score: "RESIGN" }
  },
  {
    title: "Q5. 실수로 일에 오류가 발생했을 때 나의 대처는?",
    a: { text: "즉시 팀장님께 솔직하게 보고하고 빠르게 수습책 마련", score: "LEAD" },
    b: { text: "혼자 땀 뻘뻘 흘리며 조용히 원인 조치 후 해결", score: "QUIET" }
  },
  {
    title: "Q6. 회의 시간에 아이디어 발표를 요청받았을 때 나는?",
    a: { text: "미리 준비한 슬라이드와 생각한 안건을 당당하게 발표", score: "LEAD" },
    b: { text: "남들이 말하는 의견을 청취하며 핵심만 요약 정리", score: "FOLLOW" }
  },
  {
    title: "Q7. 금요일 오후 5시 30분의 내 심정은?",
    a: { text: "이미 마음은 퇴근길! 마우스 쥐는 손이 파르르 떨림", score: "LEAVE" },
    b: { text: "월요일에 할 업무 리스트 미리 다이어리에 정리", score: "WORK" }
  },
  {
    title: "Q8. 회사 동료가 개인적인 고민을 털어놓을 때 나는?",
    a: { text: "동료의 처지에 깊이 공감해주며 함께 사수 다이어트 감정 나누기", score: "SOCIAL" },
    b: { text: "이직이나 솔루션 등 현실적 이직 루트 분석 조언", score: "QUIET" }
  },
  {
    title: "Q9. 연봉 협상 시즌이 다가왔을 때 나의 마음가짐은?",
    a: { text: "내가 일년 동안 이룬 성과 자료 싹 정리해서 강력하게 요구", score: "LEAD" },
    b: { text: "회사가 제시하는 연봉 테이블 안에서 원만하게 서명", score: "FOLLOW" }
  },
  {
    title: "Q10. 나에게 있어서 '회사'란 어떤 의미인가?",
    a: { text: "내 자아실현과 경력을 쌓아 올리는 무대", score: "WORK" },
    b: { text: "나의 소중한 취미와 갓생을 유지하기 위한 든든한 월급 창고", score: "RESIGN" }
  }
];

let workQIdx = 0;
let workScores = [];

function startWorkQuiz() {
  const name = document.getElementById('workName').value.trim();
  if (!name) {
    alert('직장인 이름 또는 닉네임을 입력해 주세요!');
    return;
  }
  workQIdx = 0;
  workScores = [];
  document.getElementById('startSection').classList.add('hidden');
  document.getElementById('quizSection').classList.remove('hidden');
  renderWorkQuestion();
}

function renderWorkQuestion() {
  const q = workQuestions[workQIdx];
  const total = workQuestions.length;
  const pct = Math.round(((workQIdx + 1) / total) * 100);

  document.getElementById('progressFill').style.width = `${pct}%`;
  document.getElementById('progressText').innerText = `${workQIdx + 1} / ${total} 문항 (${pct}%)`;

  const container = document.getElementById('questionContainer');
  container.innerHTML = `
    <h3 class="q-title">${q.title}</h3>
    <div class="q-options">
      <button class="option-btn" onclick="answerWorkQuestion('${q.a.score}')">
        <span class="opt-icon">💼</span>
        <span>${q.a.text}</span>
      </button>
      <button class="option-btn" onclick="answerWorkQuestion('${q.b.score}')">
        <span class="opt-icon">⚡</span>
        <span>${q.b.text}</span>
      </button>
    </div>
  `;
}

function answerWorkQuestion(score) {
  workScores.push(score);
  workQIdx++;
  if (workQIdx < workQuestions.length) {
    renderWorkQuestion();
  } else {
    calculateFinalWorkResult();
  }
}

function calculateFinalWorkResult() {
  const name = document.getElementById('workName').value.trim() || '직장인';

  const leaveCount = workScores.filter(s => s === 'LEAVE').length;
  const leadCount = workScores.filter(s => s === 'LEAD').length;
  const socialCount = workScores.filter(s => s === 'SOCIAL').length;
  const resignCount = workScores.filter(s => s === 'RESIGN').length;

  let archetype = {
    badge: "S+ TIER", class: "tier-s-plus",
    title: `"${name}님은 칼퇴 보장 갓생 요정"`,
    desc: "업무 스킬 만렙! 6시 정각 빛의 속도로 짐 싸서 칼퇴하는 오피스 엘리트.",
    weapon: "아이스 아메리카노 + 노이즈 캔슬링 헤드폰",
    weakness: "퇴근 5분 전 \"잠깐 나 좀 보자\""
  };

  if (leadCount >= 3 && socialCount >= 2) {
    archetype = {
      badge: "SSS TIER", class: "tier-sss-plus",
      title: `"${name}님은 오피스 실세 총괄 리더"`,
      desc: "팀원들의 절대적 신뢰! 일도 잘하고 분위기도 만드는 최강 하드캐리어.",
      weapon: "듀얼 모니터 + 만능 엑셀 숏컷 키보드",
      weakness: "무임승차하고 일 안 미루는 빌런 동료"
    };
  } else if (resignCount >= 3) {
    archetype = {
      badge: "SS TIER", class: "tier-ss",
      title: `"${name}님은 마음속 퇴직금 10억 장전러"`,
      desc: "주머니 속에 서류 봉투 품고 다니는 조용한 영웅! 월급 루팡 시크 전문가.",
      weapon: "모니터 보안 필름 + 이직 스카우트 앱",
      weakness: "갑작스러운 뜬금 일요일 야간 카톡"
    };
  }

  document.getElementById('workBadge').innerText = archetype.badge;
  document.getElementById('workBanner').className = `tier-banner ${archetype.class}`;
  document.getElementById('workTitle').innerText = archetype.title;
  document.getElementById('workDesc').innerText = archetype.desc;
  document.getElementById('workWeapon').innerText = archetype.weapon;
  document.getElementById('workWeakness').innerText = archetype.weakness;

  document.getElementById('statLeaveHome').innerText = leaveCount >= 2 ? 'SSS Grade' : 'A Grade';
  document.getElementById('statVillainIndex').innerText = socialCount >= 2 ? '8% (클린)' : '20%';
  document.getElementById('statResignIndex').innerText = resignCount >= 2 ? '92% (위험)' : '55%';
  document.getElementById('statSalaryWin').innerText = leadCount >= 2 ? 'SSS Grade' : 'S Grade';

  document.getElementById('quizSection').classList.add('hidden');
  document.getElementById('resultSection').classList.remove('hidden');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function copyWorkLink() {
  navigator.clipboard.writeText(window.location.href).then(() => {
    alert('직장생활 테스트 링크가 복사되었습니다! 인스타/스레드에 자랑해보세요!');
  });
}

function shareKakao() {
  alert('카카오톡 공유 링크가 복사되었습니다!');
  copyWorkLink();
}

function captureStoryCard() {
  const cardNode = document.getElementById('storyCardContainer');
  html2canvas(cardNode, { scale: 2, backgroundColor: '#ffffff', useCORS: true }).then(canvas => {
    const a = document.createElement('a');
    a.href = canvas.toDataURL("image/png");
    a.download = `2026_직장생활유형_귀염부캐카드.png`;
    a.click();
  });
}
