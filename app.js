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

function getExactAgeStats(ageVal) {
  const age = Math.max(18, Math.min(75, parseInt(ageVal) || 30));
  let median = 3900, top25 = 5400, top10 = 7100;
  if (age <= 22) { median = 2200; top25 = 2800; top10 = 3500; }
  else if (age <= 24) { median = 2700; top25 = 3500; top10 = 4400; }
  else if (age <= 26) { median = 3100; top25 = 4100; top10 = 5200; }
  else if (age <= 28) { median = 3500; top25 = 4800; top10 = 6200; }
  else if (age <= 30) { median = 3900; top25 = 5400; top10 = 7100; }
  else if (age <= 32) { median = 4300; top25 = 6000; top10 = 7800; }
  else if (age <= 34) { median = 4600; top25 = 6500; top10 = 8400; }
  else if (age <= 36) { median = 5000; top25 = 7000; top10 = 9100; }
  else if (age <= 39) { median = 5400; top25 = 7600; top10 = 9800; }
  else if (age <= 43) { median = 5800; top25 = 8200; top10 = 10600; }
  else if (age <= 48) { median = 6200; top25 = 8800; top10 = 11500; }
  else if (age <= 53) { median = 5800; top25 = 8200; top10 = 10800; }
  else if (age <= 59) { median = 5000; top25 = 7200; top10 = 9500; }
  else { median = 4000; top25 = 5800; top10 = 7500; }

  return { age, median, top25, top10 };
}

function getAgeRankText(ageVal, annualIncome) {
  const stats = getExactAgeStats(ageVal);
  const age = stats.age;
  let percentile = '중위권';
  
  if (annualIncome >= stats.top10) {
    percentile = '상위 10% 이내 (최상위 소득군)';
  } else if (annualIncome >= stats.top25) {
    percentile = '상위 25% 이내 (안정적 상위권)';
  } else if (annualIncome >= stats.median) {
    percentile = '상위 50% 이내 (평균 이상 계급)';
  } else {
    percentile = '하위 50% 지대 (자산 형성집중 필요)';
  }

  const ratio = (annualIncome / stats.median).toFixed(1);
  return `만 <strong>${age}세</strong> 소득 위치: <strong>${percentile}</strong> (${age}세 평균/중위 연봉 ${stats.median.toLocaleString()}만 원 대비 ${ratio}배)`;
}

function get16TierInfo(savings, monthlyAvailable, carPoorIndex, annualIncome) {
  if (savings >= 100000 || (savings >= 50000 && annualIncome >= 20000)) {
    return { badge: "SSS+ TIER", class: "tier-sss-plus", imgId: 1, title: "👑 재벌집 막내아들", desc: "압도적 다이아 자산! 숨만 쉬어도 불로소득이 쌓입니다." };
  } else if (savings >= 50000 || (savings >= 30000 && annualIncome >= 15000)) {
    return { badge: "SSS TIER", class: "tier-sss", imgId: 9, title: "💎 0.1% 찐부자 한강뷰", desc: "현금 흐름 최상위권! 강남/상급지 진입 프리패스." };
  } else if (savings >= 30000 || annualIncome >= 15000) {
    return { badge: "SS TIER", class: "tier-ss", imgId: 2, title: "⚡ 영앤리치 갓생", desc: "탄탄한 자산과 막강한 현금창출력을 보유했습니다." };
  } else if (savings >= 15000 || (savings >= 8000 && annualIncome >= 10000)) {
    return { badge: "S+ TIER", class: "tier-s-plus", imgId: 3, title: "🌟 수도권 상급지 수호자", desc: "상위 5%대 자산 증식 속도를 자랑합니다." };
  } else if (savings >= 8000 && monthlyAvailable >= 400) {
    return { badge: "S TIER", class: "tier-s", imgId: 10, title: "🥇 통장 튼튼 갓생 1황", desc: "안정적인 자산 기반과 여유 있는 생활 수준입니다." };
  } else if (savings >= 5000 && monthlyAvailable >= 300) {
    return { badge: "A+ TIER", class: "tier-a-plus", imgId: 4, title: "🚀 자산 형성 속도 5G", desc: "엘리트 코스를 밟고 있는 우수한 현금 흐름!" };
  } else if (savings >= 3000 && monthlyAvailable >= 200) {
    return { badge: "A TIER", class: "tier-a", imgId: 11, title: "🛡️ 평화로운 통장 수호자", desc: "기본기가 탄탄하며 안정적인 재테크가 가능합니다." };
  } else if (savings >= 2000 && monthlyAvailable >= 150) {
    return { badge: "A- TIER", class: "tier-a-minus", imgId: 5, title: "🌤️ 상승 기류 탑승객", desc: "꾸준한 저축으로 우상향 중인 아름다운 계좌!" };
  } else if (savings >= 1000 && monthlyAvailable >= 100) {
    return { badge: "B+ TIER", class: "tier-b-plus", imgId: 12, title: "🏠 내 집 마련 궤도 진입", desc: "시드머니를 굴리기 시작한 성실한 직장인!" };
  } else if (savings >= 500 && monthlyAvailable >= 70) {
    return { badge: "B TIER", class: "tier-b", imgId: 6, title: "⚖️ 밸런스형 표준 직장인", desc: "대한민국 표준 평균! 무난하게 잘 살고 있습니다." };
  } else if (savings >= 300 && monthlyAvailable >= 50) {
    return { badge: "B- TIER", class: "tier-b-minus", imgId: 13, title: "🌱 갓생 시작하는 뉴비", desc: "이제 막 돈 모으는 재미를 알아가는 단계입니다." };
  } else if (savings >= 100 && monthlyAvailable >= 30) {
    return { badge: "C+ TIER", class: "tier-c-plus", imgId: 7, title: "⚠️ 텅장 주의보 발령", desc: "조금만 방심하면 적자로 돌아설 수 있습니다." };
  } else if (monthlyAvailable >= 20) {
    return { badge: "C TIER", class: "tier-c", imgId: 14, title: "💸 월급 스쳐가는 찰나", desc: "통장 잔고 유지가 아슬아슬! 짠테크 전환 권장." };
  } else if (monthlyAvailable > 0) {
    return { badge: "C- TIER", class: "tier-c-minus", imgId: 15, title: "🪫 숨만 쉬어도 방전", desc: "월급이 들어오자마자 고정비로 다 빠져나갑니다." };
  } else if (monthlyAvailable <= 0 && carPoorIndex < 80) {
    return { badge: "D TIER", class: "tier-d", imgId: 8, title: "🚨 적자 생존 모드", desc: "지출이 소득을 초과함! 무조건 소비 다이어트 필수." };
  } else {
    return { badge: "F TIER", class: "tier-f", imgId: 16, title: "💥 언데드 마이너스 통장", desc: "빚으로 연명 중! 카푸어 거나 욜로병 중증입니다." };
  }
}

function calculateSubStats(annualIncome, savings, fixedExpenses, carPoorIndex) {
  let incomeGrade = "F Grade";
  if (annualIncome >= 10000) incomeGrade = "SSS Grade";
  else if (annualIncome >= 8000) incomeGrade = "SS Grade";
  else if (annualIncome >= 6000) incomeGrade = "S Grade";
  else if (annualIncome >= 4500) incomeGrade = "A Grade";
  else if (annualIncome >= 3500) incomeGrade = "B Grade";
  else if (annualIncome >= 3000) incomeGrade = "C Grade";

  let savingsGrade = "F Grade";
  if (savings >= 10000) savingsGrade = "SSS Grade";
  else if (savings >= 5000) savingsGrade = "SS Grade";
  else if (savings >= 3000) savingsGrade = "S Grade";
  else if (savings >= 1500) savingsGrade = "A Grade";
  else if (savings >= 500) savingsGrade = "B Grade";
  else if (savings >= 100) savingsGrade = "C Grade";

  let expenseGrade = "F Grade";
  if (fixedExpenses <= 40) expenseGrade = "S Grade";
  else if (fixedExpenses <= 70) expenseGrade = "A Grade";
  else if (fixedExpenses <= 110) expenseGrade = "B Grade";
  else if (fixedExpenses <= 150) expenseGrade = "C Grade";

  let carPoorStatus = "안전권";
  let dangerClass = false;
  if (carPoorIndex >= 70) { carPoorStatus = `위험 (${carPoorIndex}%)`; dangerClass = true; }
  else if (carPoorIndex >= 50) { carPoorStatus = `경고 (${carPoorIndex}%)`; dangerClass = true; }
  else if (carPoorIndex >= 35) { carPoorStatus = `주의 (${carPoorIndex}%)`; }
  else { carPoorStatus = `안전권 (${carPoorIndex}%)`; }

  return { incomeGrade, savingsGrade, expenseGrade, carPoorStatus, dangerClass };
}

function safeText(id, text) {
  const el = document.getElementById(id);
  if (el) el.innerText = text;
}
function safeHTML(id, html) {
  const el = document.getElementById(id);
  if (el) el.innerHTML = html;
}

function renderDeepReport(data) {
  const { annualIncome, savings, fixedExpenses, monthlyNet, monthlyAvailable, carPoorIndex } = data;
  
  const annualNet = monthlyNet * 12;
  const taxDeductions = Math.max(0, (annualIncome * 10000) - (annualNet * 10000));
  const expRatio = Math.round((fixedExpenses / Math.max(1, monthlyNet)) * 100);

  safeText('repAnnualIncome', `${annualIncome.toLocaleString()} 만 원`);
  safeText('repAnnualNet', `${Math.round(annualNet).toLocaleString()} 만 원`);
  safeText('repTaxDeductions', `약 ${Math.round(taxDeductions / 10000).toLocaleString()} 만 원`);
  
  const expRatioEl = document.getElementById('repExpenseRatio');
  if (expRatioEl) {
    expRatioEl.innerText = `${expRatio}% (${expRatio > 40 ? '주의' : '적정'})`;
    if (expRatio > 40) expRatioEl.classList.add('warning');
    else expRatioEl.classList.remove('warning');
  }

  // 2. 10년 자산 타임라인
  const seedTarget = 10000;
  const timeEl = document.getElementById('repOneHundredMillionTime');
  if (timeEl) {
    if (savings >= seedTarget) {
      timeEl.innerText = "이미 1억 달성 완료! 🎉";
    } else if (monthlyAvailable <= 0) {
      timeEl.innerText = "달성 안 됨 (적자 상태)";
    } else {
      const needed = seedTarget - savings;
      const monthsNeeded = Math.ceil(needed / monthlyAvailable);
      const yrs = Math.floor(monthsNeeded / 12);
      const mos = monthsNeeded % 12;
      timeEl.innerText = yrs > 0 ? `${yrs}년 ${mos}개월 소요 예정` : `${mos}개월 소요 예정`;
    }
  }

  const emgTarget = fixedExpenses * 6;
  const emgRate = Math.min(100, Math.round((savings / Math.max(1, emgTarget)) * 100));
  safeText('repEmergencyFundRate', `${emgRate}% (${emgRate >= 100 ? '충분' : '부족'})`);

  // 3/5/10년 복리 계산 (연 5% 가정)
  const r = 0.05;
  const asset3Y = Math.round(savings * Math.pow(1 + r, 3) + (monthlyAvailable * 12 * (Math.pow(1 + r, 3) - 1) / r));
  const asset5Y = Math.round(savings * Math.pow(1 + r, 5) + (monthlyAvailable * 12 * (Math.pow(1 + r, 5) - 1) / r));
  const asset10Y = Math.round(savings * Math.pow(1 + r, 10) + (monthlyAvailable * 12 * (Math.pow(1 + r, 10) - 1) / r));

  safeText('repSavingsCurrent', `${savings.toLocaleString()} 만 원`);
  safeText('repAsset3Y', `${asset3Y.toLocaleString()} 만 원`);
  safeText('repAsset5Y', `${asset5Y.toLocaleString()} 만 원`);
  safeText('repAsset10Y', `${asset10Y.toLocaleString()} 만 원`);

  safeText('repMilestone3Y', asset3Y >= 10000 ? '수도권 아파트 전세 / 시드머니 완성' : '원룸 전세 / 자산 스노우볼 진입');
  safeText('repMilestone5Y', asset5Y >= 30000 ? '수도권 24평 아파트 매매 진입 한도' : '투룸 매매 / 안정적 전세 자금');
  safeText('repMilestone10Y', asset10Y >= 70000 ? '서울 준상급지 매매 & 은퇴 자유권' : '수도권 아파트 자가 / 자산가 영역');

  // 3. DSR 대출 한도 & 차·집 리스크
  const dsrMaxMonthly = monthlyNet * 0.40; // DSR 40%
  const maxLoan = Math.round((dsrMaxMonthly * 180) / 10000 * 10) / 10; // 30년 상환 대출 한도 추정
  safeText('repMaxLoanAmount', `약 ${maxLoan}억 원 한도`);
  safeText('repMortgageMonthly', `${Math.round(dsrMaxMonthly).toLocaleString()} 만 원 / 월`);

  const carStressEl = document.getElementById('repCarStressIndex');
  if (carStressEl) {
    if (carPoorIndex >= 65) carStressEl.innerText = `고위험 (${carPoorIndex}%)`;
    else if (carPoorIndex >= 40) carStressEl.innerText = `주의 (${carPoorIndex}%)`;
    else carStressEl.innerText = `안전 (${carPoorIndex}%)`;
  }

  // 4. 3단계 맞춤 컨설팅 솔루션
  safeText('solStep1', expRatio > 40 ? 
    `현재 고정비 비중이 실수령액의 ${expRatio}%로 높은 편입니다. 월세/알뜰폰/구독 서비스 다이어트로 월 20만 원을 아끼면 5년 후 모이는 자산이 약 1,400만 원 커집니다.` : 
    `현재 고정비 비중이 ${expRatio}%로 매우 우수합니다. 현재의 알뜰한 지출 구조를 유지하면서 순 잉여 현금을 파킹통장에 즉시 집행하세요.`);

  safeText('solStep2', savings < 3000 ? 
    `시드머니 3,000만 원 달성 시점까지는 예적금과 연 3.5%~7% 고금리 파킹통장에 자금의 80%를 몰아넣어 안전하게 자산 덩치를 키우는 것이 핵심입니다.` : 
    `이미 시드머니가 마련되어 있으므로 청년도약계좌, ISA(비과세 계좌)를 적극 활용해 투자 수익에 대한 세금을 0원으로 방어하세요.`);

  safeText('solStep3', annualIncome >= 4500 ? 
    `연봉 ${annualIncome}만 원 소득 구간은 연금저축펀드(연 600만 한도)를 활용하면 연말정산 시 매년 66만 원~99만 원을 국세청으로부터 현금 환급받을 수 있습니다.` : 
    `청년 우대 주택청약저축을 유지하면서, 남는 여유자금 일부는 미국 S&P500 지수 ETF에 적립식으로 긴 호흡 투자를 시작할 타이밍입니다.`);
}

function renderResults(data) {
  const banner = document.getElementById('tierBanner');
  if (banner) banner.className = `tier-banner ${data.tierInfo.class}`;
  safeText('tierBadge', data.tierInfo.badge);
  safeText('tierTitle', data.tierInfo.title);
  safeText('tierDesc', data.tierInfo.desc);

  safeHTML('ageRankText', data.ageRankText);

  /* Render 4 Sub-Stats */
  safeText('statIncomeGrade', data.subStats.incomeGrade);
  safeText('statSavingsGrade', data.subStats.savingsGrade);
  safeText('statExpenseGrade', data.subStats.expenseGrade);
  
  const carPoorEl = document.getElementById('statCarPoorGrade');
  if (carPoorEl) {
    carPoorEl.innerText = data.subStats.carPoorStatus;
    if (data.subStats.dangerClass) carPoorEl.classList.add('danger');
    else carPoorEl.classList.remove('danger');
  }

  safeText('monthlyNetPay', `${data.monthlyNet.toLocaleString()}만 원`);
  safeText('monthlyAvailable', `${data.monthlyAvailable.toLocaleString()}만 원`);
  safeText('carPoorIndex', `${data.carPoorIndex}%`);

  safeText('recommendedCar', data.carInfo.title);
  safeText('carNote', data.carInfo.note);
  safeText('recommendedHouse', data.houseInfo.title);
  safeText('houseNote', data.houseInfo.note);
  safeText('lifestyleFunStat', `스벅 아메리카노 ${data.coffeeCount}잔 / 배달 ${data.deliveryCount}회`);

  renderDeepReport(data);
  renderFinancialRecipes(data.lifestyle, data.savings, data.monthlyAvailable);
}

function calculateResult(isSilent = false) {
  try {
    const ageEl = document.getElementById('userAge') || document.getElementById('age');
    const userAge = ageEl ? (parseInt(ageEl.value) || 29) : 29;
    
    const incomeEl = document.getElementById('annualIncome');
    const annualIncome = incomeEl ? (parseInt(incomeEl.value) || 4500) : 4500;
    
    const savingsEl = document.getElementById('savings');
    const savings = savingsEl ? (parseInt(savingsEl.value) || 3000) : 3000;
    
    const expEl = document.getElementById('fixedExpenses') || document.getElementById('monthlyExpense');
    const fixedExpenses = expEl ? (parseInt(expEl.value) || 70) : 70;
    
    const radioChecked = document.querySelector('input[name="lifestyle"]:checked');
    const lifestyle = radioChecked ? radioChecked.value : 'frugal';

    const monthlyNet = calculateMonthlyNetPay(annualIncome);
    const monthlyAvailable = Math.max(0, monthlyNet - fixedExpenses);

    let carBudgetRate = 0.25;
    if (lifestyle === 'frugal') carBudgetRate = 0.15;
    if (lifestyle === 'yolo') carBudgetRate = 0.40;
    const monthlyCarBudget = Math.max(0, monthlyAvailable * carBudgetRate);

    const carInfo = getCarRecommendation(monthlyCarBudget, monthlyAvailable);
    const houseInfo = getHousingRecommendation(savings, monthlyAvailable);
    const carPoorIndex = Math.min(100, Math.max(5, Math.round((fixedExpenses + monthlyCarBudget * 1.5) / Math.max(1, monthlyNet) * 100)));
    
    const tierInfo = get16TierInfo(savings, monthlyAvailable, carPoorIndex, annualIncome);
    const subStats = calculateSubStats(annualIncome, savings, fixedExpenses, carPoorIndex);

    const ageRankText = getAgeRankText(userAge, annualIncome);

    const coffeeCount = Math.max(0, Math.floor((monthlyAvailable * 10000 * 0.4) / 4500));
    const deliveryCount = Math.max(0, Math.floor((monthlyAvailable * 10000 * 0.4) / 28000));

    renderResults({ annualIncome, savings, fixedExpenses, monthlyNet, monthlyAvailable, carPoorIndex, carInfo, houseInfo, tierInfo, subStats, ageRankText, coffeeCount, deliveryCount, lifestyle });

    if (!isSilent) {
      document.getElementById('formSection').classList.add('hidden');
      document.getElementById('resultSection').classList.remove('hidden');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  } catch (err) {
    console.error("calculateResult Error:", err);
    if (!isSilent) {
      document.getElementById('formSection').classList.add('hidden');
      document.getElementById('resultSection').classList.remove('hidden');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
}

// 페이지 로드 시 기본값으로 심층 리포트 데이터 미리 계산
document.addEventListener('DOMContentLoaded', () => {
  calculateResult(true);
});

function getCarRecommendation(monthlyCarBudget, monthlyAvailable) {
  if (monthlyAvailable < 30 || monthlyCarBudget < 15) return { title: "따릉이 & 지하철/버스 패스", note: "차량 구매 시 카푸어 직행! 대중교통이 최고의 재테크", carImgId: 1 };
  else if (monthlyCarBudget < 35) return { title: "현대 캐스퍼 / 기아 레이 (경차)", note: "월 할부/유지비 약 25~35만 원선", carImgId: 2 };
  else if (monthlyCarBudget < 55) return { title: "현대 아반떼 CN7 / 기아 셀토스", note: "월 유지비 약 40~50만 원선 (가성비 갓생 조합)", carImgId: 3 };
  else if (monthlyCarBudget < 85) return { title: "기아 K5 / 스포티지 / KG 토레스", note: "월 유지비 약 65~80만 원선", carImgId: 4 };
  else if (monthlyCarBudget < 130) return { title: "현대 그랜저 GN7 / 제네시스 GV70", note: "월 유지비 약 100~120만 원선", carImgId: 5 };
  else if (monthlyCarBudget < 200) return { title: "제네시스 G80 / 벤츠 E-Class / BMW 5시리즈", note: "월 유지비 약 150~180만 원선", carImgId: 6 };
  else return { title: "포르쉐 타이칸 / 911 / 파나메라", note: "월 유지비 250만 원 이상 감당 가능!", carImgId: 7 };
}

function getHousingRecommendation(savings, monthlyAvailable) {
  const maxMortgageLoan = Math.max(0, monthlyAvailable * 150);
  const maxHomePrice = Math.round((savings + maxMortgageLoan) / 10000 * 10) / 10;
  if (maxHomePrice < 2.0) return { title: "청년 안심주택 / 보증금 전세 (원룸·투룸)", note: `순자산 ${savings}만 원 기준 전세 대출 활용 권장` };
  else if (maxHomePrice < 4.5) return { title: "수도권 투룸 오피스텔 / 신축 빌라 (매매 2~4억 대)", note: `최대 전세/매매 구매 한도 약 ${maxHomePrice}억 원 수준` };
  else if (maxHomePrice < 8.5) return { title: "수도권 외곽/경기·인천 24평형 아파트 (매매 5~8억 대)", note: `약 ${maxHomePrice}억 원 내 집 마련 진입 한도 (LTV/DSR 기준)` };
  else if (maxHomePrice < 14.0) return { title: "수도권 선호지역/서울 외곽 24~32평형 (매매 9~13억 대)", note: `약 ${maxHomePrice}억 원 대 아파트 진입 한도` };
  else if (maxHomePrice < 22.0) return { title: "서울 마용성/주요 상급지 24~32평형 (매매 14~21억 대)", note: `약 ${maxHomePrice}억 원 수준 서울 핵심지 아파트 진입 한도` };
  else return { title: "서울 강남3구(강남·서초·송파) 32평형 (매매 22억 이상)", note: "대한민국 최고 자산 상위 1%대 하이엔드 주거 영역" };
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
      tag: "📈 절세 & 투자 파트너",
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

/* 대폭 강화된 2026 종합 심층 재정 컨설팅 리포트 렌더링 */
function renderDeepReport(data) {
  const { annualIncome, savings, fixedExpenses, monthlyNet, monthlyAvailable, carPoorIndex, lifestyle } = data;

  // 1. 현금흐름 밸런스
  const annualNet = monthlyNet * 12;
  const taxDeduction = annualIncome - annualNet;
  const expRatio = Math.round((fixedExpenses / monthlyNet) * 100);
  let expHealth = `${expRatio}% (매우 양호)`;
  if (expRatio >= 55) expHealth = `${expRatio}% (위험: 고정비 다이어트 필수)`;
  else if (expRatio >= 35) expHealth = `${expRatio}% (적정 범위)`;

  document.getElementById('repAnnualIncome').innerText = `${annualIncome.toLocaleString()} 만 원`;
  document.getElementById('repAnnualNet').innerText = `${annualNet.toLocaleString()} 만 원`;
  document.getElementById('repTaxDeductions').innerText = `${taxDeduction.toLocaleString()} 만 원`;
  document.getElementById('repExpenseRatio').innerText = expHealth;

  // 2. 10년 자산 형성 시뮬레이션 & 시드머니 1억 타임라인 (연 5% 복리 반영)
  const seedTarget = 10000;
  const timeEl = document.getElementById('repOneHundredMillionTime');
  if (savings >= seedTarget) {
    timeEl.innerText = "이미 1억 달성 완료! 🎉";
  } else if (monthlyAvailable <= 0) {
    timeEl.innerText = "달성 안 됨 (적자 상태)";
  } else {
    const needed = seedTarget - savings;
    const monthsNeeded = Math.ceil(needed / monthlyAvailable);
    const yrs = Math.floor(monthsNeeded / 12);
    const mos = monthsNeeded % 12;
    timeEl.innerText = yrs > 0 ? `${yrs}년 ${mos}개월 소요 예정` : `${mos}개월 소요 예정`;
  }

  const emgTarget = fixedExpenses * 6;
  const emgRate = Math.min(100, Math.round((savings / emgTarget) * 100));
  document.getElementById('repEmergencyFundRate').innerText = `${emgRate}% (${emgRate >= 100 ? '충분' : '부족'})`;

  // 3/5/10년 복리 계산 (연 5% 가정)
  const r = 0.05;
  const asset3Y = Math.round(savings * Math.pow(1 + r, 3) + (monthlyAvailable * 12 * (Math.pow(1 + r, 3) - 1) / r));
  const asset5Y = Math.round(savings * Math.pow(1 + r, 5) + (monthlyAvailable * 12 * (Math.pow(1 + r, 5) - 1) / r));
  const asset10Y = Math.round(savings * Math.pow(1 + r, 10) + (monthlyAvailable * 12 * (Math.pow(1 + r, 10) - 1) / r));

  document.getElementById('repSavingsCurrent').innerText = `${savings.toLocaleString()} 만 원`;
  document.getElementById('repAsset3Y').innerText = `${asset3Y.toLocaleString()} 만 원`;
  document.getElementById('repAsset5Y').innerText = `${asset5Y.toLocaleString()} 만 원`;
  document.getElementById('repAsset10Y').innerText = `${asset10Y.toLocaleString()} 만 원`;

  document.getElementById('repMilestone3Y').innerText = asset3Y >= 10000 ? '수도권 아파트 전세 / 시드머니 완성' : '원룸 전세 / 자산 스노우볼 진입';
  document.getElementById('repMilestone5Y').innerText = asset5Y >= 30000 ? '수도권 24평 아파트 매매 진입 한도' : '투룸 매매 / 안정적 전세 자금';
  document.getElementById('repMilestone10Y').innerText = asset10Y >= 70000 ? '서울 준상급지 매매 & 은퇴 자유권' : '수도권 아파트 자가 / 자산가 영역';

  // 3. DSR 대출 한도 & 차·집 리스크
  const dsrMaxMonthly = monthlyNet * 0.40; // DSR 40%
  const maxLoan = Math.round((dsrMaxMonthly * 180) / 10000 * 10) / 10; // 30년 상환 대출 한도 추정
  document.getElementById('repMaxLoanAmount').innerText = `약 ${maxLoan}억 원 한도`;
  document.getElementById('repMortgageMonthly').innerText = `${Math.round(dsrMaxMonthly).toLocaleString()} 만 원 / 월`;

  const carStressEl = document.getElementById('repCarStressIndex');
  if (carPoorIndex >= 65) carStressEl.innerText = `고위험 (${carPoorIndex}%)`;
  else if (carPoorIndex >= 40) carStressEl.innerText = `주의 (${carPoorIndex}%)`;
  else carStressEl.innerText = `안전 (${carPoorIndex}%)`;

  // 4. 3단계 맞춤 컨설팅 솔루션
  document.getElementById('solStep1').innerText = expRatio > 40 ? 
    `현재 고정비 비중이 실수령액의 ${expRatio}%로 높은 편입니다. 월세/알뜰폰/구독 서비스 다이어트로 월 20만 원을 아끼면 5년 후 모이는 자산이 약 1,400만 원 커집니다.` : 
    `현재 고정비 비중이 ${expRatio}%로 매우 우수합니다. 현재의 알뜰한 지출 구조를 유지하면서 순 잉여 현금을 파킹통장에 즉시 집행하세요.`;

  document.getElementById('solStep2').innerText = savings < 3000 ? 
    `시드머니 3,000만 원 달성 시점까지는 예적금과 연 3.5%~7% 고금리 파킹통장에 자금의 80%를 몰아넣어 안전하게 자산 덩치를 키우는 것이 핵심입니다.` : 
    `이미 시드머니가 마련되어 있으므로 청년도약계좌, ISA(비과세 계좌)를 적극 활용해 투자 수익에 대한 세금을 0원으로 방어하세요.`;

  document.getElementById('solStep3').innerText = annualIncome >= 4500 ? 
    `연봉 ${annualIncome}만 원 소득 구간은 연금저축펀드(연 600만 한도)를 활용하면 연말정산 시 매년 66만 원~99만 원을 국세청으로부터 현금 환급받을 수 있습니다.` : 
    `청년 우대 주택청약저축을 유지하면서, 남는 여유자금 일부는 미국 S&P500 지수 ETF에 적립식으로 긴 호흡 투자를 시작할 타이밍입니다.`;
}

function renderResults(data) {
  const banner = document.getElementById('tierBanner');
  if (banner) banner.className = `tier-banner ${data.tierInfo.class}`;
  
  const charImg = document.getElementById('tierCharImg');
  if (charImg) {
    charImg.src = `img/tier_card_${data.tierInfo.imgId}.jpg`;
  }

  safeText('tierBadge', data.tierInfo.badge);
  safeText('tierTitle', data.tierInfo.title);
  safeText('tierDesc', data.tierInfo.desc);

  safeHTML('ageRankText', data.ageRankText);

  /* Render 4 Sub-Stats */
  safeText('statIncomeGrade', data.subStats.incomeGrade);
  safeText('statSavingsGrade', data.subStats.savingsGrade);
  safeText('statExpenseGrade', data.subStats.expenseGrade);
  
  const carPoorEl = document.getElementById('statCarPoorGrade');
  if (carPoorEl) {
    carPoorEl.innerText = data.subStats.carPoorStatus;
    if (data.subStats.dangerClass) carPoorEl.classList.add('danger');
    else carPoorEl.classList.remove('danger');
  }

  safeText('monthlyNetPay', `${data.monthlyNet.toLocaleString()}만 원`);
  safeText('monthlyAvailable', `${data.monthlyAvailable.toLocaleString()}만 원`);
  safeText('carPoorIndex', `${data.carPoorIndex}%`);

  const carTierGraphic = document.getElementById('carTierGraphic');
  if (carTierGraphic && data.carInfo.carImgId) {
    carTierGraphic.src = `img/car_img_${data.carInfo.carImgId}.jpg`;
    carTierGraphic.alt = "추천 차량 이미지";
  } else if (carTierGraphic) {
    carTierGraphic.src = "img/car_tier.jpg";
    carTierGraphic.alt = "2026 연봉별 현실 차 추천";
  }

  safeText('recommendedCar', data.carInfo.title);
  safeText('carNote', data.carInfo.note);
  safeText('recommendedHouse', data.houseInfo.title);
  safeText('houseNote', data.houseInfo.note);
  safeText('lifestyleFunStat', `스벅 아메리카노 ${data.coffeeCount}잔 / 배달 ${data.deliveryCount}회`);

  renderDeepReport(data);
  renderFinancialRecipes(data.lifestyle, data.savings, data.monthlyAvailable);
}

function toggleDeepReport() {
  const dash = document.getElementById('deepReportDashboard');
  const txt = document.getElementById('toggleReportText');
  if (!dash) return;
  if (dash.classList.contains('hidden-report')) {
    dash.classList.remove('hidden-report');
    if (txt) txt.innerHTML = `<i class="fa-solid fa-square-caret-up"></i> 🔍 2026 심층 재정 컨설팅 리포트 접기`;
  } else {
    dash.classList.add('hidden-report');
    if (txt) txt.innerHTML = `<i class="fa-solid fa-square-caret-down"></i> 🔍 2026 심층 재정 컨설팅 리포트 상세보기 (클릭하여 펼치기)`;
  }
}

function resetForm() {
  document.getElementById('resultSection').classList.add('hidden');
  document.getElementById('formSection').classList.remove('hidden');
  const dash = document.getElementById('deepReportDashboard');
  if (dash) dash.classList.add('hidden-report');
  const txt = document.getElementById('toggleReportText');
  if (txt) txt.innerHTML = `<i class="fa-solid fa-square-caret-down"></i> 🔍 2026 심층 재정 컨설팅 리포트 상세보기 (클릭하여 펼치기)`;
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function captureStoryCard() {
  const cardNode = document.getElementById('storyCardContainer');
  html2canvas(cardNode, { scale: 2, backgroundColor: '#ffffff', useCORS: true }).then(canvas => {
    const a = document.createElement('a');
    a.href = canvas.toDataURL("image/png");
    a.download = `2026_현실연봉계급_결과카드.png`;
    a.click();
  });
}

function copyLink() { navigator.clipboard.writeText(window.location.href).then(() => alert('링크가 복사되었습니다!')); }
function shareKakao() { alert('카카오톡 공유 버튼 지점입니다.'); }
