<template>
  <div class="wrap row">
    <div class="card text-left col-md-6">
      <div class="card-body">
        <h4 class="card-title">Fill this fields to start</h4>
        <h5>Total debt amount:</h5>
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text">$</span>
          </div>
          <input v-model.number="totalDebt" type="number" class="form-control" placeholder="Total debt amount" aria-label="Username"
                 aria-describedby="basic-addon1">
        </div>
        <h5>Monthly payment:</h5>
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text">$</span>
          </div>
          <input v-model.number="monthlyPayment" type="number" class="form-control" placeholder="Monthly payment" aria-label="Username"
                 aria-describedby="basic-addon1">
        </div>
        <h5>Monthly bank interest</h5>
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text">$</span>
          </div>
          <input v-model.number="bankInterest" type="number" class="form-control" placeholder="Monthly bank interest" aria-label="Username"
                 aria-describedby="basic-addon1">
        </div>
        <button @click="calcData()" class="btn btn-primary ml-auto">Begin calc</button>
      </div>
    </div>
    <div class="card col-md-5 offset-md-1">
      <div class="card-body">
        <h3>Your percentage rate is: {{ bankPercentage }}%</h3>
        <h3>With this monthly payment:</h3>
        <h3>You will pay to bank ${{ paymentCycleData.averageYearInterest }}/year</h3>
        <h3>You will close your credit in {{ paymentCycleData.monthsCount }} months, with total $ {{ paymentCycleData.totalPayment }} money spent.</h3>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { debtCalculationLogic } from '@/js/debtCalculationLogic'
import { PaymentCycleData } from '@/types/PaymentCycleData';

interface State {
  totalDebt: number;
  monthlyPayment: number;
  bankInterest: number;
  paymentCycleData: PaymentCycleData;
}

export default defineComponent({
  name: 'DebtCard',
  data: (): State => {
    return {
      totalDebt: 0,
      monthlyPayment: 0,
      bankInterest: 0,
      paymentCycleData: debtCalculationLogic.buildEmptyPaymentCycleData()
    }
  },
  computed: {
    bankPercentage(): number {
      return debtCalculationLogic.calcBankPercentage(this.totalDebt, this.monthlyPayment, this.bankInterest);
    }
  },
  methods: {
    calcData() {
      this.paymentCycleData = debtCalculationLogic.calcPaymentCycleData(this.totalDebt, this.monthlyPayment, this.bankPercentage);
    }
  }
})
</script>

<style scoped>

</style>
