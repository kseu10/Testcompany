const bossCandidates = [
  { id: 1, title: "퇴근 5분 전 업무 폭탄 ⏰", desc: "퇴근 5분 전에 메일로 긴급 업무 폭탄 던지는 꼰대", icon: "⏰", scene: "⏰💣📧", img: "wc_boss_bomb.jpg", badge: "💣 칼퇴 파괴 폭탄", votes: 6420 },
  { id: 2, title: "성과 얌체 훔치기 🦊", desc: "팀원이 만든 부자료 본인이 만든 척 상사한테 직보고하는 얌체", icon: "🦊", scene: "🦊🕵️‍♂️📄", badge: "🦊 성과 무단 횡령", votes: 5890 },
  { id: 3, title: "휴일 카톡 시도 때도 없이 📱", desc: "주말 일요일 밤 10시에 카톡으로 업무 물어보는 상사", icon: "📱", scene: "📱💥🌙", badge: "📱 주말 카톡 테러", votes: 6150 },
  { id: 4, title: "감정 기복 폭풍우 🌊", desc: "기분 좋은 날엔 천사, 기분 나쁜 날엔 꼬투리 잡는 폭풍우", icon: "🌊", scene: "🌊🤬⛈️", badge: "⛈️ 감정 분노 조절 장애", votes: 4780 },
  { id: 5, title: "답정너 무한 수정 ✏️", desc: "기획서 10번 고치게 만들고 결국 맨 처음 제출안 선택하는 답정너", icon: "✏️", scene: "✏️🔄📑", badge: "🔄 무한 노가다 수정", votes: 5320 },
  { id: 6, title: "라떼는 말이야 ☕", desc: "자기 젊을 땐 야근 주 7일 했다며 요즘 애들 태도 따지는 꼰대", icon: "☕", scene: "☕🗣️🕸️", badge: "☕ 라떼 꼰대 훈수", votes: 4950 },
  { id: 7, title: "책임 회피 마스터 🏃", desc: "문제 생기면 '부하 직원이 보고 안 했다'며 뒤집어씌우는 상사", icon: "🏃", scene: "🏃‍♂️💨🎯", badge: "🎯 부하 핑계 뒤집어씌우기", votes: 5110 },
  { id: 8, title: "개인 심부름 요청 ☕", desc: "자기 커피 사 오라거나 개인 경조사 예약 시키는 상사", icon: "☕", scene: "☕🏃‍♀️💳", badge: "🏃‍♀️ 사적 심부름 핑계", votes: 3450 },
  { id: 9, title: "사생활 미어캣 🦝", desc: "주말에 뭐 했냐, 연애는 언제 하냐 사생활 집요하게 묻는 미어캣", icon: "🦝", scene: "🦝❓💬", badge: "🦝 사생활 집요 캐묻기", votes: 3120 },
  { id: 10, title: "점심 메뉴 강요 🍲", desc: "무조건 자기가 좋아하는 국밥/부대찌개만 먹자는 국밥 마왕", icon: "🍲", scene: "🍲🥄🤬", badge: "🍲 메뉴 독재자", votes: 2890 },
  { id: 11, title: "회식 강요 인싸병 🍻", desc: "오늘 단합대회라며 부서 회식 안 오면 팀워크 없다며 협박하는 타입", icon: "🍻", scene: "🍻🍶🤮", badge: "🍻 불금 회식 강요", votes: 4670 },
  { id: 12, title: "마이크로 매니징 감시 🔍", desc: "10분마다 책상 와서 메신저 화면 화면 훔쳐보는 사르만", icon: "🔍", scene: "🔍👀🖥️", badge: "🖥️ 모니터 등뒤 감시", votes: 4210 },
  { id: 13, title: "반말 지거리 무례러 🗣️", desc: "처음 본 부하 직원한테 대놓고 반말하고 팩폭이랍시고 외모 지적하는 사람", icon: "🗣️", scene: "🗣️💥🤐", badge: "🤐 무례한 반말 폭격", votes: 3980 },
  { id: 14, title: "업무 시도 때도 없이 체인지 🌪️", desc: "오전에 방향 A라 해놓고 오후에 '내가 언제?' 하며 B로 바꾸는 붕어", icon: "🌪️", scene: "🌪️🧠❓", badge: "❓ 아침저녁 딴소리", votes: 4340 },
  { id: 15, title: "자랑질 자랑 몬스터 👑", desc: "업무 미팅 때 자기 자랑, 자기 집안 자랑만 30분 동안 하는 몬스터", icon: "👑", scene: "👑💬😴", badge: "😴 30분 자기자랑", votes: 2540 },
  { id: 16, title: "메일 CC 테러범 📧", desc: "사소한 실수 하나에 전 부서장, 이사님 CC 넣어서 공개 처형하는 빌런", icon: "📧", scene: "📧📢💥", badge: "📢 전사 공개 처형 CC", votes: 5670 }
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
    if (winner.img) {
      document.getElementById('winnerIcon').innerHTML = `<img src="${winner.img}" class="villain-img-illustration" style="width: 140px; height: 140px; object-fit: contain; filter: drop-shadow(0 8px 18px rgba(0,0,0,0.15)); border-radius: 16px;" alt="${winner.title}">`;
    } else {
      document.getElementById('winnerIcon').innerHTML = `<div style="font-size: 4rem; filter: drop-shadow(0 6px 12px rgba(0,0,0,0.15));">${winner.icon || '👔'}</div>`;
    }
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
