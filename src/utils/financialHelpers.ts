
/**
 * Calculates the remaining months to pay a debt
 */
export const calculateRemainingMonths = (
  remainingAmount: number, 
  monthlyPayment: number, 
  interestRateYearly: number
): number => {
  const monthlyInterestRate = interestRateYearly / 12 / 100;
  let remainingBalance = remainingAmount;
  let months = 0;
  
  while (remainingBalance > 0 && months < 600) { // 50 years max to avoid infinite loops
    const interestPayment = remainingBalance * monthlyInterestRate;
    const principalPayment = monthlyPayment - interestPayment;
    
    remainingBalance -= principalPayment;
    months++;
  }
  
  return months;
};

/**
 * Calculates the emergency fund target (6x monthly expenses)
 */
export const calculateEmergencyFundTarget = (monthlyExpenses: number): number => {
  return monthlyExpenses * 6;
};

/**
 * Calculates the savings ratio (savings / income)
 */
export const calculateSavingsRatio = (
  monthlyIncome: number, 
  monthlyExpenses: number
): number => {
  if (monthlyIncome === 0) return 0;
  return ((monthlyIncome - monthlyExpenses) / monthlyIncome) * 100;
};

/**
 * Calculates the debt-to-income ratio
 */
export const calculateDebtToIncomeRatio = (
  monthlyDebtPayments: number, 
  monthlyIncome: number
): number => {
  if (monthlyIncome === 0) return 0;
  return (monthlyDebtPayments / monthlyIncome) * 100;
};

/**
 * Determines financial health status based on a value and target
 */
export const getFinancialHealthStatus = (
  value: number, 
  target: number, 
  isHigherBetter: boolean = true
): 'success' | 'warning' | 'danger' => {
  const ratio = value / target;
  
  if (isHigherBetter) {
    if (ratio >= 1) return 'success';
    if (ratio >= 0.7) return 'warning';
    return 'danger';
  } else {
    // For metrics where lower is better (like debt ratio)
    if (ratio <= 0.7) return 'success';
    if (ratio <= 1) return 'warning';
    return 'danger';
  }
};
