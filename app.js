function setValue(inputId, value) { document.getElementById(inputId).value = value; }
function addValue(inputId, addAmount) {
  const el = document.getElementById(inputId);
  el.value = (parseInt(el.value) || 0) + addAmount;
}

function calculateMonthlyNetPay(annualIncomeTenThousand) {
  const annualIncome = annualIncomeTenThousand * 10000;
  const monthlyGross = annualIncome / 12;
  let deductionRate = 0.12;
  if (annualIncome > 100000000) deductionRate = 0.22;
  else if (annualIncome > 80000000) deductionRate = 0.195;
  else if (annualIncome > 60000000) deductionRate = 0.165;
  else if (annualIncome > 45000000) deductionRate = 0.145;
  else if (annualIncome > 30000000) deductionRate = 0.13;
  return Math.round((monthlyGross * (1 - deductionRate)) / 10000);
}

function calculateResult() {
  const annualIncome = parseInt(document.getElementById('annualIncome').value);
  const savings = parseInt(document.getElementById('savings').value);
  const fixedExpenses = parseInt(document.getElementById('fixedExpenses').value);
  const lifestyle = document.querySelector('input[name="lifestyle"]:checked').value;

  if (isNaN(annualIncome) || isNaN(savings) || isNaN(fixedExpenses)) {
    alert('모든 입력값을 정확히 입력해주세요!');
    return;
  }

  const monthlyNet = calculateMonthlyNetPay(annualIncome);
  const monthlyAvailable = monthlyNet - fixedExpenses;

  let carBudgetRate = 0.25;
  if (lifestyle === 'frugal') carBudgetRate = 0.15;
  if (lifestyle === 'yolo') carBudgetRate = 0.40;
  const monthlyCarBudget = Math.max(0, monthlyAvailable * carBudgetRate);

  const carInfo = getCarRecommendation(monthlyCarBudget, monthlyAvailable);
  const houseInfo = getHousingRecommendation(savings, monthlyAvailable);
  const carPoorIndex = Math.min(100, Math.max(5, Math.round((fixedExpenses + monthlyCarBudget * 1.5) / monthlyNet * 100)));
  const tierInfo = getTierInfo(savings, monthlyAvailable, carPoorIndex);

  const coffeeCount = Math.max(0, Math.floor((monthlyAvailable * 10000 * 0.4) / 4500));
  const deliveryCount = Math.max(0, Math.floor((monthlyAvailable * 10000 * 0.4) / 28000));

  renderResults({ annualIncome, savings, fixedExpenses, monthlyNet, monthlyAvailable, carPoorIndex, carInfo, houseInfo, tierInfo, coffeeCount, deliveryCount });

  document.getElementById('formSection').classList.add('hidden');
  document.getElementById('resultSection').classList.remove('hidden');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function getCarRecommendation(monthlyCarBudget, monthlyAvailable) {
  if (monthlyAvailable < 30 || monthlyCarBudget < 15) return { title: "따릉이 & 지하철/버스 패스", note: "차량 구매 시 카푸어 직행! 대중교통이 최고의 재테크" };
  else if (monthlyCarBudget < 35) return { title: "현대 캐스퍼 / 기아 레이 (경차)", note: "월 할부/유지비 약 25~35만 원선" };
  else if (monthlyCarBudget < 55) return { title: "현대 아반떼 CN7 / 기아 셀토스", note: "월 유지비 약 40~50만 원선 (가성비 갓생 조합)" };
  else if (monthlyCarBudget < 85) return { title: "기아 K5 / 스포티지 / KG 토레스", note: "월 유지비 약 65~80만 원선" };
  else if (monthlyCarBudget < 130) return { title: "현대 그랜저 GN7 / 제네시스 GV70", note: "월 유지비 약 100~120만 원선" };
  else if (monthlyCarBudget < 200) return { title: "제네시스 G80 / 벤츠 E-Class / BMW 5시리즈", note: "월 유지비 약 150~180만 원선" };
  else return { title: "포르쉐 타이칸 / 911 / 파나메라", note: "월 유지비 250만 원 이상 감당 가능!" };
}

function getHousingRecommendation(savings, monthlyAvailable) {
  const maxMortgageLoan = Math.max(0, monthlyAvailable * 150);
  const maxHomePrice = Math.round((savings + maxMortgageLoan) / 10000 * 10) / 10;
  if (maxHomePrice < 1.5) return { title: "청년 안심주택 / 보증금 전세 (원룸)", note: `순자산 ${savings}만 원 기준 대출 활용 권장` };
  else if (maxHomePrice < 3.5) return { title: "수도권 투룸 오피스텔 / 빌라 (매매 2~3억 대)", note: `최대 전세/매매 한도 약 ${maxHomePrice}억 원 수준` };
  else if (maxHomePrice < 7.0) return { title: "수도권 24~32평형 아파트 (매매 5~6억 대)", note: `약 ${maxHomePrice}억 원 아파트 진입 가능` };
  else if (maxHomePrice < 12.0) return { title: "서울 준상급지/수도권 대장 아파트 (8~11억)", note: `약 ${maxHomePrice}억 원 대 내 집 마련 한도` };
  else return { title: "서울 마용성/강남권 상급지 아파트 (15억 이상)", note: "자산 가치 상위 1%대 주거 영역" };
}

function getTierInfo(savings, monthlyAvailable, carPoorIndex) {
  if (savings >= 20000 && monthlyAvailable >= 250) return { badge: "S TIER", class: "tier-s", title: "💎 재벌집 막내아들급 자산 수호자", desc: "압도적인 자산과 강력한 현금 흐름!" };
  else if (savings >= 8000 || monthlyAvailable >= 150) return { badge: "A TIER", class: "tier-a", title: "🥇 탄탄한 갓생 수호자", desc: "통장이 튼튼하며 카푸어 위험 지대에서 멀리 있습니다." };
  else if (monthlyAvailable >= 80) return { badge: "B TIER", class: "tier-b", title: "🥈 평화로운 밸런스 유지자", desc: "안정적 현금 흐름을 유지하고 있습니다." };
  else if (monthlyAvailable >= 30) return { badge: "C TIER", class: "tier-c", title: "⚠️ 카푸어 경계선 주의보!", desc: "고정 지출 다이어트가 필요합니다." };
  else return { badge: "F TIER", class: "tier-f", title: "🚨 통장 비상사태!", desc: "숨만 쉬어도 마이너스 위험! 짠테크 모드 전환 필요." };
}

function renderResults(data) {
  const banner = document.getElementById('tierBanner');
  banner.className = `tier-banner ${data.tierInfo.class}`;
  document.getElementById('tierBadge').innerText = data.tierInfo.badge;
  document.getElementById('tierTitle').innerText = data.tierInfo.title;
  document.getElementById('tierDesc').innerText = data.tierInfo.desc;

  document.getElementById('monthlyNetPay').innerText = `${data.monthlyNet.toLocaleString()}만 원`;
  document.getElementById('monthlyAvailable').innerText = `${data.monthlyAvailable.toLocaleString()}만 원`;
  document.getElementById('carPoorIndex').innerText = `${data.carPoorIndex}%`;

  document.getElementById('recommendedCar').innerText = data.carInfo.title;
  document.getElementById('carNote').innerText = data.carInfo.note;
  document.getElementById('recommendedHouse').innerText = data.houseInfo.title;
  document.getElementById('houseNote').innerText = data.houseInfo.note;
  document.getElementById('lifestyleFunStat').innerText = `스벅 아메리카노 ${data.coffeeCount}잔 / 배달 ${data.deliveryCount}회`;

  document.getElementById('repAnnualIncome').innerText = `${data.annualIncome.toLocaleString()} 만 원`;
  document.getElementById('repAnnualNet').innerText = `${(data.monthlyNet * 12).toLocaleString()} 만 원`;
  document.getElementById('repSavings').innerText = `${data.savings.toLocaleString()} 만 원`;
  document.getElementById('repEmergencyFund').innerText = `${Math.round(data.fixedExpenses * 6).toLocaleString()} 만 원`;

  let adviceHTML = `<strong>💡 2026 맞춤 재정 팁:</strong><br>`;
  if (data.carPoorIndex > 50) {
    adviceHTML += `현재 고정 지출 비율이 높아 무리한 차량 구매 시 카푸어 위험도(${data.carPoorIndex}%)가 높습니다. 지출을 줄이세요.`;
  } else {
    adviceHTML += `현재 월 여유자금(${data.monthlyAvailable}만 원) 흐름이 안정적입니다. 연금저축/투자 연계 시 갓생 진입이 빠릅니다.`;
  }
  document.getElementById('financialAdvice').innerHTML = adviceHTML;
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
    a.download = `2026_현실연봉진단_결과카드.png`;
    a.click();
  });
}

function copyLink() { navigator.clipboard.writeText(window.location.href).then(() => alert('링크가 복사되었습니다!')); }
function shareKakao() { alert('카카오톡 공유 버튼 지점입니다.'); }
