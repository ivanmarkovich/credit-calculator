import { PaymentCycleData } from '@/types/PaymentCycleData';

function paymentCycle(totalDebt: number, monthlyPayment: number, bankPercentage: number): PaymentCycleData | null {
  if (totalDebt <= 0) {
    return null;
  }
  let dynamicDebt = totalDebt;
  let monthlyInterest = 0;
  let totalInterest = 0;
  let monthsCount = 0;

  while (dynamicDebt > 0) {
    monthlyInterest = dynamicDebt * (bankPercentage / 100) / 12;
    dynamicDebt = dynamicDebt - monthlyPayment + monthlyInterest;
    if (monthlyPayment <= monthlyInterest) {
      monthsCount = 999999;
      totalInterest = 999999;
      break;
    }
    totalInterest += monthlyInterest;
    monthsCount++;
  }

  const averageMonthInterest = totalInterest / monthsCount;
  const averageYearInterest = averageMonthInterest * (monthsCount < 12 ? monthsCount : 12);

  return {
    totalPayment: Math.ceil(totalDebt + totalInterest),
    totalInterest: Math.ceil(totalInterest),
    averageMonthInterest: Math.ceil(averageMonthInterest),
    averageYearInterest: Math.ceil(averageYearInterest),
    monthsCount: Math.ceil(monthsCount)
  }
}

export const debtCalculationLogic = {
  buildEmptyPaymentCycleData(): PaymentCycleData {
    return {
      totalPayment: 0,
      totalInterest: 0,
      averageMonthInterest: 0,
      averageYearInterest: 0,
      monthsCount: 0
    }
  },
  calcBankPercentage(totalDebt: number, monthlyPayment: number, bankInterest: number): number {
    return 12 * bankInterest / totalDebt * 100
  },
  calcPaymentCycleData(totalDebt: number, monthlyPayment: number, bankPercentage: number): PaymentCycleData {
    const data = paymentCycle(totalDebt, monthlyPayment, bankPercentage);
    if (!data) {
      return this.buildEmptyPaymentCycleData();
    }
    return data;
  },
  calcYearBankInterest(totalDebt: number, monthlyPayment: number, bankPercentage: number): number {
    let dynamicDebt = totalDebt;
    let monthlyInterest = 0;
    let yearInterest = 0;

    for (let i = 1; i <= 12; i++) {
      monthlyInterest = dynamicDebt * (bankPercentage / 100) / 12;
      dynamicDebt = dynamicDebt - monthlyPayment + monthlyInterest;
      yearInterest += monthlyInterest;
    }
    return Math.ceil(yearInterest);
  },
  calcCloseTime(totalDebt: number, monthlyPayment: number, bankPercentage: number): number {
    if (monthlyPayment <= 0) {
      return 0;
    }
    let dynamicDebt = totalDebt;
    let monthlyInterest = 0;
    let monthsCount = 0;

    while (dynamicDebt > 0) {
      monthlyInterest = dynamicDebt * (bankPercentage / 100) / 12;
      dynamicDebt = dynamicDebt - monthlyPayment + monthlyInterest;
      monthsCount++;
    }
    return monthsCount;
  },
  buildPayments(totalDebt: number, monthlyPayment: number, bankPercentage: number): Array<object> {
    let dynamicDebt = totalDebt;

    const result = [];
    while (dynamicDebt > 0) {
      const monthlyBankPercent = dynamicDebt * (bankPercentage / 100) / 12;
      dynamicDebt = dynamicDebt - monthlyPayment + monthlyBankPercent;

      const payment = {
        totalDebt: dynamicDebt,
        bankPercent: monthlyBankPercent,
        payment: monthlyPayment
      }

      result.push(payment);
    }

    return result;
  }
}
