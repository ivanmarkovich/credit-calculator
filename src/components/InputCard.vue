<template>
  <div class="card text-left col-md-12">
    <div class="card-body">
      <h4 class="card-title">Заполните поля</h4>
      <h5>Полная сумма кредита:</h5>
      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <span class="input-group-text">Руб</span>
        </div>
        <input v-model.number="totalDebt" type="number" class="form-control" placeholder="Total debt amount"
               aria-label="Username"
               aria-describedby="basic-addon1">
      </div>
      <h5>Ежемесячный платеж:</h5>
      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <span class="input-group-text">Руб</span>
        </div>
        <input v-model.number="monthlyPayment" type="number" class="form-control" placeholder="Monthly payment"
               aria-label="Username"
               aria-describedby="basic-addon1">
      </div>
      <h5>Процент банка в месяц</h5>
      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <span class="input-group-text">Руб</span>
        </div>
        <input v-model.number="bankInterest" type="number" class="form-control" placeholder="Monthly bank interest"
               aria-label="Username"
               aria-describedby="basic-addon1">
      </div>
      <button @click="calcData()" class="btn btn-primary ml-auto">Рассчитать</button>
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
  name: 'InputCard',
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
      const payments = debtCalculationLogic.buildPayments(this.totalDebt, this.monthlyPayment, this.bankPercentage);
      console.log(payments);
      this.$store.dispatch('setPayments', { payments });
    }
  }
})
</script>

<style scoped>

</style>
