const travelCandidates = [
  { id: 1, title: "숙소 굼뱅이 🛌", desc: "무조건 숙소에서 뒹굴거리며 배달 음식만 먹자는 굼뱅이", icon: "🛌", votes: 3420 },
  { id: 2, title: "분 단위 교관 ⏱️", desc: "분 단위로 일정 짜놓고 안 지키면 표정 차가워지는 군대 교관", icon: "⏱️", votes: 2980 },
  { id: 3, title: "짠돌이 깍쟁이 💸", desc: "지갑 한 번 안 열고 10원 단위로 가성비만 따지는 짠돌이", icon: "💸", votes: 4150 },
  { id: 4, title: "숏폼 중독자 📱", desc: "여행 가서 하루 종일 핸드폰 숏폼만 보고 멍때리는 타입", icon: "📱", votes: 2100 },
  { id: 5, title: "사진 10분 아이돌 📸", desc: "음식 나올 때마다 10분 동안 사진 촬영하느라 못 먹게 하는 타입", icon: "📸", votes: 2540 },
  { id: 6, title: "뒤끝 징징이 😭", desc: "남들이 가자고 한 곳 가놓고 뒤에서 투덜투덜 징징거리는 징징이", icon: "😭", votes: 3890 },
  { id: 7, title: "물건 잃어버리는 길치 🧭", desc: "가방과 소지품 수시로 잃어버려서 수습하느라 지치게 하는 길치", icon: "🧭", votes: 1950 },
  { id: 8, title: "인생샷 500장 집착러 👗", desc: "사진 안 예쁘게 나왔다고 500장 다시 찍어달라는 집착러", icon: "👗", votes: 3120 },
  { id: 9, title: "정산 깍쟁이 🧾", desc: "1/N 청구할 때마다 '나 저거 안 먹었는데' 빼달라는 깍쟁이", icon: "🧾", votes: 3670 },
  { id: 10, title: "한국 라면만 찾는 아재 🍜", desc: "현지 음식 향신료 심하다고 한국 라면만 찾는 아재 입맛", icon: "🍜", votes: 1840 },
  { id: 11, title: "새벽 6시 알람 부지런이 ⏰", desc: "아침 6시부터 일어나서 알람 울리며 잔소리로 다 깨우는 부지런이", icon: "⏰", votes: 2780 },
  { id: 12, title: "쇼핑몰 유령 🛍️", desc: "쇼핑몰만 가면 3시간 동안 사라져서 안 나오는 쇼핑 마왕", icon: "🛍️", votes: 2310 },
  { id: 13, title: "술주정 꼬장 🍺", desc: "술 마시고 숙소에서 꼬장 부리며 울거나 시비 거는 술주정뱅이", icon: "🍺", votes: 4520 },
  { id: 14, title: "헌팅 이탈 럭비공 🕺", desc: "여행지에서 헌팅/이성한테 눈 팔려 단체 행동 이탈하는 럭비공", icon: "🕺", votes: 2890 },
  { id: 15, title: "남의 물건 뺏는 민폐 🧴", desc: "자기 세면도구 안 챙기고 남의 선크림/치약 다 뺏어 쓰는 민폐", icon: "🧴", votes: 2650 },
  { id: 16, title: "입 가리고 삐친이 😤", desc: "자기 생각 조금만 안 받아주면 삐쳐서 입 닫고 쌩 까는 타입", icon: "😤", votes: 3740 }
];

let roundList = [];
let nextRoundList = [];
let currentPairIndex = 0;
let currentRoundName = "16강";

function startWorldCup() {
  document.getElementById('startSection').classList.add('hidden');
  document.getElementById('gameSection').classList.remove('hidden');
  
  // 셔플
  roundList = [...travelCandidates].sort(() => Math.random() - 0.5);
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
    // 라운드 종료
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
    const data = localStorage.getItem('wc_travel_votes');
    return data ? JSON.parse(data) : {};
  } catch (e) { return {}; }
}

function showWinner(winner) {
  document.getElementById('gameSection').classList.add('hidden');
  document.getElementById('resultSection').classList.remove('hidden');

  document.getElementById('winnerTitle').innerText = `"${winner.title}"`;
  document.getElementById('winnerDesc').innerText = winner.desc;

  if (document.getElementById('winnerIcon')) {
    document.getElementById('winnerIcon').innerText = winner.icon || '✈️';
  }

  // 우승 후보 표수 저장
  const stored = getStoredVotes();
  stored[winner.id] = (stored[winner.id] || 0) + 1;
  localStorage.setItem('wc_travel_votes', JSON.stringify(stored));

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
    a.download = `2026_여행빌런_월드컵_우승카드.png`;
    a.click();
  });
}

function renderRankings(winner) {
  const stored = getStoredVotes();
  const updatedCandidates = travelCandidates.map(c => ({
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
    alert('여행 빌런 월드컵 링크가 복사되었습니다!');
  });
}

function shareKakao() {
  alert('카카오톡 공유 링크가 복사되었습니다!');
  copyWorldCupLink();
}
