const pettyCandidates = [
  { id: 1, title: "양말 신었는데 물 밟음 🧦", desc: "새 양말 신었는데 화장실 바닥 젖은 물 밟았을 때", icon: "🧦", votes: 6890 },
  { id: 2, title: "이어폰 줄 문고리 팍 🎧", desc: "이어폰 줄이 문고리에 팍 걸려서 귀에서 튕겨 나갔을 때", icon: "🎧", votes: 5890 },
  { id: 1, title: "양말 신었는데 물 밟음 🧦", desc: "새 양말 신었는데 화장실 바닥 젖은 물 밟았을 때", icon: "🧦", scene: "🧦💦😱", badge: "🚨 젖은 양말 악몽", votes: 6780 },
  { id: 2, title: "눈앞에서 버스 출발 🚌", desc: "신호등 건너서 버스 정류장 도착하자마자 버스 출발할 때", icon: "🚌", scene: "🚌💨🏃‍♂️", badge: "🏃‍♂️ 눈앞 버스 놓침", votes: 5920 },
  { id: 3, title: "휴지 끝 지점 못 찾음 🧻", desc: "휴지나 테이프 쓰려고 하는데 끝 지점을 못 찾아서 헤맬 때", icon: "🧻", scene: "🧻🔍🤯", badge: "🤯 테이프 끝 탐색", votes: 4120 },
  { id: 4, title: "국물 옷에 튐 🍜", desc: "흰 옷 입은 날 빨간 짬뽕 국물 딱 한 방울 가슴 한가운데 튈 때", icon: "🍜", scene: "👔💥🍜", badge: "👔 흰 옷 국물 테러", votes: 6150 },
  { id: 5, title: "블루투스 이어폰 방전 🎧", desc: "지하철 탔는데 블루투스 이어폰 배터리 1% 나오면서 꺼질 때", icon: "🎧", scene: "🎧🪫🚇", badge: "🪫 지하철 이어폰 방전", votes: 5410 },
  { id: 6, title: "음식 사진 찍기 전 젓가락 🥢", desc: "인스타 사진 찍으려고 세팅해놨는데 친구가 젓가락 먼저 댈 때", icon: "🥢", scene: "📸💥🥢", badge: "📸 플레이팅 붕괴", votes: 3290 },
  { id: 7, title: "엘리베이터 닫힘 🛗", desc: "엘리베이터 층 버튼 누르고 들어가려는 순간 닫힘 버튼 누르고 홀랑 올라갈 때", icon: "🛗", scene: "🛗🚪🏃‍♀️", badge: "🛗 닫힘 얌체", votes: 4890 },
  { id: 8, title: "자동 완성 오타 전송 💬", desc: "부장님한테 카톡 보내는데 자동 완성으로 웃긴 오타 그대로 보내졌을 때", icon: "💬", scene: "💬😱📲", badge: "📲 대참사 오타 전송", votes: 5120 },
  { id: 9, title: "새끼손가락 문틀 강타 🦶", desc: "집에서 걸어가다가 침대 다리나 문틀에 새끼발가락 강하게 찍힐 때", icon: "🦶", scene: "🦶💥🪵", badge: "⚡ 새끼발가락 파괴", votes: 6450 },
  { id: 10, title: "과자 봉지 찢어짐 🍪", desc: "과자 예쁘게 뜯으려다 비닐 봉지 옆으로 쫙 찢어져서 다 쏟아질 때", icon: "🍪", scene: "🍪💥🗯️", badge: "🍪 봉지 찢어짐 쏟아질 때", votes: 3780 },
  { id: 11, title: "영화 클라이맥스 카톡 알림 📱", desc: "영화 하이라이트 씬에 휴대폰 징 진동 계속 울릴 때", icon: "📱", scene: "📱🔊🎬", badge: "🎬 하이라이트 진동", votes: 2980 },
  { id: 12, title: "샤워 중 찬물 세례 🚿", desc: "샤워 잘하고 있는데 갑자기 얼음 같은 찬물 세례 쏟아질 때", icon: "🚿", scene: "🚿🧊😱", badge: "🧊 샤워 찬물 폭탄", votes: 4670 },
  { id: 13, title: "배달 음식 젓가락 누락 🥢", desc: "배달 음식 도착해서 뜯었는데 젓가락/숟가락 안 들어있을 때", icon: "🥢", scene: "🛵🍱❓", badge: "🍱 수저 누락 멘붕", votes: 4190 },
  { id: 14, title: "손톱 옆 살점 뜯김 💅", desc: "손톱 옆에 조그만 가시 살점 뜯으려다 피나고 얼얼할 때", icon: "💅", scene: "💅🩸😭", badge: "😭 살점 뜯김 고통", votes: 3540 },
  { id: 15, title: "우산 가져온 날 해 쨍쨍 ☂️", desc: "일기예보 보고 긴 우산 챙겨서 나왔는데 하루 종일 햇빛 쨍쨍할 때", icon: "☂️", scene: "☂️☀️😅", badge: "☀️ 우산 짐 덩어리", votes: 2890 },
  { id: 16, title: "키보드 틈새 과자 가루 ⌨️", desc: "노트북 키보드 사이로 과자 부스러기 들어가서 안 빼질 때", icon: "⌨️", scene: "⌨️🍪🗯️", badge: "⌨️ 키보드 과자 가루", votes: 3120 }
];

let roundList = [];
let nextRoundList = [];
let currentPairIndex = 0;
let currentRoundName = "16강";

function startWorldCup() {
  document.getElementById('startSection').classList.add('hidden');
  document.getElementById('gameSection').classList.remove('hidden');
  
  roundList = [...pettyCandidates].sort(() => Math.random() - 0.5);
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

  document.getElementById('candAIcon').innerHTML = `
    <div class="villain-scene-frame" style="background: linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%); border-color: #fde68a;">
      <span class="villain-emoji-scene">${candA.scene || candA.icon}</span>
      <span class="villain-action-badge" style="background: #d97706;">${candA.badge || '🚨 딥빡 상황'}</span>
    </div>
  `;
  document.getElementById('candATitle').innerText = candA.title;
  document.getElementById('candADesc').innerText = candA.desc;

  document.getElementById('candBIcon').innerHTML = `
    <div class="villain-scene-frame" style="background: linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%); border-color: #fde68a;">
      <span class="villain-emoji-scene">${candB.scene || candB.icon}</span>
      <span class="villain-action-badge" style="background: #d97706;">${candB.badge || '🚨 딥빡 상황'}</span>
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
    const data = localStorage.getItem('wc_petty_votes');
    return data ? JSON.parse(data) : {};
  } catch (e) { return {}; }
}

function showWinner(winner) {
  document.getElementById('gameSection').classList.add('hidden');
  document.getElementById('resultSection').classList.remove('hidden');

  document.getElementById('winnerTitle').innerText = `"${winner.title}"`;
  document.getElementById('winnerDesc').innerText = winner.desc;

  if (document.getElementById('winnerIcon')) {
    document.getElementById('winnerIcon').innerHTML = `<span style="font-size: 5rem;">${winner.scene || winner.icon || '⚡'}</span>`;
  }

  const stored = getStoredVotes();
  stored[winner.id] = (stored[winner.id] || 0) + 1;
  localStorage.setItem('wc_petty_votes', JSON.stringify(stored));

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
    a.download = `2026_사소한짜증_월드컵_우승카드.png`;
    a.click();
  });
}

function renderRankings(winner) {
  const stored = getStoredVotes();
  const updatedCandidates = pettyCandidates.map(c => ({
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
    alert('사소한 짜증 월드컵 링크가 복사되었습니다!');
  });
}

function shareKakao() {
  alert('카카오톡 공유 링크가 복사되었습니다!');
  copyWorldCupLink();
}
