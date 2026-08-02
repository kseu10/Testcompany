const workQuestions = [
  // LEAVE (1, 5, 9)
  {
    title: "1. 퇴근 5분 전, 상사가 '잠깐 나 좀 보자' 할 때 당신의 반응은?",
    a: { text: "속으로 눈물 흘리며 포커페이스 유지 후 자리에 앉는다", score: "LEAD" },
    b: { text: "빛의 속도로 짐 싸서 가방 메고 칼퇴 모드 진입", score: "LEAVE" }
  },
  {
    title: "5. 회식 장소로 무제한 삼겹살집이 결정되었을 때 당신의 자세는?",
    a: { text: "고기 구우면서 분위기 띄우고 적당히 상사 칭찬해 주기", score: "SOCIAL" },
    b: { text: "1차만 묵묵히 흡입 후 슬그머니 탈출 찬스 노리기", score: "LEAVE" }
  },
  {
    title: "9. 오늘따라 일을 진짜 일찍 마감했다! 퇴근 전 남은 1시간 동안 당신은?",
    a: { text: "노이즈 캔슬링 헤드폰 착용하고 조용히 갓생 마인드 컨트롤", score: "LEAVE" },
    b: { text: "다음 프로젝트 문서 템플릿과 단축키 연구하기", score: "LEAD" }
  },
  // LEAD (2, 6, 10)
  {
    title: "2. 팀 회의 중 말도 안 되는 아이디어를 우기는 빌런 동료가 있다면?",
    a: { text: "팩트와 수치 데이터로 조목조목 반박하여 바로잡는다", score: "LEAD" },
    b: { text: "속으로 '그래 니 마음대로 해라' 하고 얌전히 있는다", score: "RESIGN" }
  },
  {
    title: "6. 상사가 나에게 원래 내 업무가 아닌 뜬금없는 프로젝트를 부탁하면?",
    a: { text: "\"제 일정상 무리입니다\"라고 매몰차게 거절하거나 조율한다", score: "LEAD" },
    b: { text: "속으로 욕하면서 일단 \"네 알겠습니다\" 하고 수용한다", score: "RESIGN" }
  },
  {
    title: "10. 금요일 오후 5시, 긴급 수정 요청 메일이 도착했을 때?",
    a: { text: "15분 만에 초스피드로 처리하고 기분 좋게 퇴근한다", score: "LEAD" },
    b: { text: "월요일 아침으로 미루고 일단 주말 모드로 전환한다", score: "RESIGN" }
  },
  // SOCIAL (3, 7, 11)
  {
    title: "3. 회사 탕비실에서 맛있는 신상 간식을 발견했을 때?",
    a: { text: "친한 동료들에게 나눠주며 오피스 수다 한바탕", score: "SOCIAL" },
    b: { text: "내 자리 서랍에 2개 챙겨두고 비밀 힐링 타임", score: "LEAVE" }
  },
  {
    title: "7. 새 프로젝트 팀원이 배치되었을 때 라포 형성 스타일은?",
    a: { text: "커피 한 잔 사주면서 직장 꿀팁과 팀 분위기 친절히 전수", score: "SOCIAL" },
    b: { text: "메신저로 필수 매뉴얼 링크만 전달하고 내 할 일 집중", score: "LEAD" }
  },
  {
    title: "11. 회사 사내 동호회나 사제 모임 제안이 들어왔을 때?",
    a: { text: "인맥도 쌓고 친목 도모를 위해 적극 참여한다", score: "SOCIAL" },
    b: { text: "회사 밖에서까지 직장 동료 보고 싶지 않아 거절한다", score: "LEAVE" }
  },
  // RESIGN (4, 8, 12)
  {
    title: "4. 출근길 지하철/버스 안, 당신의 머릿속을 가득 채우는 생각은?",
    a: { text: "오늘 할 일 우선순위 정리 & 아이스 아메리카노 들이키기", score: "LEAD" },
    b: { text: "로또 당첨되면 오늘 당장 사직서 제출하는 상상", score: "RESIGN" }
  },
  {
    title: "8. 모니터 화면 한쪽에 몰래 켜두는 비밀 창의 정체는?",
    a: { text: "이직 스카우트 앱, 사직서 양식, 블라인드 앱", score: "RESIGN" },
    b: { text: "업무 엑셀 단축키 모음집 및 갓생 포트폴리오", score: "LEAD" }
  },
  {
    title: "12. 나에게 '직장'이란 어떤 의미인가?",
    a: { text: "내 자아실현과 연봉 펌핑을 위한 커리어 진딤돌", score: "LEAD" },
    b: { text: "숨만 쉬어도 돈 나가는 현대 사회의 피할 수 없는 수단", score: "RESIGN" }
  }
];

let workQIdx = 0;
let workScores = [];

function startWorkQuiz() {
  const name = document.getElementById('workName').value.trim();
  if (!name) {
    alert('이름 또는 닉네임을 입력해 주세요!');
    return;
  }
  document.getElementById('startSection').classList.add('hidden');
  document.getElementById('quizSection').classList.remove('hidden');
  workQIdx = 0;
  workScores = [];
  renderWorkQuestion();
}

function renderWorkQuestion() {
  const q = workQuestions[workQIdx];
  const progressPercent = Math.round(((workQIdx + 1) / workQuestions.length) * 100);
  
  document.getElementById('progressFill').style.width = `${progressPercent}%`;
  document.getElementById('progressText').innerText = `${workQIdx + 1} / ${workQuestions.length} 문항 (${progressPercent}%)`;

  const qContainer = document.getElementById('questionContainer');
  qContainer.innerHTML = `
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

  const archetypes = [
    {
      img: "work_1.jpg",
      badge: "S+ TIER (16가지 유형 중 1위)", class: "tier-s-plus",
      title: `"${name}님은 칼퇴 보장 갓생 요정"`,
      desc: "업무 스킬 만렙! 6시 정각 빛의 속도로 짐 싸서 칼퇴하는 최고 가성비 오피스 엘리트.",
      weapon: "아이스 아메리카노 + 노이즈 캔슬링 헤드폰",
      weakness: "퇴근 5분 전 \"잠깐 나 좀 보자\"",
      leaveSpeed: "SSS Grade (빛의 칼퇴)", villainIndex: "12% (무해한 갓생)", resignIndex: "25% (멘탈 안정)", salaryWin: "S Grade (수익성 우수)",
      style: `${name}님은 주어진 업무를 군더더기 없이 마감하고, 6시 정각 초스피드로 퇴근하는 '실속형 오피스 갓생러'입니다.`,
      strength: "시간 관리가 완벽하며, 엑셀/업무 자동화 단축키로 남들에게 피해를 주지 않고 깔끔하게 일을 마무리합니다.",
      weaknessDetail: "상사의 뜬금없는 오지랖이나 비효율적인 업무 프로세스를 보면 표정이 차갑게 식으며 멘탈이 사르르 녹아내립니다.",
      bestPartner: "💖 말없이 자기 할 일 100% 깔끔하게 처리하는 '독립적 갓생러'",
      worstPartner: "🚫 본인 할 일 남에게 떠넘기고 퇴근 5분 전 일 주는 '꼰대 빌런'",
      advice: "내 업무 성과를 숫자로 시각화해 연봉 협상 시 당당히 제시하세요! 회사 밖에서의 갓생 라이프가 멘탈의 강력한 방어막이 됩니다."
    },
    {
      img: "work_2.jpg",
      badge: "SSS TIER (16가지 유형 중 2위)", class: "tier-sss-plus",
      title: `"${name}님은 오피스 실세 총괄 리더"`,
      desc: "팀원들의 절대적 신뢰! 일도 잘하고 분위기까지 하드캐리하는 최강 총괄 리더 유형.",
      weapon: "듀얼 모니터 + 만능 엑셀 숏컷 키보드",
      weakness: "무임승차하고 일 미루는 빌런 동료",
      leaveSpeed: "S Grade (일 깔끔 처리)", villainIndex: "5% (클린 리더)", resignIndex: "15% (회사 체질)", salaryWin: "SSS Grade (수직 상승)",
      style: `${name}님은 탁월한 업무 리더십과 추진력으로 팀의 성과와 분위기를 동시에 하드캐리하는 '오피스 총괄 리더'입니다.`,
      strength: "막힌 프로젝트가 있을 때 솔선수범하여 판을 엎고 명확한 방향성을 제시하는 결단력이 탁월합니다.",
      weaknessDetail: "무임승차하거나 일 미루는 무능한 동료를 보면 화가 치밀어 올라 모든 일을 본인이 다 떠안는 번아웃 위험이 있습니다.",
      bestPartner: "💖 든든하게 뒤에서 지원해 주고 일 센스 넘치는 '슬기로운 수호신'",
      worstPartner: "🚫 무임승차하고 남의 성과에 숟가락 올리는 '월급 루팡 빌런'",
      advice: "모든 일을 혼자 안고 가지 말고 팀원들에게 적절히 권한을 위임하세요. 휴식이 최고의 생산성 리뉴얼입니다."
    },
    {
      img: "work_3.jpg",
      badge: "SS TIER (16가지 유형 중 3위)", class: "tier-ss",
      title: `"${name}님은 마음속 퇴직금 10억 장전러"`,
      desc: "주머니 속에 사직서 품고 다니는 조용한 이직 대기자! 월급 루팡 시크 전문가.",
      weapon: "모니터 보안 필름 + 이직 스카우트 앱",
      weakness: "갑작스러운 뜬금 일요일 야간 카톡",
      leaveSpeed: "SS Grade (전광석화)", villainIndex: "30% (시크 마이웨이)", resignIndex: "95% (다음 달 이직 가능)", salaryWin: "A Grade (연봉 펌핑 노림)",
      style: `${name}님은 모니터 보안 필름 너머로 조용히 이직 시장을 타겟팅하고 계신 '시크한 이직 준비자'입니다.`,
      strength: "회사 일에 과도하게 감정을 이입하지 않아 어떤 스트레스나 꼰대 질타에도 서늘하게 포커페이스를 유지합니다.",
      weaknessDetail: "회사에 대한 애정이 이미 떠나 있어 꼭 필요한 업무 교류 외에는 대화가 단절되어 일시적 고립감을 느낄 수 있습니다.",
      bestPartner: "💖 불필요한 참견 안 하고 서로 존중해 주는 '마이웨이 갓생러'",
      worstPartner: "🚫 수시로 야간 카톡 보내고 개인사 꼬치꼬치 묻는 '오지랖 빌런'",
      advice: "현재 회사에서의 성과도 이직용 포트폴리오의 훌륭한 무기가 됩니다! 차분히 이직할 곳을 확정한 후 기분 좋게 사직서를 던지세요."
    },
    {
      img: "work_1.jpg",
      badge: "S TIER (16가지 유형 중 4위)", class: "tier-s",
      title: `"${name}님은 영혼 가출 영끌 야근러"`,
      desc: "메신저 답장은 빛보다 빠르나 영혼은 이미 퇴근한 오피스 야근 보살.",
      weapon: "비타민 음료 + 서랍 속 영양제 만물상",
      weakness: "끝없는 긴급 수정 요청 피드백",
      leaveSpeed: "B Grade (야근 다반사)", villainIndex: "8% (순둥이)", resignIndex: "85% (방전 직전)", salaryWin: "A+ Grade (노고 인정)",
      style: `${name}님은 불평 없이 야근과 긴급 업무를 마다하지 않고 끝까지 버텨내는 '오피스 묵묵 수호신'입니다.`,
      strength: "책임감이 매우 강하고 어떤 어려운 지시가 내려와도 끝까지 완수해 내는 높은 신뢰도를 가지고 있습니다.",
      weaknessDetail: "거절을 잘 못하여 온갖 잔업을 안게 되어 영혼과 체력이 급격히 방전되는 약점이 있습니다.",
      bestPartner: "💖 따뜻하게 챙겨주고 일 분담을 도와주는 '다정한 힐러'",
      worstPartner: "🚫 퇴근 5분 전에 메일로 긴급 업무 폭탄 던지는 '악덕 상사'",
      advice: "버티는 것만이 능사가 아닙니다. 본인의 업무 한계를 명확히 전달하고 휴식을 챙기세요."
    },
    {
      img: "work_2.jpg",
      badge: "A+ TIER (16가지 유형 중 5위)", class: "tier-s",
      title: `"${name}님은 회식 생존 마스터"`,
      desc: "상사 기분 다 맞추면서 속으로는 1등 칼퇴 타이밍 계산기 굴리는 오피스 인싸.",
      weapon: "숙취해소제 + 리액션 추임새 모음집",
      weakness: "술 마시고 꼰대 소리 무한 리필",
      leaveSpeed: "A Grade (눈치 100단)", villainIndex: "15% (인싸)", resignIndex: "30% (사회생활 만렙)", salaryWin: "S Grade (처세술 우수)",
      style: `${name}님은 뛰어난 친화력과 처세술로 직장 내 인맥과 평판을 관리하는 '사회생활 마스터'입니다.`,
      strength: "상사와 동료의 성향을 귀신같이 파악하여 갈등을 완화하고 본인에게 유리한 환경을 만듭니다.",
      weaknessDetail: "타인의 시선과 평판에 지나치게 신경 쓰다 정작 본인의 실속이나 멘탈 관리를 놓칠 수 있습니다.",
      bestPartner: "💖 같이 신나게 분위기 맞추고 일도 깔끔하게 해내는 '오피스 인싸'",
      worstPartner: "🚫 만날 때마다 시니컬하고 분위기 초 치는 '불평불만 러버'",
      advice: "모든 사람에게 좋은 사람이 될 필요는 없습니다. 내 진짜 커리어와 실속을 일순위로 챙기세요."
    },
    {
      img: "work_3.jpg",
      badge: "A TIER (16가지 유형 중 6위)", class: "tier-s-plus",
      title: `"${name}님은 엑셀 마법사 자동화 장인"`,
      desc: "3시간 할 일을 단축키와 수식으로 10분 만에 끝내는 업무 효율성 극대화 천재.",
      weapon: "파이썬 자동화 매크로 + 기계식 키보드",
      weakness: "파일 수동으로 하나씩 타이핑하라는 틀꼰대",
      leaveSpeed: "SSS Grade (초스피드)", villainIndex: "10% (스마트)", resignIndex: "35% (스카우트 1순위)", salaryWin: "SS Grade (기술력 인정)",
      style: `${name}님은 비효율을 참지 못하며 스마트한 도구와 시스템으로 칼퇴를 일궈내는 '업무 자동화 장인'입니다.`,
      strength: "반복적인 노동을 단축키와 매크로로 소멸시켜 남들보다 5배 빠르고 정확하게 일을 처리합니다.",
      weaknessDetail: "수동 방식을 고집하는 아날로그 상사를 만나면 깊은 답답함에 멘탈이 붕괴될 수 있습니다.",
      bestPartner: "💖 새로운 기술을 적극 수용하고 효율을 높이 평가해 주는 '스마트 C-Level'",
      worstPartner: "🚫 종이 서류와 결재판만 고집하는 '아날로그 꼰대 상사'",
      advice: "본인의 자동화 노하우를 템플릿화하여 회사 내 강력한 직무 브랜드로 만드세요!"
    }
  ];

  let archetype = archetypes[0];
  if (leadCount >= 4) archetype = archetypes[1];
  else if (resignCount >= 4) archetype = archetypes[2];
  else if (leaveCount >= 4) archetype = archetypes[0];
  else if (socialCount >= 3) archetype = archetypes[4];
  else archetype = archetypes[(leadCount + resignCount + socialCount) % archetypes.length];

  if (archetype.img) {
    document.getElementById('workArchetypeImg').src = archetype.img;
  }

  document.getElementById('workBadge').innerText = archetype.badge;
  document.getElementById('workBanner').className = `tier-banner ${archetype.class}`;
  document.getElementById('workTitle').innerText = archetype.title;
  document.getElementById('workDesc').innerText = archetype.desc;

  document.getElementById('statLeaveHome').innerText = archetype.leaveSpeed;
  document.getElementById('statVillainIndex').innerText = archetype.villainIndex;
  document.getElementById('statResignIndex').innerText = archetype.resignIndex;
  document.getElementById('statSalaryWin').innerText = archetype.salaryWin;

  document.getElementById('workWeapon').innerText = archetype.weapon;
  document.getElementById('workWeakness').innerText = archetype.weakness;

  /* 심층 팩폭 리포트 렌더링 */
  document.getElementById('workStyleText').innerText = archetype.style;
  document.getElementById('workStrengthText').innerText = archetype.strength;
  document.getElementById('workWeaknessDetailText').innerText = archetype.weaknessDetail;
  document.getElementById('workBestPartnerText').innerText = archetype.bestPartner;
  document.getElementById('workWorstPartnerText').innerText = archetype.worstPartner;
  document.getElementById('workAdviceText').innerText = archetype.advice;

  document.getElementById('startSection').classList.add('hidden');
  document.getElementById('quizSection').classList.add('hidden');
  document.getElementById('resultSection').classList.remove('hidden');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function toggleWorkDeepReport() {
  const el = document.getElementById('workDeepDashboard');
  const btns = document.querySelectorAll('#toggleWorkDeepBtn');
  if (el.classList.contains('hidden')) {
    el.classList.remove('hidden');
    btns.forEach(btn => {
      btn.innerHTML = '<span><i class="fa-solid fa-chevron-up"></i> 2026 오피스 심층 리포트 접기 ▲</span>';
    });
    el.scrollIntoView({ behavior: 'smooth' });
  } else {
    el.classList.add('hidden');
    btns.forEach(btn => {
      btn.innerHTML = '<span><i class="fa-solid fa-scroll"></i> 📖 2026 오피스 부캐 심층 팩폭 리포트 보기 (클릭시 열림) ▼</span>';
    });
  }
}

function resetForm() {
  document.getElementById('resultSection').classList.add('hidden');
  document.getElementById('quizSection').classList.add('hidden');
  document.getElementById('startSection').classList.remove('hidden');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function copyWorkLink() {
  navigator.clipboard.writeText(window.location.href).then(() => {
    alert('직장생활 유형 테스트 링크가 복사되었습니다!');
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
