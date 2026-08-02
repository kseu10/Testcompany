function calculateWorkResult() {
  const name = document.getElementById('workName').value || '직장인';
  const q1 = document.querySelector('input[name="wq1"]:checked').value;
  const q2 = document.querySelector('input[name="wq2"]:checked').value;
  const q3 = document.querySelector('input[name="wq3"]:checked').value;

  const key = `${q1}_${q2}_${q3}`;

  const workTypes = {
    'BYE_LEAD_LAUGH': { badge: "S+ TIER", class: "tier-s-plus", title: `"${name}님은 인싸 갓생 사원"`, desc: "일 처리 빠른 빛의 칼퇴러! 사회생활 리액션과 칼퇴 밸런스 갓벽.", weapon: "아이스 아메리카노 + 노캔 헤드폰", weakness: "퇴근 5분 전 급작스러운 회의" },
    'BYE_FOLLOW_POKER': { badge: "S TIER", class: "tier-s", title: `"${name}님은 미소 띤 은둔 고수"`, desc: "조용히 내 할 일만 완벽히 끝내고 사라지는 그림자 칼퇴 스나이퍼.", weapon: "소리 없이 마우스 클릭하는 무소음 키보드", weakness: "갑작스러운 번개 회식 초청" },
    'WORK_LEAD_LAUGH': { badge: "SS TIER", class: "tier-ss", title: `"${name}님은 오피스 실세 하드캐리어"`, desc: "팀을 끌고 나가는 리더십! 야근도 업무도 완벽하게 처리하는 능동파.", weapon: "듀얼 모니터 + 고카페인 몬스터 음료", weakness: "일 안 하고 무임승차하는 팀원" }
  };

  const res = workTypes[key] || {
    badge: "A TIER", class: "tier-a", title: `"${name}님은 월급 루팡 갓생 플레이어"`, desc: "회사에서는 적당히, 퇴근 후에는 내 삶을 확실히 챙기는 능력자!", weapon: "모니터 보안 필름 + 알뜰폰 요금제", weakness: "월요일 아침 출근길 버스"
  };

  document.getElementById('workBadge').innerText = res.badge;
  document.getElementById('workBanner').className = `tier-banner ${res.class}`;
  document.getElementById('workTitle').innerText = res.title;
  document.getElementById('workDesc').innerText = res.desc;
  document.getElementById('workWeapon').innerText = res.weapon;
  document.getElementById('workWeakness').innerText = res.weakness;

  document.getElementById('statLeaveHome').innerText = q1 === 'BYE' ? 'SSS Grade' : 'B Grade';
  document.getElementById('statVillainIndex').innerText = q3 === 'POKER' ? '25%' : '12%';
  document.getElementById('statResignIndex').innerText = q1 === 'BYE' ? '78%' : '45%';
  document.getElementById('statSalaryWin').innerText = q2 === 'LEAD' ? 'S Grade' : 'A Grade';

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
    a.download = `2026_직장생활유형_결과카드.png`;
    a.click();
  });
}
