function calculateInstantDailySaju() {
  const nameInput = document.getElementById('todayName').value.trim();
  const name = nameInput || '홍길동';
  const birthDate = document.getElementById('todayBirthDate').value || '1998-08-20';
  const calType = document.querySelector('input[name="calendarType"]:checked')?.value || 'SOLAR';
  const timeType = document.getElementById('birthTime').value;

  const birthYear = parseInt(birthDate.split('-')[0]) || 1998;
  const birthMonth = parseInt(birthDate.split('-')[1]) || 8;
  const birthDay = parseInt(birthDate.split('-')[2]) || 20;

  // 12지신 띠 구하기
  const zodiacs = ['원숭이띠', '닭띠', '개띠', '돼지띠', '쥐띠', '소띠', '범띠', '토끼띠', '용띠', '뱀띠', '말띠', '양띠'];
  const myZodiac = zodiacs[birthYear % 12];

  // 매일 달라지는 사주 해시 값 계산 (12가지 다채로운 결과)
  const today = new Date();
  const hash = (birthYear * 3 + birthMonth * 7 + birthDay * 11 + today.getDate() * 19) % 12;
  const score = Math.min(100, Math.max(82, 85 + (hash % 16)));

  const sajuFortunes = [
    {
      img: "saju_dragon.jpg",
      badge: `${score}점 (대길 ♠)`, class: "tier-sss-plus",
      title: `"${name}님 (${myZodiac}), 용이 여의주를 얻듯 대운이 트이는 날"`,
      desc: "막혔던 물꼬가 트이고 구직, 금전, 계약에서 귀인의 조력을 얻습니다. 오늘 시작하는 일은 결실이 큽니다!",
      money: `${score}점 (금전 만발)`, love: "96점 (호감도 상승)", work: "98점 (성과 인정)",
      luckyItem: "행운의 숫자: 7, 3 | 행운 색상: 딥 블루 & 골드",
      warning: "과도한 카페인 섭취 및 수면 부족 경계",
      detailTitle: `${name}님 (${myZodiac})의 오늘 사주 총운 (大吉 - 용득수)`,
      totalNarrative: `오늘 ${name}님의 일간(日干) 사주는 명리학적으로 '용이 여의주를 만나는 용득수(龍得水)'의 대길한 날입니다. 동방에서 시원한 귀인의 바닷바람이 분 불어오며, 그동안 막혀있던 재물과 계약, 대인관계의 엉킨 실타래가 1초 만에 풀어집니다. 작은 씨앗을 심어도 큰 열매를 맺는 날이니 오랫동안 미루어 두었던 중요한 연락이나 제안을 오늘 집행해 보세요!`,
      morningText: "오전 06:00~12:00 : 아침 일찍 중요한 메일이나 통화를 진행하면 유리합니다. 머리가 명쾌하고 집중력이 최고조에 달하는 시간입니다.",
      afternoonText: "오후 12:00~18:00 : 금전 거래, 비즈니스 성과, 급여/포상금 등 예상치 못한 이익이 발생하는 피크 타임입니다. 직관을 믿고 추진하세요.",
      eveningText: "저녁 18:00~24:00 : 인연운이 상승하는 시간입니다. 연인이나 좋아하는 사람과 따뜻한 음식을 나누면 호감도가 급상승합니다.",
      detailMoney: "대길 (횡재수 포함)", detailLove: "96점 (인연 상생)", detailWork: "98점 (성과 인정)", detailHealth: "수면 보양 필수"
    },
    {
      badge: `${score}점 (길운 ★)`, class: "tier-ss",
      title: `"${name}님 (${myZodiac}), 뜻밖의 횡재수와 귀인이 다가오는 하루"`,
      desc: "주변 사람들이 나를 돕고 인정해주는 날입니다. 평소 고민하던 문제를 대화로 풀면 오해가 싹 사라집니다.",
      money: `${score - 1}점 (이익 발생)`, love: "98점 (연인/인연 운수대통)", work: "94점 (업무 원활)",
      luckyItem: "행운의 숫자: 8, 2 | 행운 색상: 옐로우 & 화이트",
      warning: "성급한 언행 및 홧김에 지르는 충동 구매 주의",
      detailTitle: `${name}님 (${myZodiac})의 오늘 사주 총운 (吉運 - 귀인조력)`,
      totalNarrative: `오늘 ${name}님의 사주는 십이신살 중 '천우신조(天佑神助)'의 기운이 강하게 작용하여 주변에 나를 돕는 은인이 나타나는 형국입니다. 내 장점과 성과가 널리 알려지며 평소 서운했던 대인관계나 오해가 대화 한 번에 싹 정리됩니다. 겸손한 자세를 유지하면 더 큰 재물과 인복이 모입니다.`,
      morningText: "오전 06:00~12:00 : 차분하게 오늘 할 일을 우선순위별로 정리하세요. 조급하지 않게 출발해야 행운이 만발합니다.",
      afternoonText: "오후 12:00~18:00 : 동료나 협력자와의 협업에서 귀중한 아이디어를 얻게 됩니다. 적극적으로 의견을 공유해보세요.",
      eveningText: "저녁 18:00~24:00 : 나를 위로해 주는 뜻밖의 연락이나 선물이 도착할 수 있습니다. 행복하고 여유로운 저녁을 즐기세요.",
      detailMoney: "95점 (이익 발생)", detailLove: "98점 (운수대통)", detailWork: "94점 (원만 해결)", detailHealth: "감정 과소비 주의"
    },
    {
      badge: `${score}점 (평온 🍀)`, class: "tier-s-plus",
      title: `"${name}님 (${myZodiac}), 마음이 안돈되고 재물이 서서히 모이는 날"`,
      desc: "무리한 욕심보다는 차분하게 내실을 다지면 복이 굴러들어옵니다. 저녁 시간에 힐링 라이프를 추천합니다.",
      money: "90점 (안정적 관리)", love: "92점 (따뜻한 조화)", work: "95점 (순항)",
      luckyItem: "행운의 숫자: 5, 9 | 행운 색상: 에메랄드 그린",
      warning: "계단 이용 시 휴대폰 주시 및 안전 주의",
      detailTitle: `${name}님 (${myZodiac})의 오늘 사주 총운 (平溫 - 수복강녕)`,
      totalNarrative: `오늘 ${name}님의 사주는 오행 중 '토(土)와 수(水)의 조화'가 이루어져 마음이 맑고 안돈되는 수복강녕(壽福康寧)의 하루입니다. 무리하게 큰 변화를 시도하기보다는 현재 진행 중인 일을 안정적으로 매무리짓고 스스로에게 쉼을 줄 때 자산과 건강이 함께 커집니다.`,
      morningText: "오전 06:00~12:00 : 맑은 공기를 마시며 따뜻한 차 한 잔으로 하루를 시작하세요. 스트레스가 싹 풀립니다.",
      afternoonText: "오후 12:00~18:00 : 성급하게 결정을 내리지 말고 한 번 더 검토하세요. 꼼꼼함이 큰 실수를 방지해줍니다.",
      eveningText: "저녁 18:00~24:00 : 가벼운 산책이나 좋아하는 취미에 몰입하세요. 오늘 밤 숙면이 내일의 대운을 부릅니다.",
      detailMoney: "90점 (안정 유지)", detailLove: "92점 (평온 조화)", detailWork: "95점 (무탈 순항)", detailHealth: "충분한 휴식"
    },
    {
      badge: `${score}점 (재운 만발 💰)`, class: "tier-sss",
      title: `"${name}님 (${myZodiac}), 금전 기운이 만발하는 재물 대운의 날"`,
      desc: "예상치 못한 공돈이나 환급금, 지출 절감 기회가 찾아옵니다. 소중한 지갑을 안전하게 관리하세요!",
      money: `${score}점 (금전 최고조)`, love: "88점 (평온한 대화)", work: "96점 (계약 성공)",
      luckyItem: "행운의 숫자: 1, 6 | 행운 색상: 골드 & 블랙",
      warning: "지인들의 보증 요구나 검증되지 않은 투자 찌라시 주의",
      detailTitle: `${name}님 (${myZodiac})의 오늘 사주 총운 (財運 - 재물 만발)`,
      totalNarrative: `오늘 ${name}님의 일진(日辰)은 편재(偏財)와 정재(正財)의 기운이 겹쳐 재물이 샘솟는 날입니다. 지갑이 두둑해지거나 그동안 떼일 뻔했던 돈을 받게 됩니다.`,
      morningText: "오전 06:00~12:00 : 통장 잔고 및 금융 상태를 점검하기에 가장 좋은 시간입니다.",
      afternoonText: "오후 12:00~18:00 : 계약이나 비즈니스 제안에서 내가 주도권을 쥐게 됩니다.",
      eveningText: "저녁 18:00~24:00 : 맛있는 야식을 즐기며 스스로에게 소소한 보상을 선사하세요.",
      detailMoney: "99점 (재물 극상)", detailLove: "88점 (무탈)", detailWork: "96점 (계약 성사)", detailHealth: "소화기 보양"
    }
  ];

  const res = sajuFortunes[hash % sajuFortunes.length];

  if (res.img) {
    document.getElementById('sajuTodayArchetypeImg').src = res.img;
  }

  document.getElementById('todayBadge').innerText = res.badge;
  document.getElementById('todayBanner').className = `tier-banner ${res.class}`;
  document.getElementById('todayTitle').innerText = res.title;
  document.getElementById('todayDesc').innerText = res.desc;
  document.getElementById('todayLuckyItem').innerText = res.luckyItem;
  document.getElementById('todayWarning').innerText = res.warning;

  document.getElementById('statTodayMoney').innerText = res.money;
  document.getElementById('statTodayLove').innerText = res.love;
  document.getElementById('statTodayWork').innerText = res.work;
  document.getElementById('statTodayGuard').innerText = '액운 철통 방어';

  /* 심층 총운 & 시간대별 상세 풀이 렌더링 */
  document.getElementById('detailNameZodiac').innerText = res.detailTitle;
  document.getElementById('detailTotalNarrative').innerText = res.totalNarrative;
  document.getElementById('detailMorningText').innerText = res.morningText;
  document.getElementById('detailAfternoonText').innerText = res.afternoonText;
  document.getElementById('detailEveningText').innerText = res.eveningText;

  document.getElementById('detailMoneyText').innerText = res.detailMoney;
  document.getElementById('detailLoveText').innerText = res.detailLove;
  document.getElementById('detailWorkText').innerText = res.detailWork;
  document.getElementById('detailHealthText').innerText = res.detailHealth;

  document.getElementById('startSection').classList.add('hidden');
  document.getElementById('resultSection').classList.remove('hidden');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function toggleDeepReport() {
  const el = document.getElementById('deepReportDashboard');
  const btns = document.querySelectorAll('#toggleDeepBtn');
  if (el.classList.contains('hidden')) {
    el.classList.remove('hidden');
    btns.forEach(btn => {
      btn.innerHTML = '<span><i class="fa-solid fa-chevron-up"></i> 2026 전통 사주 심층 운세 접기 ▲</span>';
    });
    el.scrollIntoView({ behavior: 'smooth' });
  } else {
    el.classList.add('hidden');
    btns.forEach(btn => {
      btn.innerHTML = '<span><i class="fa-solid fa-scroll"></i> 2026 전통 사주 심층 운세 풀이 보기 (클릭시 열림) ▼</span>';
    });
  }
}

function resetForm() {
  document.getElementById('resultSection').classList.add('hidden');
  document.getElementById('startSection').classList.remove('hidden');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function copyTodayLink() {
  navigator.clipboard.writeText(window.location.href).then(() => {
    alert('오늘의 사주 운세 링크가 복사되었습니다! 친구들에게 공유해보세요!');
  });
}

function shareKakao() {
  alert('카카오톡 공유 링크가 복사되었습니다!');
  copyTodayLink();
}

function captureStoryCard() {
  const cardNode = document.getElementById('storyCardContainer');
  html2canvas(cardNode, { scale: 2, backgroundColor: '#ffffff', useCORS: true }).then(canvas => {
    const a = document.createElement('a');
    a.href = canvas.toDataURL("image/png");
    a.download = `2026_전통사주_오늘의운세부적.png`;
    a.click();
  });
}
