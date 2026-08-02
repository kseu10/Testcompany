function calculateSajuLifeResult() {
  const name = document.getElementById('sajuName').value || '사주 주주';
  const birth = document.getElementById('birthDate').value || '1997-05-15';
  
  const birthYear = parseInt(birth.split('-')[0]) || 1997;
  const birthMonth = parseInt(birth.split('-')[1]) || 5;

  const elements = ['목(木) 푸른 청룡의 기운', '화(火) 붉은 태양의 기운', '토(土) 넓은 대지의 기운', '금(金) 단단한 황금의 기운', '수(水) 지혜로운 양수의 기운'];
  const elemIdx = (birthYear + birthMonth) % 5;
  const myElem = elements[elemIdx];

  const sajuTypes = [
    { badge: "대운 만발", class: "tier-sss-plus", title: `"${name}님은 화(火) 기운 만발! 재물 대운의 수호자"`, desc: "행동력이 넘치며 30대 후반 최고의 재물 대운이 찾아오는 사주입니다!", luckyAge: "30대 후반 ~ 40대 초반 (재물 폭발기)", luckyItem: "행운 색상: 딥 블루 | 행운 숫자: 7, 3" },
    { badge: "황금 대운", class: "tier-ss", title: `"${name}님은 금(金) 기운 충만! 결단력과 명예의 주인"`, desc: "단단한 목표 의식으로 한 번 잡은 기회를 100% 자산으로 전환하는 사주입니다.", luckyAge: "30대 초반 ~ 30대 중반 (사업/관운 상승)", luckyItem: "행운 색상: 골드 & 화이트 | 행운 숫자: 8, 9" },
    { badge: "풍요 만발", class: "tier-s-plus", title: `"${name}님은 토(土) 기운 안정! 자산이 단단히 쌓이는 성"`, desc: "대지처럼 묵직하게 돈과 신뢰가 들어와 평생 걱정 없는 안정적 사주입니다.", luckyAge: "40대 초반 ~ 50대 (자가/부동산 횡재)", luckyItem: "행운 색상: 베이지 & 에메랄드 | 행운 숫자: 5, 2" }
  ];

  const res = sajuTypes[birthYear % 3];

  document.getElementById('sajuBadge').innerText = res.badge;
  document.getElementById('sajuBanner').className = `tier-banner ${res.class}`;
  document.getElementById('sajuTitle').innerText = res.title;
  document.getElementById('sajuDesc').innerText = res.desc;
  document.getElementById('sajuLuckyAge').innerText = res.luckyAge;
  document.getElementById('sajuLuckyItem').innerText = res.luckyItem;

  document.getElementById('statSajuMoney').innerText = 'SSS Grade';
  document.getElementById('statSajuCareer').innerText = 'SS Grade';
  document.getElementById('statSajuLove').innerText = 'S Grade';
  document.getElementById('statSajuElement').innerText = myElem.split(' ')[0];

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
    a.download = `2026_사주인생총운_결과카드.png`;
    a.click();
  });
}
