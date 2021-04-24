<template>
  <div class="container">
    <div class="row">
      <div class="col-md-8 offset-md-2">
        <h1 class="text-center">Calculate your credit card costs and predict further money spends.</h1>
      </div>
      <div class="col-md-8 offset-md-2">
        <debt-card class="mt-5"></debt-card>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import DebtCard from './components/DebtCard.vue'

export default defineComponent({
  components: {
    DebtCard
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
