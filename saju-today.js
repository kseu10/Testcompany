function calculateInstantDailySaju() {
  const name = document.getElementById('todayName').value.trim() || '홍길동';
  const birthDate = document.getElementById('todayBirthDate').value || '1998-08-20';
  const calType = document.querySelector('input[name="calendarType"]:checked').value;
  const timeType = document.getElementById('birthTime').value;

  const todayStr = new Date().toISOString().slice(0, 10);
  const birthYear = parseInt(birthDate.split('-')[0]) || 1998;
  const birthMonth = parseInt(birthDate.split('-')[1]) || 8;
  const birthDay = parseInt(birthDate.split('-')[2]) || 20;

  // 12지신 띠 구하기
  const zodiacs = ['원숭이띠', '닭띠', '개띠', '돼지띠', '쥐띠', '소띠', '범띠', '토끼띠', '용띠', '뱀띠', '말띠', '양띠'];
  const myZodiac = zodiacs[birthYear % 12];

  // 매일 달라지는 사주 해시 값 계산
  const hash = (birthYear * 7 + birthMonth * 13 + birthDay * 17 + new Date().getDate() * 31) % 100;
  const score = Math.min(100, Math.max(82, 85 + (hash % 16)));

  const sajuFortunes = [
    {
      badge: `${score}점 (대길 ♠)`, class: "tier-sss-plus",
      title: `"${name}님 (${myZodiac}), 용이 여의주를 얻듯 대운이 트이는 날"`,
      desc: "막혔던 물꼬가 트이고 구직, 금전, 계약에서 귀인의 조력을 얻습니다. 오늘 시작하는 일은 결실이 큽니다!",
      money: `${score}점 (금전 만발)`, love: "96점 (호감도 상승)", work: "98점 (성과 인정)",
      luckyItem: "행운의 숫자: 7, 3 | 행운 색상: 딥 블루 & 골드",
      warning: "과도한 카페인 섭취 및 수면 부족 경계"
    },
    {
      badge: `${score}점 (길운 ★)`, class: "tier-ss",
      title: `"${name}님 (${myZodiac}), 뜻밖의 횡재수와 귀인이 다가오는 하루"`,
      desc: "주변 사람들이 나를 돕고 인정해주는 날입니다. 평소 고민하던 문제를 대화로 풀면 오해가 싹 사라집니다.",
      money: `${score - 1}점 (이익 발생)`, love: "98점 (연인/인연 운수대통)", work: "94점 (업무 원활)",
      luckyItem: "행운의 숫자: 8, 2 | 행운 색상: 옐로우 & 화이트",
      warning: "성급한 언행 및 홧김에 지르는 충동 구매 주의"
    },
    {
      badge: `${score}점 (평온 🍀)`, class: "tier-s-plus",
      title: `"${name}님 (${myZodiac}), 마음이 안돈되고 재물이 서서히 모이는 날"`,
      desc: "무리한 욕심보다는 차분하게 내실을 다지면 복이 굴러들어옵니다. 저녁 시간에 힐링 라이프를 추천합니다.",
      money: "90점 (안정적 관리)", love: "92점 (따뜻한 조화)", work: "95점 (순항)",
      luckyItem: "행운의 숫자: 5, 9 | 행운 색상: 에메랄드 그린",
      warning: "계단 이용 시 휴대폰 주시 및 안전 주의"
    }
  ];

  const res = sajuFortunes[hash % sajuFortunes.length];

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

  document.getElementById('startSection').classList.add('hidden');
  document.getElementById('resultSection').classList.remove('hidden');
  window.scrollTo({ top: 0, behavior: 'smooth' });
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
