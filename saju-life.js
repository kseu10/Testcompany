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

  const hash = (birthYear * 11 + birthMonth * 19 + birthDay * 23) % 100;

  const sajuProfiles = [
    {
      badge: "대운 만발 (大運)", class: "tier-sss-plus",
      title: `"${name}님 (${myZodiac}), ${myElem.name} 사주 만세력"`,
      desc: "대지를 뚫고 솟구치는 강인한 개척자! 30대 후반부터 인생 최고의 재물 대운이 찾아오는 사주입니다.",
      money: "SSS Grade (자산 폭발)", career: "SS Grade (승승장구)", love: "S Grade (운명적 인연)",
      luckyAge: "32세 ~ 44세 (최고의 재물 전성기)",
      luckyItem: "행운 색상: 딥 블루 & 골드 | 행운 숫자: 7, 3",
      elemTitle: `${name}님 (${myZodiac})의 본성: ${myElem.name} 기운`,
      elemDesc: `${name}님은 타고난 주체성과 곧은 결단력을 지닌 사주입니다. 남 밑에 길들여지기보다 본인만의 비전과 사업/전문성으로 판을 짜는 거목(巨木)의 기운을 가졌습니다. 시련이 와도 귀인의 도우미로 1초 만에 반등합니다.`,
      age20s: "시드머니와 기술, 직업적 전문성을 차곡차곡 쌓아 올리는 준비와 경험의 시기입니다. 헛돈 쓰지 않고 투자 밑천을 다집니다.",
      age30s: "인생 최고의 대운이 시작되는 승승장구 시기! 부동산 자가 마련 및 직업적 최고 성과로 내 삶의 주도권을 잡게 됩니다.",
      age40s: "자산가 반열 진입 및 불로소득 시스템 완성기! 가문이 번창하고 수복강녕의 복을 누리며 존경받는 인물이 됩니다.",
      loveMarriage: `배우자는 나를 진심으로 존중하고 보듬어주는 온화한 기운의 소유자입니다. 결이 잘 맞는 사람과 조화를 이루어 결혼 후 재산이 수 배 이상 늘어나는 '경사스러운 인연'을 맺게 됩니다.`,
      moneyMethod: "안전자산 + 핵심 부동산", careerField: "전문직, IT, 사업, 관리직", luckyColor: "딥 블루 & 백색", healthCare: "간 보양 & 숙면 필수"
    },
    {
      badge: "귀인 조력 (貴人)", class: "tier-ss",
      title: `"${name}님 (${myZodiac}), 온화한 인복과 재물이 마르지 않는 사주"`,
      desc: "주변 사람들과의 조화가 뛰어나고, 시간이 흐를수록 귀인이 꼬리를 물고 이어지는 만복의 사주입니다.",
      money: "SS Grade (안정적 축재)", career: "SSS Grade (명예 승진)", love: "SS Grade (찰떡 궁합)",
      luckyAge: "28세 ~ 39세 (인복 및 재물 만발기)",
      luckyItem: "행운 색상: 에메랄드 그린 | 행운 숫자: 8, 2",
      elemTitle: `${name}님 (${myZodiac})의 본성: ${myElem.name} 조화의 기운`,
      elemDesc: `${name}님은 친화력과 뛰어난 공감 능력으로 대인관계에서 큰 명예를 얻는 사주입니다. 타인에게 신뢰를 주어 중요한 보직이나 사업 파트너로 낙점되며, 평생 재물이 끊이지 않는 복을 타고났습니다.`,
      age20s: "넓은 인맥과 좋은 평판을 쌓아 올리는 인복 구축기입니다. 상사나 선배의 귀인을 만나 빠른 성장을 경험합니다.",
      age30s: "안정적인 고수익과 명예를 동시에 안게 되는 전성기! 가정을 이루고 직장에서 핵심 간부로 승진합니다.",
      age40s: "풍요로운 삶과 여유로운 리더십을 발휘하는 안정기! 자녀들의 성장과 축적된 부로 주변의 부러움을 받습니다.",
      loveMarriage: `친구처럼 편안하면서도 서로에게 감정적 안식처가 되어주는 최상의 배우자를 만납니다. 서로의 명운을 보완해주어 평생 금슬이 좋을 사주입니다.`,
      moneyMethod: "월세/배당소득 + 저축", careerField: "금융, 서비스, 기획, 교육", luckyColor: "파스텔 핑크 & 그린", healthCare: "심혈관 & 영양 관리"
    }
  ];

  const res = sajuProfiles[hash % sajuProfiles.length];

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
