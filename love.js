function calculateLoveResult() {
  const name = document.getElementById('nickname').value || '익명';
  const q1 = document.querySelector('input[name="q1"]:checked').value;
  const q2 = document.querySelector('input[name="q2"]:checked').value;
  const q3 = document.querySelector('input[name="q3"]:checked').value;
  const q4 = document.querySelector('input[name="q4"]:checked').value;

  const key = `${q1}_${q2}_${q3}_${q4}`;

  const loveTypes = {
    'E_F_J_HIGH': { badge: "S+ TIER", class: "tier-sss", title: `"${name}님은 열정 만렙 연애 가이드"`, desc: "상대방 기분 캐치 1초 컷! 서프라이즈와 데이트 코스의 신.", best: "차분하게 들어주는 힐링 오아시스", worst: "연락 두절되는 마이웨이 독고다이" },
    'E_T_J_HIGH': { badge: "SS TIER", class: "tier-ss", title: `"${name}님은 갓생 연애 CEO"`, desc: "서로 발전하는 가치관 필수! 효율적이고 화끈한 리더십 연애.", best: "성실하고 스마트한 계획파", worst: "징징거리는 감성 과다형" },
    'I_F_P_LOW': { badge: "A+ TIER", class: "tier-a-plus", title: `"${name}님은 몽글몽글 감성 힐러"`, desc: "조용히 깊은 사랑을 주는 해바라기! 낭만 가득 수줍은 사랑꾼.", best: "적극적으로 이끌어주는 열정 리더", worst: "지나치게 직설적인 팩폭러" },
    'I_T_J_LOW': { badge: "S TIER", class: "tier-s", title: `"${name}님은 집착 0% AI 연애봇"`, desc: "쿨함의 끝판왕! 연애와 개인 시간을 완벽히 분리하는 이성파.", best: "깔끔하고 독립적인 갓생러", worst: "24시간 집착하는 감정 폭발러" }
  };

  const res = loveTypes[key] || {
    badge: "A TIER", class: "tier-a", title: `"${name}님은 밀당의 고수 로맨티스트"`, desc: "상대방의 마음을 들었다 놓았다 하는 매력 폭발 타입!", best: "따뜻하고 다정한 댕댕이형", worst: "답장 3시간 걸리는 읽씹러"
  };

  document.getElementById('loveBadge').innerText = res.badge;
  document.getElementById('loveBanner').className = `tier-banner ${res.class}`;
  document.getElementById('loveTitle').innerText = res.title;
  document.getElementById('loveDesc').innerText = res.desc;
  document.getElementById('bestMatch').innerText = res.best;
  document.getElementById('worstMatch').innerText = res.worst;

  document.getElementById('statLoveExpress').innerText = q2 === 'F' ? 'SSS Grade' : 'B Grade';
  document.getElementById('statJealousy').innerText = q4 === 'HIGH' ? 'A Grade' : 'S Grade';
  document.getElementById('statSomeWin').innerText = q1 === 'E' ? 'S+ Grade' : 'A Grade';
  document.getElementById('statDateCost').innerText = q3 === 'J' ? 'S Grade' : 'A Grade';

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
    a.download = `2026_연애성향_결과카드.png`;
    a.click();
  });
}
