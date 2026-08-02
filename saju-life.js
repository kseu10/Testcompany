function calculateInstantSajuLife() {
  const nameInput = document.getElementById('sajuName').value.trim();
  const name = nameInput || '홍길동';
  const birthDate = document.getElementById('birthDate').value || '1997-05-15';
  const gender = document.querySelector('input[name="gender"]:checked')?.value || 'M';
  const calType = document.querySelector('input[name="calendarType"]:checked')?.value || 'SOLAR';
  const timeType = document.getElementById('birthTime').value;

  const birthYear = parseInt(birthDate.split('-')[0]) || 1997;
  const birthMonth = parseInt(birthDate.split('-')[1]) || 5;
  const birthDay = parseInt(birthDate.split('-')[2]) || 15;

  // 12지신 띠
  const zodiacs = ['원숭이띠', '닭띠', '개띠', '돼지띠', '쥐띠', '소띠', '범띠', '토끼띠', '용띠', '뱀띠', '말띠', '양띠'];
  const myZodiac = zodiacs[birthYear % 12];

  // 오행 기운 결정 (생년에 따른 사주 오행)
  const elements = [
    { name: "목(木) 푸른 청룡", bg: "수(水) / 목(木) 기운", color: "#16a34a" },
    { name: "화(火) 붉은 주작", bg: "목(木) / 화(火) 기운", color: "#dc2626" },
    { name: "토(土) 황금 황룡", bg: "화(火) / 토(土) 기운", color: "#d97706" },
    { name: "금(金) 백색 백호", bg: "토(土) / 금(金) 기운", color: "#475569" },
    { name: "수(水) 흑색 현무", bg: "금(金) / 수(水) 기운", color: "#2563eb" }
  ];
  const myElem = elements[(birthYear + birthMonth + birthDay) % elements.length];

  // 12가지 독자적 사주 명조 해시
  const hash = (birthYear * 37 + birthMonth * 17 + birthDay * 13 + (gender === 'M' ? 7 : 3)) % 12;

  const sajuProfiles = [
    {
      img: "saju_dragon.jpg",
      badge: "대운 만발 (大運)", class: "tier-sss-plus",
      title: `"${name}님 (${myZodiac}), ${myElem.name} 용득수 사주"`,
      desc: "대지를 뚫고 솟구치는 개척자! 30대 후반 최고의 대운이 오나, 홧김에 지르는 성급함과 보증을 조심해야 합니다.",
      money: "SSS Grade (자산 폭발)", career: "SS Grade (승승장구)", love: "S Grade (운명적 인연)",
      luckyAge: "32세 ~ 44세 (최고의 재물 전성기)",
      luckyItem: "행운 색상: 딥 블루 & 골드 | 행운 숫자: 7, 3",
      elemTitle: `${name}님 (${myZodiac})의 본성: ${myElem.name} 빛과 그림자`,
      elemDesc: `${name}님은 강한 추진력과 강인한 결단력을 지녔으나, 성격이 불같아 홧김에 지르거나 남의 시선을 너무 의식하다 헛돈을 날리는 치명적 약점이 있습니다. 강점인 추진력은 살리되 홧김에 내리는 단독 결정만 제어하면 큰 부자가 됩니다.`,
      age20s: "시드머니와 인맥을 다지는 시기입니다. ⚠️ 다만 친구 보증이나 주위의 감언이설에 속아 헛돈을 떼이거나 배신을 당할 위험이 매우 높으니 20대 금전 거래는 철저히 막아야 합니다.",
      age30s: "인생 최고의 대운이 오며 내 집 마련과 직업적 성과가 폭발합니다. ⚠️ 주의: 대박을 노리고 홧김에 무모한 갭투자를 감행하면 37세 전후 일시적 자금 융통 단절을 겪게 됩니다.",
      age40s: "부동산 자가 안착 및 안정적 불로소득 완성기! 가문이 번창하나 ⚠️ 지나친 만성 피로와 스트레스로 건강 악재가 올 수 있으니 간과 수면 관리가 필수입니다.",
      loveMarriage: `💖 나를 조용히 감싸주고 이해해 주는 온화한 토(土) 기운 배우자와 결합하면 재산이 수 배로 불어납니다. 🚫 반면 자존심만 세고 남 탓만 하는 무책임한 악연을 만나면 사주상 재산이 반토막 나는 풍파를 겪게 됩니다.`,
      moneyMethod: "친척/친구 보증 금지 & 안전 부동산", careerField: "전문직, IT, 사업, 관리직", luckyColor: "37세 / 43세 구설수 경계", healthCare: "간 보양 & 숙면 필수"
    },
    {
      badge: "귀인 조력 (貴人)", class: "tier-ss",
      title: `"${name}님 (${myZodiac}), 온화한 인복과 재물이 마르지 않는 사주"`,
      desc: "주변 사람들과의 조화가 뛰어나나, 우유부단함과 거절하지 못하는 약점으로 손해를 보기 쉽습니다.",
      money: "SS Grade (안정적 축재)", career: "SSS Grade (명예 승진)", love: "SS Grade (찰떡 궁합)",
      luckyAge: "28세 ~ 39세 (인복 및 재물 만발기)",
      luckyItem: "행운 색상: 에메랄드 그린 | 행운 숫자: 8, 2",
      elemTitle: `${name}님 (${myZodiac})의 본성: ${myElem.name} 빛과 그림자`,
      elemDesc: `${name}님은 뛰어난 친화력과 공감 능력으로 대인관계에서 큰 명예를 얻지만, 거절을 못 해 타인의 부탁이나 빚을 안아버리는 치명적 헛점이 있습니다. 확실하게 'NO'를 외치는 것이 사주상 부자가 되는 단 하나의 개운법입니다.`,
      age20s: "귀인의 조력으로 빠른 직업적 성장을 이룹니다. ⚠️ 단, 연애나 인간관계에서 거절을 못해 상처받고 헛돈을 쓰는 도화살 풍파를 주의하세요.",
      age30s: "안정적인 고수익과 명예를 품는 전성기! ⚠️ 35세 무렵 동업 제안이나 주식 찌라시에 낚여 자산을 날릴 위험이 있으니 독단적 동업은 절대 피하세요.",
      age40s: "풍요로운 삶과 자녀 복으로 안돈하는 시기입니다. ⚠️ 과도한 영양 과다 및 혈관계 질환이 올 수 있으니 체중 및 유산소 운동 관리가 필수입니다.",
      loveMarriage: `💖 친구처럼 편안하고 소통이 잘 되는 배우자를 만나면 평생 금슬이 좋습니다. 🚫 그러나 낭비벽이 심하고 이성 문제가 복잡한 연하/도화살 악연을 만나면 사주 전체의 운이 크게 흔들립니다.`,
      moneyMethod: "동업 절대 금지 & 배당주/저축", careerField: "금융, 서비스, 기획, 교육", luckyColor: "35세 / 41세 이성 풍파 주의", healthCare: "심혈관 & 체중 관리"
    },
    {
      badge: "천우신조 (天佑)", class: "tier-sss",
      title: `"${name}님 (${myZodiac}), 자수성가형 금전 대운 사주"`,
      desc: "맨손으로 시작해 시드머니를 수십 배로 튀기는 자수성가형 부자 사주! 헛돈 지출을 차단하세요.",
      money: "SSS Grade (자수성가)", career: "S+ Grade (독립 사업)", love: "A+ Grade (상생 인연)",
      luckyAge: "35세 ~ 48세 (재물 대운 최고조)",
      luckyItem: "행운 색상: 럭키 옐로우 | 행운 숫자: 1, 9",
      elemTitle: `${name}님 (${myZodiac})의 본성: ${myElem.name} 자수성가 기운`,
      elemDesc: `${name}님은 남에게 의존하지 않고 본인의 능력과 기술로 부를 일구는 뚝심 사주입니다. 남들이 포기하는 위기 속에서 기회를 잡는 직관이 탁월합니다.`,
      age20s: "남들보다 밑바닥 고생을 하지만 그만큼 돈 버는 법과 세상 물정을 일찍 체득하게 됩니다.",
      age30s: "본인의 기술이나 자산이 폭발적으로 상승하는 시기! ⚠️ 조급함에 주식 숏/선물 고위험 투자를 하면 큰 실수를 하니 정석 투자를 유지하세요.",
      age40s: "안정적인 자산가 반열 안착! 나만의 건물/사업체 보유 가능 사주입니다.",
      loveMarriage: `💖 차분하고 내조/외조를 잘해주는 가성비 최고 배우자를 만납니다. 🚫 반면 겉멋만 들고 보여주기식 사치를 좋아하는 과소비 악연은 재산을 탕진하게 만듭니다.`,
      moneyMethod: "고위험 투기 금지 & 정석 채권/부동산", careerField: "자영업, 전문 기술, 투자, 유통", luckyColor: "38세 / 44세 재물 이동 주의", healthCare: "위장 & 관절 관리"
    }
  ];

  const res = sajuProfiles[hash % sajuProfiles.length];

  if (res.img) {
    document.getElementById('sajuLifeArchetypeImg').src = res.img;
  }

  document.getElementById('sajuBadge').innerText = res.badge;
  document.getElementById('sajuBanner').className = `tier-banner ${res.class}`;
  document.getElementById('sajuTitle').innerText = res.title;
  document.getElementById('sajuDesc').innerText = res.desc;
  document.getElementById('sajuLuckyAge').innerText = res.luckyAge;
  document.getElementById('sajuLuckyItem').innerText = res.luckyItem;

  document.getElementById('statSajuMoney').innerText = res.money;
  document.getElementById('statSajuCareer').innerText = res.career;
  document.getElementById('statSajuLove').innerText = res.love;
  document.getElementById('statSajuElement').innerText = myElem.bg;

  /* 사주 평생 총운 종합 감명서 렌더링 */
  document.getElementById('lifeElemTitle').innerText = res.elemTitle;
  document.getElementById('lifeElemDesc').innerText = res.elemDesc;
  document.getElementById('age20sText').innerText = res.age20s;
  document.getElementById('age30sText').innerText = res.age30s;
  document.getElementById('age40sText').innerText = res.age40s;
  document.getElementById('loveMarriageText').innerText = res.loveMarriage;

  document.getElementById('moneyMethodText').innerText = res.moneyMethod;
  document.getElementById('careerFieldText').innerText = res.careerField;
  document.getElementById('luckyColorText').innerText = res.luckyColor;
  document.getElementById('healthCareText').innerText = res.healthCare;

  document.getElementById('startSection').classList.add('hidden');
  document.getElementById('resultSection').classList.remove('hidden');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function toggleLifeDeepReport() {
  const el = document.getElementById('lifeSajuDashboard');
  const btns = document.querySelectorAll('#toggleLifeDeepBtn');
  if (el.classList.contains('hidden')) {
    el.classList.remove('hidden');
    btns.forEach(btn => {
      btn.innerHTML = '<span><i class="fa-solid fa-chevron-up"></i> 2026 사주 평생 총운 접기 ▲</span>';
    });
    el.scrollIntoView({ behavior: 'smooth' });
  } else {
    el.classList.add('hidden');
    btns.forEach(btn => {
      btn.innerHTML = '<span><i class="fa-solid fa-scroll"></i> 📖 2026 사주 평생 총운 만세력 자세히 보기 (클릭시 열림) ▼</span>';
    });
  }
}

function resetForm() {
  document.getElementById('resultSection').classList.add('hidden');
  document.getElementById('startSection').classList.remove('hidden');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function copySajuLink() {
  navigator.clipboard.writeText(window.location.href).then(() => {
    alert('사주 평생 총운 링크가 복사되었습니다! 친구들에게 공유해보세요!');
  });
}

function shareKakao() {
  alert('카카오톡 공유 링크가 복사되었습니다!');
  copySajuLink();
}

function captureStoryCard() {
  const cardNode = document.getElementById('storyCardContainer');
  html2canvas(cardNode, { scale: 2, backgroundColor: '#ffffff', useCORS: true }).then(canvas => {
    const a = document.createElement('a');
    a.href = canvas.toDataURL("image/png");
    a.download = `2026_전통사주_평생총운카드.png`;
    a.click();
  });
}
