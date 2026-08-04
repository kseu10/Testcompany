const idealCandidates = [
  { id: 1, title: "얼굴 천재 빚 1억 💸", desc: "차은우 뺨치는 얼굴 천재지만 빚이 1억 있는 이상형", icon: "💸", img: "wc_ideal_1.jpg", badge: "💎 얼굴 천재", votes: 8420 },
  { id: 2, title: "평범 외모 자산 10억 💰", desc: "외모는 지극히 평범하지만 자산이 10억인 이상형", icon: "💰", img: "wc_ideal_2.jpg", badge: "🏦 재력 만렙", votes: 7890 },
  { id: 3, title: "1분마다 칼답 초집착 📱", desc: "1분마다 뭐하냐고 카톡하고 칼답하는 초집착형", icon: "📱", img: "wc_ideal_3.jpg", badge: "💖 숨막히는 집착", votes: 6150 },
  { id: 4, title: "하루 1번 생존신고 방목 🦅", desc: "연락 안 돼서 걱정하면 밤에 하루 1번 카톡하는 방목형", icon: "🦅", img: "wc_ideal_4.jpg", badge: "🦅 외로운 방목", votes: 4780 },
  { id: 5, title: "핵노잼 바른생활 😇", desc: "너무 착하고 바른데 개그 코드가 1도 안 맞는 핵노잼", icon: "😇", img: "wc_ideal_5.jpg", badge: "🥱 바른생활 노잼", votes: 5320 },
  { id: 6, title: "배꼽도둑 나쁜남자 😈", desc: "너무 웃기고 재밌는데 가끔 나쁜 짓을 하는 배꼽도둑", icon: "😈", img: "wc_ideal_6.jpg", badge: "🤣 마성의 개그", votes: 4950 },
  { id: 7, title: "패션 테러리스트 👕", desc: "성격 좋고 잘생겼는데 패션 감각이 0에 수렴하는 테러리스트", icon: "👕", img: "wc_ideal_7.jpg", badge: "😱 패션 파괴자", votes: 5110 },
  { id: 8, title: "풀세팅 명품 콜렉터 💎", desc: "항상 완벽하게 풀세팅하지만 데이트 비용 다 명품에 쓰는 사람", icon: "💎", img: "wc_ideal_8.jpg", badge: "💸 명품 집착", votes: 3450 },
  { id: 9, title: "스킨십 제로 철벽 ❄️", desc: "플라토닉 사랑만 추구하는 스킨십 제로 철벽형", icon: "❄️", img: "wc_ideal_9.jpg", badge: "🧊 철벽 수비", votes: 3120 },
  { id: 10, title: "스킨십 몬스터 🐙", desc: "때와 장소를 가리지 않고 달라붙는 스킨십 몬스터", icon: "🐙", img: "wc_ideal_10.jpg", badge: "🐙 끈적 몬스터", votes: 2890 },
  { id: 11, title: "남사친/여사친 부자 👫", desc: "주변에 이성 친구가 바글바글해서 불안하게 만드는 타입", icon: "👫", img: "wc_ideal_11.jpg", badge: "👫 이성친구 폭발", votes: 4670 },
  { id: 12, title: "친구 0명 은둔형 🏠", desc: "친구가 단 1명도 없어서 나만 바라보는 은둔형 외톨이", icon: "🏠", img: "wc_ideal_12.jpg", badge: "🏠 나만 바라봄", votes: 4210 },
  { id: 13, title: "맞춤법 파괴자 📝", desc: "완벽한데 카톡할 때마다 '일해라 절해라' 맞춤법 다 틀리는 사람", icon: "📝", img: "wc_ideal_13.jpg", badge: "😱 한글 파괴", votes: 3980 },
  { id: 14, title: "문법경찰 훈수러 👮", desc: "띄어쓰기 하나 틀릴 때마다 가르치려 드는 문법경찰", icon: "👮", img: "wc_ideal_14.jpg", badge: "👮 깐깐한 경찰", votes: 4340 },
  { id: 15, title: "애교 만렙 투머치 💖", desc: "말끝마다 혀 짧은 소리 내는 애교 투머치", icon: "💖", img: "wc_ideal_15.jpg", badge: "🤮 닭살 애교", votes: 2540 },
  { id: 16, title: "무뚝뚝 로봇 🤖", desc: "사랑한단 말 절대 안 하는 감정 없는 AI 로봇", icon: "🤖", img: "wc_ideal_16.jpg", badge: "🤖 감정 메마름", votes: 5670 }
];

let roundList = [];
let nextRoundList = [];
let currentPairIndex = 0;
let currentRoundName = "16강";

function startWorldCup() {
  document.getElementById('startSection').classList.add('hidden');
  document.getElementById('gameSection').classList.remove('hidden');
  
  roundList = [...idealCandidates].sort(() => Math.random() - 0.5);
  nextRoundList = [];
  currentPairIndex = 0;
  currentRoundName = "16강";
  
  renderPair();
}

function renderPair() {
  const totalPairs = roundList.length / 2;
  const matchNum = currentPairIndex + 1;
  
  document.getElementById('roundTitle').innerHTML = `<i class="fa-solid fa-trophy"></i> ${currentRoundName} (${matchNum}/${totalPairs})`;
  document.getElementById('matchProgress').innerText = `Match ${matchNum}`;

  const candA = roundList[currentPairIndex * 2];
  const candB = roundList[currentPairIndex * 2 + 1];

  const visualA = candA.img ? `<img src="${candA.img}" class="villain-img-illustration" alt="${candA.title}">` : `<span class="villain-emoji-scene">${candA.scene || candA.icon}</span>`;
  const visualB = candB.img ? `<img src="${candB.img}" class="villain-img-illustration" alt="${candB.title}">` : `<span class="villain-emoji-scene">${candB.scene || candB.icon}</span>`;

  document.getElementById('candAIcon').innerHTML = `
    <div class="villain-scene-frame" style="background: linear-gradient(135deg, #fff1f2 0%, #ffe4e6 100%); border-color: #fecdd3;">
      ${visualA}
      <span class="villain-action-badge" style="background: #dc2626;">${candA.badge || '🚨 상사 빌런'}</span>
    </div>
  `;
  document.getElementById('candATitle').innerText = candA.title;
  document.getElementById('candADesc').innerText = candA.desc;

  document.getElementById('candBIcon').innerHTML = `
    <div class="villain-scene-frame" style="background: linear-gradient(135deg, #fff1f2 0%, #ffe4e6 100%); border-color: #fecdd3;">
      ${visualB}
      <span class="villain-action-badge" style="background: #dc2626;">${candB.badge || '🚨 상사 빌런'}</span>
    </div>
  `;
  document.getElementById('candBTitle').innerText = candB.title;
  document.getElementById('candBDesc').innerText = candB.desc;
}

function selectCandidate(index) {
  const winner = roundList[currentPairIndex * 2 + index];
  nextRoundList.push(winner);
  
  currentPairIndex++;
  if (currentPairIndex < roundList.length / 2) {
    renderPair();
  } else {
    if (nextRoundList.length === 1) {
      showWinner(nextRoundList[0]);
    } else {
      roundList = nextRoundList;
      nextRoundList = [];
      currentPairIndex = 0;
      if (roundList.length === 8) currentRoundName = "8강";
      else if (roundList.length === 4) currentRoundName = "준결승 (4강)";
      else if (roundList.length === 2) currentRoundName = "결승전 (FINAL)";
      renderPair();
    }
  }
}

function getStoredVotes() {
  try {
    const data = localStorage.getItem('wc_ideal_votes');
    return data ? JSON.parse(data) : {};
  } catch (e) { return {}; }
}

function showWinner(winner) {
  document.getElementById('gameSection').classList.add('hidden');
  document.getElementById('resultSection').classList.remove('hidden');

  document.getElementById('winnerTitle').innerText = `"${winner.title}"`;
  document.getElementById('winnerDesc').innerText = winner.desc;

  if (document.getElementById('winnerIcon')) {
    if (winner.img) {
      document.getElementById('winnerIcon').innerHTML = `<img src="${winner.img}" class="villain-img-illustration" style="width: 140px; height: 140px; object-fit: contain; filter: drop-shadow(0 8px 18px rgba(0,0,0,0.15)); border-radius: 16px;" alt="${winner.title}">`;
    } else {
      document.getElementById('winnerIcon').innerHTML = `<div style="font-size: 4rem; filter: drop-shadow(0 6px 12px rgba(0,0,0,0.15));">${winner.icon || '👔'}</div>`;
    }
  }

  const stored = getStoredVotes();
  stored[winner.id] = (stored[winner.id] || 0) + 1;
  localStorage.setItem('wc_ideal_votes', JSON.stringify(stored));

  if (typeof confetti === 'function') {
    confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
  }

  renderRankings(winner);
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function captureStoryCard() {
  const cardNode = document.getElementById('storyCardContainer');
  html2canvas(cardNode, { scale: 2, backgroundColor: '#ffffff', useCORS: true }).then(canvas => {
    const a = document.createElement('a');
    a.href = canvas.toDataURL("image/png");
    a.download = `2026_직장상사_월드컵_우승카드.png`;
    a.click();
  });
}

function renderRankings(winner) {
  const stored = getStoredVotes();
  const updatedCandidates = idealCandidates.map(c => ({
    ...c,
    votes: c.votes + (stored[c.id] || 0)
  }));

  const sorted = updatedCandidates.sort((a, b) => b.votes - a.votes);
  const container = document.getElementById('rankingContainer');
  const totalVotes = sorted.reduce((acc, cur) => acc + cur.votes, 0);

  container.innerHTML = sorted.slice(0, 5).map((item, idx) => {
    const percent = Math.round((item.votes / totalVotes) * 100);
    return `
      <div class="time-flow-card ${idx === 0 ? 'morning' : 'evening'}">
        <span class="time-flow-badge ${idx === 0 ? 'morning' : 'evening'}">${idx + 1}위 (${percent}%)</span>
        <div class="time-flow-body">
          <h5>${item.title}</h5>
          <p>${item.desc} (총 ${item.votes.toLocaleString()}표)</p>
        </div>
      </div>
    `;
  }).join('');
}

function copyWorldCupLink() {
  navigator.clipboard.writeText(window.location.href).then(() => {
    alert('최악의 상사 월드컵 링크가 복사되었습니다!');
  });
}

function shareKakao() {
  alert('카카오톡 공유 링크가 복사되었습니다!');
  copyWorldCupLink();
}
