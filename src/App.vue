<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <h1 class="text-center">Рассчитайте график погашения кредитов.</h1>
      </div>
      <div class="col-md-5 offset-md-7">
        <input-card class="mt-5"></input-card>
      </div>
    </div>
  </div>
  <section class="mt-5 pt-2 pb-2" style="background:#e9e9e9;">
    <div class="container">
      <div class="row">
        <div class="col-12 text-left">
          <h2>График платежей</h2>
          <p class="text">Вы закроете кредит за <b>5 месяцев</b>, заплатив суммарно <b>185000 руб.</b>, из них процентов <b>35000 руб.</b> - проценты банку.</p>
        </div>
        <div class="col-12">
          <table class="table table-striped">
            <thead>
            <tr>
              <th scope="col">Месяц</th>
              <th scope="col">Общий долг</th>
              <th scope="col">Платеж</th>
              <th scope="col">Проценты</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="payment in getPayments">
              <th scope="row">{{ key }}</th>
              <td>{{ payment.totalDebt }}</td>
              <td>{{ payment.payment }}</td>
              <td>{{ payment.bankPercent }}</td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>149.000</td>
              <td>10000</td>
              <td>4300</td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td>145.000</td>
              <td>10000</td>
              <td>4100</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import InputCard from './components/InputCard.vue'
// @ts-ignore
import { mapGetters } from 'vuex';

export default defineComponent({
  components: {
    InputCard
  },
  computed: {
    ...mapGetters({
      getPayments: 'getPayments'
    })
  }
})
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  font-size: 10px;
  padding-top: 6em;
}
</style>
