const pettyCandidates = [
  { id: 1, title: "양말 신었는데 물 밟음 🧦", desc: "새 양말 신었는데 화장실 바닥 젖은 물 밟았을 때", icon: "🧦", votes: 6890 },
  { id: 2, title: "이어폰 줄 문고리 팍 🎧", desc: "이어폰 줄이 문고리에 팍 걸려서 귀에서 튕겨 나갔을 때", icon: "🎧", votes: 5890 },
  { id: 3, title: "눈앞에서 버스 떠남 🚌", desc: "버스 정류장 30m 남았는데 눈앞에서 버스 떠날 때", icon: "🚌", votes: 6120 },
  { id: 4, title: "라면 면발 혓바닥 데임 🍜", desc: "갓 끓인 라면 면발 입에 넣었는데 혓바닥 데였을 때", icon: "🍜", votes: 3450 },
  { id: 5, title: "누워서 스마트폰 얼굴 쿵 📱", desc: "스마트폰 들고 침대에 누워있다가 얼굴로 폰 떨어뜨렸을 때", icon: "📱", votes: 4780 },
  { id: 6, title: "흰 옷에 국물 튐 👕", desc: "새 옷 입고 국물 요리 먹다가 흰 옷에 빨간 국물 튈 때", icon: "👕", votes: 5340 },
  { id: 7, title: "신발 뒤꿈치 구겨짐 👟", desc: "신발 뒤꿈치 접혀 신겨서 길 한복판에서 신발 다시 신을 때", icon: "👟", votes: 2980 },
  { id: 8, title: "휴지 마지막 빈 심 🧻", desc: "화장실 휴지 마지막 한 칸 남았는데 다음 사람이 다 쓴 상태일 때", icon: "🧻", votes: 4120 },
  { id: 9, title: "엘베 닫힘 눌렀는데 탑승 🛗", desc: "엘리베이터 닫힘 누르는 순간 사람 타서 뻘쭘할 때", icon: "🛗", votes: 2670 },
  { id: 10, title: "한영키 안 누르고 줌 ⌨️", desc: "키보드 타이핑 열심히 쳤는데 한영키 안 눌려서 영어로 다 입력됐을 때", icon: "⌨️", votes: 4890 },
  { id: 11, title: "캔 고리 부러짐 🥫", desc: "음료수 캔 고리 따다가 캔 고리만 톡 부러졌을 때", icon: "🥫", votes: 3890 },
  { id: 12, title: "급할 때 차키 사라짐 🔑", desc: "아침에 급하게 나가는데 열쇠/차키 안 보여서 집안 뒤질 때", icon: "🔑", votes: 4210 },
  { id: 13, title: "치킨 무 빠져서 옴 🍗", desc: "치킨 주문했는데 소스나 치킨무 빠져서 왔을 때", icon: "🍗", votes: 3120 },
  { id: 14, title: "누웠는데 방 불 안 끔 💡", desc: "잠들기 직전 불 다 껐는데 불 키고 잘 걸 깨달았을 때", icon: "💡", votes: 4560 },
  { id: 15, title: "충전 스위치 안 켬 🔌", desc: "배터리 1% 남아서 충전기 꽂았는데 콘센트 스위치 안 켜져 있었을 때", icon: "🔌", votes: 5980 },
  { id: 16, title: "손톱 바짝 잘라 얼얼 💅", desc: "손톱 자르다가 실수로 손톱 너무 바짝 잘라서 얼얼할 때", icon: "💅", votes: 2310 }
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

  document.getElementById('candAIcon').innerText = candA.icon;
  document.getElementById('candATitle').innerText = candA.title;
  document.getElementById('candADesc').innerText = candA.desc;

  document.getElementById('candBIcon').innerText = candB.icon;
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

  const stored = getStoredVotes();
  stored[winner.id] = (stored[winner.id] || 0) + 1;
  localStorage.setItem('wc_petty_votes', JSON.stringify(stored));

  if (typeof confetti === 'function') {
    confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
  }

  renderRankings(winner);
  window.scrollTo({ top: 0, behavior: 'smooth' });
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
