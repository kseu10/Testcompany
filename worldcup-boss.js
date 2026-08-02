const bossCandidates = [
  { id: 1, title: "퇴근 5분 전 업무 폭탄 💣", desc: "퇴근 5분 전에 메일로 긴급 업무 폭탄 던지는 꼰대", icon: "💣", votes: 5420 },
  { id: 2, title: "말 뒤집는 붕어빵 🐟", desc: "지시해놓고 '내가 언제 그랬냐' 수시로 말 뒤집는 상사", icon: "🐟", votes: 4980 },
  { id: 3, title: "성과 숟가락 얌체 🥄", desc: "팀원이 밤새 만든 성과 본인이 홀랑 숟가락 얹는 얌체", icon: "🥄", votes: 4150 },
  { id: 4, title: "주말 카톡 업무 폭격 📲", desc: "주말/휴가 때 수시로 카톡으로 업무 물어보는 공사 구분 제로", icon: "📲", votes: 4890 },
  { id: 5, title: "사내 정치 무능력자 🦊", desc: "일은 안 하고 사내 정치와 아부만 떨며 팀원 쥐어짜는 상사", icon: "🦊", votes: 3870 },
  { id: 6, title: "감정 기복 폭탄 💣", desc: "기분 기복 심해서 아침 인상 따라 그날 팀 분위기 좌우되는 폭탄", icon: "💣", votes: 3540 },
  { id: 7, title: "소리 지르는 판소리꾼 📢", desc: "남들 다 듣는 데서 소리 지르고 망신 주는 소리꾼 상사", icon: "📢", votes: 3120 },
  { id: 8, title: "회식 강요 라떼왕 🍺", desc: "퇴근 후 억지 회식 강요하고 라떼 이야기 무한 리필하는 상사", icon: "🍺", votes: 4210 },
  { id: 9, title: "이중 팩폭 지적왕 🤷", desc: "질문하면 핀잔주고 지시 안 해주면 왜 안 물어봤냐는 상사", icon: "🤷", votes: 3670 },
  { id: 10, title: "사생활 오지랖왕 🕵️", desc: "개인 사생활 꼬치꼬치 묻고 연애/결혼 지적하는 오지랖왕", icon: "🕵️", votes: 2840 },
  { id: 11, title: "피드백 묵히기 장인 ⏳", desc: "마감 기한 임박할 때까지 묵혀두다 10분 전에 엎어버리는 상사", icon: "⏳", votes: 3780 },
  { id: 12, title: "전사 유포 남탓러 🗣️", desc: "자기 실수는 슥 넘어가고 팀원 작은 실수는 전사 유포하는 남탓러", icon: "🗣️", votes: 3310 },
  { id: 13, title: "종이 서류 틀꼰대 📄", desc: "엑셀 수식 안 쓰고 모든 자료 종이 서류로 갖고 오라는 틀꼰대", icon: "📄", votes: 2150 },
  { id: 14, title: "점심 메뉴 핑계왕 🍱", desc: "점심 메뉴 정하라 해놓고 모든 메뉴 다 까다롭게 거절하는 핑계왕", icon: "🍱", votes: 2690 },
  { id: 15, title: "휴가 눈치 차단러 🏖️", desc: "연차/휴가 쓸 때마다 이유 꼬치꼬치 묻고 눈치 주는 휴가 차단러", icon: "🏖️", votes: 4650 },
  { id: 16, title: "가문 자랑 훈장님 👑", desc: "자기 자식 칭찬과 가문 플렉스 자랑 하루 종일 들어줘야 하는 상사", icon: "👑", votes: 2430 }
];

let roundList = [];
let nextRoundList = [];
let currentPairIndex = 0;
let currentRoundName = "16강";

function startWorldCup() {
  document.getElementById('startSection').classList.add('hidden');
  document.getElementById('gameSection').classList.remove('hidden');
  
  roundList = [...bossCandidates].sort(() => Math.random() - 0.5);
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
    const data = localStorage.getItem('wc_boss_votes');
    return data ? JSON.parse(data) : {};
  } catch (e) { return {}; }
}

function showWinner(winner) {
  document.getElementById('gameSection').classList.add('hidden');
  document.getElementById('resultSection').classList.remove('hidden');

  document.getElementById('winnerTitle').innerText = `"${winner.title}"`;
  document.getElementById('winnerDesc').innerText = winner.desc;

  if (document.getElementById('winnerIcon')) {
    document.getElementById('winnerIcon').innerText = winner.icon || '👔';
  }

  const stored = getStoredVotes();
  stored[winner.id] = (stored[winner.id] || 0) + 1;
  localStorage.setItem('wc_boss_votes', JSON.stringify(stored));

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
  const updatedCandidates = bossCandidates.map(c => ({
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
