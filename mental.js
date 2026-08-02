const mentalQuestions = [
  {
    title: "1. 상사나 타인에게 억울하게 지적이나 비판을 받았을 때 당신의 반응은?",
    a: { text: "\"속으로 그래 니 마음대로 해라\" 하고 포커페이스로 한 귀로 듣고 흘림", score: "STRONG" },
    b: { text: "속상해서 이불 속에서 밤새 그 장면이 떠오르며 온갖 상상의 나래를 폄", score: "WEAK" }
  },
  {
    title: "2. 중요한 발표나 시험 전날 밤, 당신의 수면 상태는?",
    a: { text: "머리 대자마자 10초 만에 곯아떨어지는 기적의 꿀잠", score: "STRONG" },
    b: { text: "잘못되면 어쩌지 걱정되어서 새벽까지 잠 못 들고 뒤척임", score: "WEAK" }
  },
  {
    title: "3. 카톡을 보냈는데 상대방이 읽고 3시간 동안 답장이 없을 때?",
    a: { text: "\"바쁜가 보지 뭐\" 하고 내 할 일 하다가 카톡 온 지도 잊어버림", score: "STRONG" },
    b: { text: "\"내가 실수했나? 기분 나쁜 말 했나?\" 지난 대화 캡처해서 읽어봄", score: "WEAK" }
  },
  {
    title: "4. 갑자기 예측할 수 없는 엑시던트나 비상 상황이 발생했을 때?",
    a: { text: "당황하지 않고 \"오케이 대안 B 플랜으로 간다\" 빠르게 수습", score: "STRONG" },
    b: { text: "식은땀이 흐르고 손이 떨리며 머릿속이 하얗게 정지됨", score: "WEAK" }
  },
  {
    title: "5. 다른 사람들이 나를 보는 시선이나 평판에 대해 얼마나 신경 쓰나요?",
    a: { text: "남이 나를 어떻게 보든 내가 만족하고 내 갓생 살면 그만임", score: "STRONG" },
    b: { text: "남들에게 좋은 사람으로 보이고 싶어 내 주장도 접고 맞춰줌", score: "WEAK" }
  },
  {
    title: "6. 큰 오해나 서운한 일이 생겼을 때 당신의 멘탈 수호법은?",
    a: { text: "필요하면 팩트대로 논리적으로 한 번 말하고 미련 없이 털어냄", score: "STRONG" },
    b: { text: "혼자 속으로 삭히며 소설을 쓰다가 혼자 상처받고 굴로 들어감", score: "WEAK" }
  },
  {
    title: "7. 실패나 거절을 겪었을 때 당신의 자존감 상태는?",
    a: { text: "\"이번엔 안 되었지만 다음번엔 내 방식대로 꼭 성공한다\" 멘탈 회복", score: "STRONG" },
    b: { text: "\"역시 나는 안 되는 건가...\" 깊은 우울함에 빠짐", score: "WEAK" }
  },
  {
    title: "8. 직장이나 학교에서 빌런이나 진상 유저를 만났을 때 당신의 대처는?",
    a: { text: "감정 소비 안 하고 업무적으로만 서늘하게 차단하고 상대 안 함", score: "STRONG" },
    b: { text: "하루 종일 그 사람 때문에 스트레스받아서 두통이 옴", score: "WEAK" }
  },
  {
    title: "9. 주말이나 휴식 시간에 일 생각이나 지난 안 좋은 기억이 떠오르면?",
    a: { text: "빛의 속도로 생각을 스위치 OFF하고 신나게 노는 것에 몰입", score: "STRONG" },
    b: { text: "쉬면서도 계속 찝찝하고 마음이 불안함", score: "WEAK" }
  },
  {
    title: "10. 나에게 '번아웃(Burnout)'이란 어떤 의미인가?",
    a: { text: "푹 쉬면 금방 충전되는 일시적인 에너지 꼬임", score: "STRONG" },
    b: { text: "한 번 오면 영혼까지 바사삭 부서지는 무서운 존재", score: "WEAK" }
  },
  {
    title: "11. 낯선 새로운 환경이나 사람들 속에 혼자 던져졌을 때?",
    a: { text: "금방 적응하며 뻔뻔하게 내 페이스를 유지함", score: "STRONG" },
    b: { text: "어색하고 긴장되어 동공 지진이 일어남", score: "WEAK" }
  },
  {
    title: "12. 나 자신을 한 마디로 표현하자면?",
    a: { text: "어떤 비바람이 불어도 안 쓰러지는 대나무 멘탈", score: "STRONG" },
    b: { text: "섬세하고 부드러운 감성을 가진 쿠쿠다스 멘탈", score: "WEAK" }
  }
];

let mentalQIdx = 0;
let mentalScores = [];

function startMentalQuiz() {
  const name = document.getElementById('mentalName').value.trim();
  if (!name) {
    alert('닉네임을 입력해 주세요!');
    return;
  }
  document.getElementById('startSection').classList.add('hidden');
  document.getElementById('quizSection').classList.remove('hidden');
  mentalQIdx = 0;
  mentalScores = [];
  renderMentalQuestion();
}

function renderMentalQuestion() {
  const q = mentalQuestions[mentalQIdx];
  const progressPercent = Math.round(((mentalQIdx + 1) / mentalQuestions.length) * 100);
  
  document.getElementById('progressFill').style.width = `${progressPercent}%`;
  document.getElementById('progressText').innerText = `${mentalQIdx + 1} / ${mentalQuestions.length} 문항 (${progressPercent}%)`;

  const qContainer = document.getElementById('questionContainer');
  qContainer.innerHTML = `
    <h3 class="q-title">${q.title}</h3>
    <div class="q-options">
      <button class="option-btn" onclick="answerMentalQuestion('${q.a.score}')">
        <span class="opt-icon">🛡️</span>
        <span>${q.a.text}</span>
      </button>
      <button class="option-btn" onclick="answerMentalQuestion('${q.b.score}')">
        <span class="opt-icon">🌸</span>
        <span>${q.b.text}</span>
      </button>
    </div>
  `;
}

function answerMentalQuestion(score) {
  mentalScores.push(score);
  mentalQIdx++;
  if (mentalQIdx < mentalQuestions.length) {
    renderMentalQuestion();
  } else {
    calculateFinalMentalResult();
  }
}

function calculateFinalMentalResult() {
  const name = document.getElementById('mentalName').value.trim() || '멘탈주인';

  const strongCount = mentalScores.filter(s => s === 'STRONG').length;
  const weakCount = mentalScores.filter(s => s === 'WEAK').length;

  const archetypes = [
    {
      img: "work_2.jpg",
      badge: "SSS TIER (무적 멘탈)", class: "tier-sss-plus",
      title: `"${name}님은 타격감 0% 무적 멘탈 수호자"`,
      desc: "어떤 꼰대 질타나 야근 폭탄에도 타격감 0%! 무적의 포커페이스 보유자.",
      best: "말없이 안아주는 힐링 수호신", worst: "사사건건 감정 쥐어짜는 징징이",
      shield: "SSS Grade (강철 방어)", burnout: "12% (클린)", recovery: "SSS Grade (초스피드)", mentalKeep: "S Grade (흔들림 없음)",
      style: `${name}님은 외부의 비난이나 스트레스에 영혼을 주지 않고 내 페이스를 유지하는 '무적 멘탈 수호자'입니다.`,
      strength: "감정과 업무를 명확하게 분리하여 쓸데없는 소문이나 질타에 멘탈이 흔들리지 않습니다.",
      weaknessDetail: "타인의 감정적 슬픔에 다소 서툴러 공감 능력이 부족하다는 서운함을 들을 수 있습니다.",
      bestPartner: "💖 내 강인함을 이해해 주고 조용히 안식처가 되어주는 '힐링 수호신'",
      worstPartner: "🚫 사사건건 감정 이입을 요구하며 서운하다고 징징거리는 '감정 소모 빌런'",
      advice: "내 멘탈 방어력을 바탕으로 주변 사람들에게 따뜻한 안정감을 선사해 보세요!"
    },
    {
      img: "love_infp.jpg",
      badge: "SS TIER (쿠쿠다스 멘탈)", class: "tier-ss",
      title: `"${name}님은 몽글몽글 겉바속촉 힐링 멘탈"`,
      desc: "남의 한 마디에 이불 킥하며 소설 쓰는 감성파! 하지만 마음만은 세상 따뜻함.",
      best: "든든하게 뒤를 지켜주는 강철 리더", worst: "사사건건 지적질하는 팩폭 빌런",
      shield: "A Grade (보호 필요)", burnout: "85% (주의 필요)", recovery: "A Grade (시간 필요)", mentalKeep: "S Grade (감성 만발)",
      style: `${name}님은 섬세한 감수성과 높은 타인 배려심으로 가득 찬 '몽글몽글 힐링 멘탈'입니다.`,
      strength: "상대방의 아픔과 기분을 자기 일처럼 깊이 공감하고 위로해 주는 따뜻한 영혼을 가졌습니다.",
      weaknessDetail: "상대방의 작고 무심한 한 마디에도 속으로 상처받아 소설을 쓰다가 혼자 동굴로 들어가는 약점이 있습니다.",
      bestPartner: "💖 우유부단한 나를 든든하게 보호해 주고 확실한 확신을 주는 '강철 수호자'",
      worstPartner: "🚫 감정 이입 전혀 없이 내 상처를 '쓸데없는 소리'로 지적하는 '차가운 팩폭러'",
      advice: "타인의 비판은 당신 존재 자체에 대한 공격이 아닙니다! 나 자신을 더 많이 아껴주세요."
    }
  ];

  const archetype = strongCount >= 7 ? archetypes[0] : archetypes[1];

  if (archetype.img) {
    document.getElementById('mentalArchetypeImg').src = archetype.img;
  }

  document.getElementById('mentalBadge').innerText = archetype.badge;
  document.getElementById('mentalBanner').className = `tier-banner ${archetype.class}`;
  document.getElementById('mentalTitle').innerText = archetype.title;
  document.getElementById('mentalDesc').innerText = archetype.desc;
  document.getElementById('mentalBest').innerText = archetype.best;
  document.getElementById('mentalWorst').innerText = archetype.worst;

  document.getElementById('statMentalShield').innerText = archetype.shield;
  document.getElementById('statBurnout').innerText = archetype.burnout;
  document.getElementById('statRecovery').innerText = archetype.recovery;
  document.getElementById('statMentalKeep').innerText = archetype.mentalKeep;

  document.getElementById('mentalStyleText').innerText = archetype.style;
  document.getElementById('mentalStrengthText').innerText = archetype.strength;
  document.getElementById('mentalWeaknessDetailText').innerText = archetype.weaknessDetail;
  document.getElementById('mentalBestPartnerText').innerText = archetype.bestPartner;
  document.getElementById('mentalWorstPartnerText').innerText = archetype.worstPartner;
  document.getElementById('mentalAdviceText').innerText = archetype.advice;

  document.getElementById('quizSection').classList.add('hidden');
  document.getElementById('resultSection').classList.remove('hidden');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function toggleMentalDeepReport() {
  const el = document.getElementById('mentalDeepDashboard');
  const btns = document.querySelectorAll('#toggleMentalDeepBtn');
  if (el.classList.contains('hidden')) {
    el.classList.remove('hidden');
    btns.forEach(btn => {
      btn.innerHTML = '<span><i class="fa-solid fa-chevron-up"></i> 2026 멘탈 수호 1:1 리포트 접기 ▲</span>';
    });
    el.scrollIntoView({ behavior: 'smooth' });
  } else {
    el.classList.add('hidden');
    btns.forEach(btn => {
      btn.innerHTML = '<span><i class="fa-solid fa-shield-heart"></i> 📖 2026 멘탈 수호 1:1 팩폭 리포트 보기 (클릭시 열림) ▼</span>';
    });
  }
}

function resetForm() {
  document.getElementById('resultSection').classList.add('hidden');
  document.getElementById('quizSection').classList.add('hidden');
  document.getElementById('startSection').classList.remove('hidden');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function copyMentalLink() {
  navigator.clipboard.writeText(window.location.href).then(() => {
    alert('멘탈 방어력 테스트 링크가 복사되었습니다!');
  });
}

function shareKakao() {
  alert('카카오톡 공유 링크가 복사되었습니다!');
  copyMentalLink();
}

function captureStoryCard() {
  const cardNode = document.getElementById('storyCardContainer');
  html2canvas(cardNode, { scale: 2, backgroundColor: '#ffffff', useCORS: true }).then(canvas => {
    const a = document.createElement('a');
    a.href = canvas.toDataURL("image/png");
    a.download = `2026_멘탈방어력_귀염부캐카드.png`;
    a.click();
  });
}
