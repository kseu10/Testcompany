const faceQuestions = [
  {
    title: "1. 처음 보는 사람들과의 모임에 들어섰을 때 표정과 첫인상은?",
    a: { text: "먼저 눈이 마주치면 밝게 미소 지으며 친근하게 인사하기", score: "CUTE" },
    b: { text: "차분하고 조용하게 자리를 찾아 앉으며 사태를 관찰하기", score: "CHIC" }
  },
  {
    title: "2. 사람들이 나를 처음 보았을 때 주로 해주는 첫인상 피드백은?",
    a: { text: "\"웃는 모습이 무해하고 선해 보여요! 순둥순둥해요\"", score: "CUTE" },
    b: { text: "\"도도하고 시크해 보여요! 차가운 도시 사람 같아요\"", score: "CHIC" }
  },
  {
    title: "3. 대화할 때 당신의 눈빛과 표정 변화 스타일은?",
    a: { text: "눈웃음과 리액션이 풍부해서 감정이 얼굴에 다 드러남", score: "CUTE" },
    b: { text: "포커페이스를 유지하며 눈빛이 또렷하고 주관이 명확함", score: "CHIC" }
  },
  {
    title: "4. 평소 자주 입거나 선호하는 패션 코디 스타일은?",
    a: { text: "편안하고 오버핏한 캐주얼룩 또는 러블리 파스텔 스타일", score: "CUTE" },
    b: { text: "깔끔하고 슬림한 자켓, 무채색(블랙/서늘한 톤) 세련된 스타일", score: "CHIC" }
  },
  {
    title: "5. 처음 만난 상대가 뜬금없는 농담을 던졌을 때 당신의 반응은?",
    a: { text: "\"꺄하하!\" 리액션 크게 해주며 같이 신나서 폭소함", score: "CUTE" },
    b: { text: "픽 웃어주거나 \"어디서 나온 농담이에요?\" 피식 넘김", score: "CHIC" }
  },
  {
    title: "6. 누군가 나에게 길을 물어보거나 도움을 요청할 확률은?",
    a: { text: "이상하게 길을 걷다 보면 나한테만 길 물어보는 사람이 수두룩함", score: "CUTE" },
    b: { text: "차도녀/차도남 아우라 때문인지 사람들이 쉽게 말을 잘 못 걺", score: "CHIC" }
  },
  {
    title: "7. 나에게 어울리는 분위기를 한 마디로 표현하자면?",
    a: { text: "무해한 댕댕이, 비타민, 따뜻한 안식처", score: "CUTE" },
    b: { text: "시크한 야옹이, 엘리트 리더, 세련된 차도남녀", score: "CHIC" }
  },
  {
    title: "8. 친해진 후 주변 친구들이 말하는 내 반전 매력은?",
    a: { text: "\"처음엔 순둥이인 줄 알았는데 은근 고집 있고 단호하네!\"", score: "CUTE" },
    b: { text: "\"처음엔 차가워서 무서웠는데 알고 보니 완전 허당 털털이네!\"", score: "CHIC" }
  },
  {
    title: "9. 인생 샷(셀카/남이 찍어준 사진)에서 가장 잘 나오는 인상은?",
    a: { text: "해맑게 웃고 있거나 장난스러운 귀여운 포즈", score: "CUTE" },
    b: { text: "무표정으로 렌즈를 주시하거나 감성적인 각도", score: "CHIC" }
  },
  {
    title: "10. 나에게 어울리는 나만의 상징 동물은?",
    a: { text: "골든 리트리버 댕댕이, 귀여운 햄스터", score: "CUTE" },
    b: { text: "도도한 도도 흑냥이, 눈빛 날카로운 여우", score: "CHIC" }
  },
  {
    title: "11. 서운한 상황이 생겼을 때 내 얼굴에 드러나는 변화는?",
    a: { text: "볼이 빵빵해지거나 삐친 표정이 바로 티가 남", score: "CUTE" },
    b: { text: "눈빛이 서늘하게 차가워지며 대화가 단절됨", score: "CHIC" }
  },
  {
    title: "12. 내가 추구하는 나의 매력 아우라 방향성은?",
    a: { text: "누구나 같이 있으면 마음이 편안해지는 유쾌한 비타민", score: "CUTE" },
    b: { text: "우아하고 세련되어 함부로 건드릴 수 없는 독보적 아우라", score: "CHIC" }
  }
];

let faceQIdx = 0;
let faceScores = [];

function startFaceQuiz() {
  const name = document.getElementById('faceName').value.trim();
  if (!name) {
    alert('닉네임을 입력해 주세요!');
    return;
  }
  document.getElementById('startSection').classList.add('hidden');
  document.getElementById('quizSection').classList.remove('hidden');
  faceQIdx = 0;
  faceScores = [];
  renderFaceQuestion();
}

function renderFaceQuestion() {
  const q = faceQuestions[faceQIdx];
  const progressPercent = Math.round(((faceQIdx + 1) / faceQuestions.length) * 100);
  
  document.getElementById('progressFill').style.width = `${progressPercent}%`;
  document.getElementById('progressText').innerText = `${faceQIdx + 1} / ${faceQuestions.length} 문항 (${progressPercent}%)`;

  const qContainer = document.getElementById('questionContainer');
  qContainer.innerHTML = `
    <h3 class="q-title">${q.title}</h3>
    <div class="q-options">
      <button class="option-btn" onclick="answerFaceQuestion('${q.a.score}')">
        <span class="opt-icon">✨</span>
        <span>${q.a.text}</span>
      </button>
      <button class="option-btn" onclick="answerFaceQuestion('${q.b.score}')">
        <span class="opt-icon">🕶️</span>
        <span>${q.b.text}</span>
      </button>
    </div>
  `;
}

function answerFaceQuestion(score) {
  faceScores.push(score);
  faceQIdx++;
  if (faceQIdx < faceQuestions.length) {
    renderFaceQuestion();
  } else {
    calculateFinalFaceResult();
  }
}

function calculateFinalFaceResult() {
  const name = document.getElementById('faceName').value.trim() || '아우라주인';

  const cuteCount = faceScores.filter(s => s === 'CUTE').length;
  const chicCount = faceScores.filter(s => s === 'CHIC').length;

  const archetypes = [
    {
      img: "love_enfp.jpg",
      badge: "SSS TIER (비타민 댕댕이)", class: "tier-sss-plus",
      title: `"${name}님은 무해한 비타민 순둥 댕댕이상"`,
      desc: "보는 것만으로 마음이 무해해지는 세상 달콤하고 밝은 첫인상 지배자.",
      best: "도도한 시크 야옹이상", worst: "사사건건 시니컬한 얼음공주",
      friendly: "SSS Grade (경계심 0%)", trust: "S Grade (따뜻한 신뢰)", mystic: "A Grade (솔직 담백)", lead: "SSS Grade (분위기 비타민)",
      style: `${name}님은 맑은 미소와 해맑은 에너지로 상대방의 경계심을 1초 만에 풀어버리는 '비타민 댕댕이상'입니다.`,
      strength: "누구나 편하게 다가오게 만드는 눈부신 친화력과 밝은 에너지가 최고의 강점입니다.",
      weaknessDetail: "너무 착해 보이고 거절을 잘 못할 것처럼 보여 일부 선 넘어오는 사람들이 접근할 수 있습니다.",
      bestPartner: "💖 도도해 보이지만 내 해맑은 미소에 사르르 녹아내리는 '시크 야옹이상'",
      worstPartner: "🚫 만날 때마다 시니컬하고 분위기 초 치는 '차가운 얼음공주'",
      advice: "웃을 땐 확실하게 웃되, 불합리한 상황에서는 눈빛으로 확실하게 선을 긋는 카리스마를 추가하세요!"
    },
    {
      img: "love_intj.jpg",
      badge: "SS TIER (시크 야옹이)", class: "tier-ss",
      title: `"${name}님은 도도한 시크 야옹이상"`,
      desc: "차가운 도시인 같은 시크함 속 반전 허당미! 보면 볼수록 빠져드는 독보적 아우라.",
      best: "무해한 비타민 순둥 댕댕이상", worst: "무작정 선 넘는 오지랖 빌런",
      friendly: "A Grade (시크 포커페이스)", trust: "SSS Grade (프로페셔널)", mystic: "SSS Grade (출구 없는 매력)", lead: "S+ Grade (카리스마)",
      style: `${name}님은 또렷한 눈빛과 세련된 비율로 고급스럽고 도도한 첫인상을 주는 '시크 야옹이상'입니다.`,
      strength: "함부로 건드릴 수 없는 아우라와 프로페셔널한 분위기로 높은 신뢰감을 형성합니다.",
      weaknessDetail: "처음 보는 사람들에게 '차가워 보인다', '접근하기 어렵다'는 첫인상 오해를 받을 수 있습니다.",
      bestPartner: "💖 내 시크함 속 따뜻한 반전 매력을 알아봐 주고 웃게 만들어주는 '비타민 댕댕이상'",
      worstPartner: "🚫 처음 보자마자 꼬치꼬치 개인사 묻고 무작정 선 넘는 '오지랖 빌런'",
      advice: "처음 인사할 때 살짝 부드럽게 미소 지어주는 것만으로도 호감도가 200% 폭발합니다!"
    }
  ];

  const archetype = cuteCount >= 7 ? archetypes[0] : archetypes[1];

  if (archetype.img) {
    document.getElementById('faceArchetypeImg').src = archetype.img;
  }

  document.getElementById('faceBadge').innerText = archetype.badge;
  document.getElementById('faceBanner').className = `tier-banner ${archetype.class}`;
  document.getElementById('faceTitle').innerText = archetype.title;
  document.getElementById('faceDesc').innerText = archetype.desc;
  document.getElementById('faceBest').innerText = archetype.best;
  document.getElementById('faceWorst').innerText = archetype.worst;

  document.getElementById('statAuraFriendly').innerText = archetype.friendly;
  document.getElementById('statAuraTrust').innerText = archetype.trust;
  document.getElementById('statAuraMystic').innerText = archetype.mystic;
  document.getElementById('statAuraLead').innerText = archetype.lead;

  document.getElementById('faceStyleText').innerText = archetype.style;
  document.getElementById('faceStrengthText').innerText = archetype.strength;
  document.getElementById('faceWeaknessDetailText').innerText = archetype.weaknessDetail;
  document.getElementById('faceBestPartnerText').innerText = archetype.bestPartner;
  document.getElementById('faceWorstPartnerText').innerText = archetype.worstPartner;
  document.getElementById('faceAdviceText').innerText = archetype.advice;

  document.getElementById('quizSection').classList.add('hidden');
  document.getElementById('resultSection').classList.remove('hidden');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function toggleFaceDeepReport() {
  const el = document.getElementById('faceDeepDashboard');
  const btns = document.querySelectorAll('#toggleFaceDeepBtn');
  if (el.classList.contains('hidden')) {
    el.classList.remove('hidden');
    btns.forEach(btn => {
      btn.innerHTML = '<span><i class="fa-solid fa-chevron-up"></i> 2026 첫인상 아우라 리포트 접기 ▲</span>';
    });
    el.scrollIntoView({ behavior: 'smooth' });
  } else {
    el.classList.add('hidden');
    btns.forEach(btn => {
      btn.innerHTML = '<span><i class="fa-solid fa-wand-magic-sparkles"></i> 📖 2026 첫인상 아우라 1:1 팩폭 리포트 보기 (클릭시 열림) ▼</span>';
    });
  }
}

function resetForm() {
  document.getElementById('resultSection').classList.add('hidden');
  document.getElementById('quizSection').classList.add('hidden');
  document.getElementById('startSection').classList.remove('hidden');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function copyFaceLink() {
  navigator.clipboard.writeText(window.location.href).then(() => {
    alert('첫인상 아우라 테스트 링크가 복사되었습니다!');
  });
}

function shareKakao() {
  alert('카카오톡 공유 링크가 복사되었습니다!');
  copyFaceLink();
}

function captureStoryCard() {
  const cardNode = document.getElementById('storyCardContainer');
  html2canvas(cardNode, { scale: 2, backgroundColor: '#ffffff', useCORS: true }).then(canvas => {
    const a = document.createElement('a');
    a.href = canvas.toDataURL("image/png");
    a.download = `2026_첫인상아우라_귀염부캐카드.png`;
    a.click();
  });
}
