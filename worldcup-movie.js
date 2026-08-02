const movieCandidates = [
  { id: 1, title: "스포일러 입털기 🗣️", desc: "영화 내내 '어 저 사람 죽나?' 스포일러 입털기 마스터", icon: "🗣️", scene: "🗣️💥🎬", badge: "🚨 스포일러 입털기", votes: 6120 },
  { id: 2, title: "팝콘 오도독 쩝쩝이 🍿", desc: "팝콘 오도독 소리 내며 콜라 얼음 달그락거리는 쩝쩝이", icon: "🍿", scene: "🍿💥🥤", badge: "🔊 쩝쩝 소음 테러", votes: 4580 },
  { id: 3, title: "스마트폰 10분 레이저 📱", desc: "10분마다 휴대폰 켜서 밝은 화면으로 카톡 확인하는 민폐", icon: "📱", scene: "📱✨👀", badge: "💡 눈뽕 비매너", votes: 5210 },
  { id: 4, title: "영화 중 계속 귓속말 🙋", desc: "영화 중간에 이해 안 된다고 계속 옆에서 '저 사람 누구야?' 질문", icon: "🙋", scene: "🙋❓🔊", badge: "❓ 귓속말 질의응답", votes: 3890 },
  { id: 5, title: "오열 과몰입러 😭", desc: "슬픈 장면도 아닌데 옆에서 꺼이꺼이 통곡하며 오열하는 과몰입러", icon: "😭", scene: "😭💦🎭", badge: "😭 과몰입 오열", votes: 2340 },
  { id: 6, title: "평론가 행세 분위기 초치기 🎬", desc: "영화 끝난 후 '솔직히 기대 이하네' 평론가 행세하며 분위기 초 치는 타입", icon: "🎬", scene: "🎬👎💬", badge: "👎 분위기 초치기", votes: 3120 },
  { id: 7, title: "15분 드렁드렁 코골이 💤", desc: "영화 시작하자마자 15분 만에 드렁드렁 코 골며 자는 사람", icon: "💤", scene: "💤😴🔊", badge: "💤 극장 코골이", votes: 3450 },
  { id: 8, title: "화장실 지연러 🚪", desc: "러닝타임 내내 시도 때도 없이 화장실 왔다 갔다 자리를 가리는 사람", icon: "🚪", scene: "🚪🏃‍♂️💥", badge: "🏃‍♂️ 수시로 자릿길 막기", votes: 2980 },
  { id: 9, title: "의자 툭툭이 🦶", desc: "앞자리 의자 발로 수시로 차는 툭툭이", icon: "🦶", scene: "🦶💥💺", badge: "🦶 등받이 킥 테러", votes: 4890 },
  { id: 10, title: "20분 지각 헐떡이 🏃", desc: "자기가 예매해놓고 늦어서 영화 시작 20분 후에 헐떡이며 들어오는 사람", icon: "🏃", scene: "🏃‍♂️💦🔦", badge: "⏰ 지각 헐떡 민폐", votes: 2650 },
  { id: 11, title: "사설 추임새 중얼이 💬", desc: "영화 도중에 귓속말로 계속 자기 생각 사설 붙이는 중얼이", icon: "💬", scene: "💬🗣️👂", badge: "💬 나홀로 음성 해설", votes: 2780 },
  { id: 12, title: "쩍벌 자리 침범러 🧘", desc: "옆사람 좌석 영역까지 몸 기울이고 다리 쩍벌하는 쩍벌남녀", icon: "🧘", scene: "🧘‍♂️💥💺", badge: "💥 무단 영역 침범", votes: 3670 },
  { id: 13, title: "공포 비명 데시벨 😱", desc: "공포 영화 볼 때 비명 질러서 영화보다 더 놀라게 하는 관객", icon: "😱", scene: "😱📢🔊", badge: "📢 초고주파 비명", votes: 2450 },
  { id: 14, title: "엔딩 바로 벌떡이 🚶", desc: "영화 끝나자마자 엔딩 크레딧 올라가기도 전에 불쑥 일어나 가로막는 사람", icon: "🚶", scene: "🚶‍♂️💥📺", badge: "🚶 시야 불쑥 차단", votes: 1980 },
  { id: 15, title: "타코야끼 냄새 빌런 🐙", desc: "영화관에 냄새 강한 타코야끼/오징어 사들고 와서 냄새 풍기는 타입", icon: "🐙", scene: "🐙💨🍿", badge: "🚨 극장 냄새 테러", votes: 3150 },
  { id: 16, title: "지루함 불평 러버 🥱", desc: "자기가 보자고 해놓고 정작 본인은 재미없다고 지루해하는 타입", icon: "🥱", scene: "🥱📱💤", badge: "🥱 자기가 보자해놓고 불평", votes: 3560 }
];

let roundList = [];
let nextRoundList = [];
let currentPairIndex = 0;
let currentRoundName = "16강";

function startWorldCup() {
  document.getElementById('startSection').classList.add('hidden');
  document.getElementById('gameSection').classList.remove('hidden');
  
  roundList = [...movieCandidates].sort(() => Math.random() - 0.5);
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
    <div class="villain-scene-frame" style="background: linear-gradient(135deg, #e0f2fe 0%, #bae6fd 100%); border-color: #7dd3fc;">
      <span class="villain-emoji-scene">${candA.scene || candA.icon}</span>
      <span class="villain-action-badge" style="background: #0284c7;">${candA.badge || '🚨 극장 민폐'}</span>
    </div>
  `;
  document.getElementById('candATitle').innerText = candA.title;
  document.getElementById('candADesc').innerText = candA.desc;

  document.getElementById('candBIcon').innerHTML = `
    <div class="villain-scene-frame" style="background: linear-gradient(135deg, #e0f2fe 0%, #bae6fd 100%); border-color: #7dd3fc;">
      <span class="villain-emoji-scene">${candB.scene || candB.icon}</span>
      <span class="villain-action-badge" style="background: #0284c7;">${candB.badge || '🚨 극장 민폐'}</span>
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
    const data = localStorage.getItem('wc_movie_votes');
    return data ? JSON.parse(data) : {};
  } catch (e) { return {}; }
}

function showWinner(winner) {
  document.getElementById('gameSection').classList.add('hidden');
  document.getElementById('resultSection').classList.remove('hidden');

  document.getElementById('winnerTitle').innerText = `"${winner.title}"`;
  document.getElementById('winnerDesc').innerText = winner.desc;

  if (document.getElementById('winnerIcon')) {
    document.getElementById('winnerIcon').innerHTML = `<span style="font-size: 5rem;">${winner.scene || winner.icon || '🎬'}</span>`;
  }

  const stored = getStoredVotes();
  stored[winner.id] = (stored[winner.id] || 0) + 1;
  localStorage.setItem('wc_movie_votes', JSON.stringify(stored));

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
    a.download = `2026_영화관민폐_월드컵_우승카드.png`;
    a.click();
  });
}

function renderRankings(winner) {
  const stored = getStoredVotes();
  const updatedCandidates = movieCandidates.map(c => ({
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
    alert('영화관 민폐 월드컵 링크가 복사되었습니다!');
  });
}

function shareKakao() {
  alert('카카오톡 공유 링크가 복사되었습니다!');
  copyWorldCupLink();
}
