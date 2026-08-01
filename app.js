function setValue(inputId, value) { document.getElementById(inputId).value = value; }
function addValue(inputId, addAmount) {
  const el = document.getElementById(inputId);
  el.value = (parseInt(el.value) || 0) + addAmount;
}

function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.classList.remove('hidden');
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.classList.add('hidden');
}

function closeModalOnOverlay(event, modalId) {
  if (event.target.classList.contains('modal-overlay')) {
    closeModal(modalId);
  }
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

function getAgeRankText(ageGroup, annualIncome) {
  const benchmarks = {
    '20s': { name: '20대', median: 2940, top25: 4100, top10: 5200 },
    '30s': { name: '30대', median: 4200, top25: 6300, top10: 8200 },
    '40s': { name: '40대', median: 4980, top25: 7800, top10: 10500 },
    '50s': { name: '50대 이상', median: 4500, top25: 7200, top10: 11000 }
  };

  const b = benchmarks[ageGroup] || benchmarks['30s'];
  let percentile = '중위권';
  
  if (annualIncome >= b.top10) {
    percentile = '상위 10% 이내 (최상위 소득군)';
  } else if (annualIncome >= b.top25) {
    percentile = '상위 25% 이내 (안정적 상위권)';
  } else if (annualIncome >= b.median) {
    percentile = '상위 50% 이내 (평균 이상 계급)';
  } else {
    percentile = '하위 50% 지대 (자산 형성집중 필요)';
  }

  const ratio = (annualIncome / b.median).toFixed(1);
  return `${b.name} 내 소득 위치: <strong>${percentile}</strong> (${b.name} 중위소득 대비 ${ratio}배)`;
}

function calculateResult() {
  const ageGroup = document.getElementById('ageGroup').value;
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

  const ageRankText = getAgeRankText(ageGroup, annualIncome);

  const coffeeCount = Math.max(0, Math.floor((monthlyAvailable * 10000 * 0.4) / 4500));
  const deliveryCount = Math.max(0, Math.floor((monthlyAvailable * 10000 * 0.4) / 28000));

  renderResults({ annualIncome, savings, fixedExpenses, monthlyNet, monthlyAvailable, carPoorIndex, carInfo, houseInfo, tierInfo, ageRankText, coffeeCount, deliveryCount, lifestyle });

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

function renderFinancialRecipes(lifestyle, savings, monthlyAvailable) {
  const container = document.getElementById('financialRecipeContainer');
  if (!container) return;

  const recipes = [
    {
      tag: "🏠 내집마련 필수",
      tagClass: "tag-blue",
      name: "청년 우대형 주택청약종합저축",
      desc: "최고 연 4.5% 금리 + 비과세 혜택 + 청년 주택드림 대출(최저 2.2% 금리) 연계 필수 상품!",
      link: "https://nhuf.molit.go.kr/"
    },
    {
      tag: "💰 갓생 비상금 파킹통장",
      tagClass: "tag-gold",
      name: "2026 고금리 파킹통장 (연 3.5%~7%)",
      desc: "하루만 맡겨도 이자가 쌓이는 비상금 통장. 월 여유자금의 30%를 파킹통장에 보관하세요.",
      link: "https://finlife.fss.or.kr/"
    },
    {
      tag: "🚀 정부 지원 혜택",
      tagClass: "tag-purple",
      name: "청년도약계좌 & ISA (개인자산관리계좌)",
      desc: "5년 만기 시 최대 5,000만 원 목돈 마련. 정부 기여금 + 비과세 혜택 100% 챙기기!",
      link: "https://www.kinfa.or.kr/"
    }
  ];

  if (savings < 3000) {
    recipes.push({
      tag: "🌱 시드머니 불리기",
      tagClass: "tag-blue",
      name: "월 50만 원 챌린지 고금리 적금",
      desc: "시드머니 3,000만 원 달성 전까지는 원금 보장형 적금과 파킹통장에 80% 이상 집중 배치!",
      link: "https://finlife.fss.or.kr/"
    });
  } else {
    recipes.push({
      tag: "📈 절세 & 투파트너",
      tagClass: "tag-purple",
      name: "연금저축펀드 + S&P500 ETF 분할매수",
      desc: "연 66만 원 세액공제 환급금 챙기기 + 미국 우량지수 ETF에 매월 자동 적립식 투자!",
      link: "https://finlife.fss.or.kr/"
    });
  }

  container.innerHTML = recipes.map(r => `
    <div class="recipe-card">
      <div class="recipe-top">
        <span class="recipe-tag ${r.tagClass}">${r.tag}</span>
        <a href="${r.link}" target="_blank" rel="noopener noreferrer" class="recipe-btn">상품 정보 보기 <i class="fa-solid fa-arrow-up-right-from-square"></i></a>
      </div>
      <h4 class="recipe-name">${r.name}</h4>
      <p class="recipe-desc">${r.desc}</p>
    </div>
  `).join('');
}

function renderResults(data) {
  const banner = document.getElementById('tierBanner');
  banner.className = `tier-banner ${data.tierInfo.class}`;
  document.getElementById('tierBadge').innerText = data.tierInfo.badge;
  document.getElementById('tierTitle').innerText = data.tierInfo.title;
  document.getElementById('tierDesc').innerText = data.tierInfo.desc;

  document.getElementById('ageRankText').innerHTML = data.ageRankText;

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

  renderFinancialRecipes(data.lifestyle, data.savings, data.monthlyAvailable);

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
