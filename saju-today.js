function calculateTodayResult() {
  const name = document.getElementById('todayName').value || '오늘의 주인공';
  const birth = document.getElementById('todayBirth').value || '1998-08-20';
  
  const todayStr = new Date().toISOString().slice(0, 10);
  const hash = (birth + todayStr).split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);

  const score = 80 + (hash % 21); // 80 ~ 100 점 사이 고득점 쾌감!

  const fortunes = [
    { badge: `${score}점 (대길 ♠)`, class: "tier-sss-plus", title: `"${name}님, 금전운 폭발! 돈이 굴러들어오는 날"`, desc: "오늘 귀인을 만나고 생각지 못한 뜻밖의 기쁨이나 수익이 찾아옵니다!", luckyItem: "행운 음식: 아이스 라떼 | 행운 방위: 동남쪽", warning: "충동 구매 & 성급한 오지랖 주의" },
    { badge: `${score}점 (길운 ★)`, class: "tier-ss", title: `"${name}님, 매력 상승! 인연과 오피스 인정 대폭발"`, desc: "말 한마디에 호감이 쌓이고 업무 해결 능력이 빛을 발하는 완벽한 하루!", luckyItem: "행운 아이템: 시계 | 행운 색상: 옐로우", warning: "저녁 수면 부족 & 카페인 과다 수면 장애" },
    { badge: `${score}점 (평온 🍀)`, class: "tier-s-plus", title: `"${name}님, 술술 풀리는 평화로운 복운의 날"`, desc: "막혔던 문제가 쉽게 풀리고 마음의 평화를 되찾는 운수 좋은 날입니다.", luckyItem: "행운 아이템: 파랑 펜 | 행운 장소: 산책로", warning: "계단 이용 시 스마트폰 주시 주의" }
  ];

  const res = fortunes[hash % fortunes.length];

  document.getElementById('todayBadge').innerText = res.badge;
  document.getElementById('todayBanner').className = `tier-banner ${res.class}`;
  document.getElementById('todayTitle').innerText = res.title;
  document.getElementById('todayDesc').innerText = res.desc;
  document.getElementById('todayLuckyItem').innerText = res.luckyItem;
  document.getElementById('todayWarning').innerText = res.warning;

  document.getElementById('statTodayMoney').innerText = `${Math.min(99, score + 1)}점 (최상)`;
  document.getElementById('statTodayLove').innerText = `${Math.min(98, score - 2)}점 (상승)`;
  document.getElementById('statTodayWork').innerText = `${Math.min(97, score - 1)}점 (원활)`;
  document.getElementById('statTodayGuard').innerText = '액운 철통 방어';

  document.getElementById('formSection').classList.add('hidden');
  document.getElementById('resultSection').classList.remove('hidden');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function resetForm() {
  document.getElementById('resultSection').classList.add('hidden');
  document.getElementById('formSection').classList.remove('hidden');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function captureStoryCard() {
  const cardNode = document.getElementById('storyCardContainer');
  html2canvas(cardNode, { scale: 2, backgroundColor: '#090a10', useCORS: true }).then(canvas => {
    const a = document.createElement('a');
    a.href = canvas.toDataURL("image/png");
    a.download = `2026_오늘의운세_행운부적.png`;
    a.click();
  });
}
