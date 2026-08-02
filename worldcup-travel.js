const travelCandidates = [
  { id: 1, title: "지갑 닫는 짠돌이 💸", desc: "지갑 한 번 안 열고 10원 단위로 가성비만 따지는 짠돌이", icon: "💸", scene: "💸🚫👛", img: "wc_travel_stingy.jpg", badge: "🚨 무임승차 짠돌이", votes: 5420 },
  { id: 2, title: "숙소 굼뱅이 🏨", desc: "무조건 숙소에서 뒹굴거리며 배달 음식만 먹자는 굼뱅이", icon: "🏨", scene: "🏨💤🛵", badge: "🛌 숙소 콕 집돌이", votes: 3890 },
  { id: 3, title: "분 단위 교관 ⏱️", desc: "분 단위로 일정 짜놓고 안 지키면 표정 차가워지는 교관", icon: "⏱️", scene: "⏱️📐🤬", badge: "⚔️ 일정 교관", votes: 4910 },
  { id: 4, title: "무소유 핑거 공주 👑", desc: "계획은 1도 안 짜면서 막상 오면 '여긴 별로다' 불평만 하는 핑공", icon: "👑", scene: "👑💅💬", badge: "👑 무임승차 핑공", votes: 6120 },
  { id: 5, title: "프로 투덜이 🗣️", desc: "덥다, 춥다, 다리 아프다 내내 입 툭 튀어나와 투덜거리는 사람", icon: "🗣️", scene: "🗣️🗯️😫", badge: "😫 입툭튀 투덜이", votes: 4150 },
  { id: 6, title: "인스타 지옥 파파라치 📸", desc: "인생샷 건질 때까지 1,000장 찍게 시키고 안 마음에 들면 재촬영 시키는 사람", icon: "📸", scene: "📸🔥📷", badge: "📸 1000장 지옥", votes: 5780 },
  { id: 7, title: "식성 빌런 🌶️", desc: "해외 와놓고 한식 아니면 입도 대지 않는 극단적 식성 빌런", icon: "🌶️", scene: "🌶️🍚🚫", badge: "🍚 무조건 한식파", votes: 3120 },
  { id: 8, title: "길치 고집왕 🗺️", desc: "네비 지도 절대 안 보고 자기 감대로 가다가 길 잃고 화내는 고집왕", icon: "🗺️", scene: "🗺️❌😡", badge: "🗺️ 길치 고집왕", votes: 3950 },
  { id: 9, title: "쇼핑봇 짐꾼러 🛍️", desc: "관광은 안 하고 기념품샵만 전전하며 내 가방에 짐 쑤셔 넣는 사람", icon: "🛍️", scene: "🛍️🛒🎒", badge: "🛍️ 짐 쑤셔넣기", votes: 2890 },
  { id: 10, title: "숙취 시체 🍻", desc: "첫날밤 술 너무 마셔서 다음날 오후 3시까지 누워만 있는 시체", icon: "🍻", scene: "🍻🤮🛌", badge: "🤮 숙취 시체", votes: 4320 },
  { id: 11, title: "택시 전용 징징이 🚕", desc: "걸어서 5분 거리고 무조건 택시 타자고 징징대는 징징이", icon: "🚕", scene: "🚕💸😫", badge: "🚕 5분 거리 택시파", votes: 2650 },
  { id: 12, title: "현지인 과몰입러 🗣️", desc: "영어도 못 하면서 현지인한테 콩글리시로 계속 말 걸어서 곤란하게 하는 사람", icon: "🗣️", scene: "🗣️❓😅", badge: "😅 콩글리시 폭주", votes: 2180 },
  { id: 13, title: "지갑 분실 소동꾼 👛", desc: "여권, 지갑, 핸드폰 하루에 3번씩 잃어버렸다고 난리 치는 사람", icon: "👛", scene: "👛❓😱", badge: "😱 분실 난리법석", votes: 3740 },
  { id: 14, title: "단독 행동 마이웨이 🚶", desc: "말도 없이 혼자 사라졌다가 저녁 먹을 때 슥 나타나는 마이웨이", icon: "🚶", scene: "🚶‍♂️❓🌆", badge: "🚶‍♂️ 무단 이탈자", votes: 3210 },
  { id: 15, title: "정산 미루기 마스터 💳", desc: "엔빵 정산하자고 하면 '나중에 한꺼번에 줄게' 하고 까먹는 얌체", icon: "💳", scene: "💳🙈⏳", badge: "🙈 정산 미루기", votes: 4980 },
  { id: 16, title: "체력 방전 징징이 🔋", desc: "일정 시작 30분 만에 다리 아프다며 카페 가서 앉아만 있자는 징징이", icon: "🔋", scene: "🔋🪫☕", badge: "🪫 30분 방전러", votes: 3410 }
];

let roundList = [];
let nextRoundList = [];
let currentPairIndex = 0;
let currentRoundName = "16강";

function startWorldCup() {
  document.getElementById('startSection').classList.add('hidden');
  document.getElementById('gameSection').classList.remove('hidden');
  
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

  const visualA = candA.img ? `<img src="${candA.img}" class="villain-img-illustration" alt="${candA.title}">` : `<span class="villain-emoji-scene">${candA.scene || candA.icon}</span>`;
  const visualB = candB.img ? `<img src="${candB.img}" class="villain-img-illustration" alt="${candB.title}">` : `<span class="villain-emoji-scene">${candB.scene || candB.icon}</span>`;

  document.getElementById('candAIcon').innerHTML = `
    <div class="villain-scene-frame" style="background: linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%); border-color: #fed7aa;">
      ${visualA}
      <span class="villain-action-badge" style="background: #c2410c;">${candA.badge || '🚨 여행 빌런'}</span>
    </div>
  `;
  document.getElementById('candATitle').innerText = candA.title;
  document.getElementById('candADesc').innerText = candA.desc;

  document.getElementById('candBIcon').innerHTML = `
    <div class="villain-scene-frame" style="background: linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%); border-color: #fed7aa;">
      ${visualB}
      <span class="villain-action-badge" style="background: #c2410c;">${candB.badge || '🚨 여행 빌런'}</span>
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
    document.getElementById('winnerIcon').innerHTML = `<span style="font-size: 5rem;">${winner.scene || winner.icon || '✈️'}</span>`;
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
