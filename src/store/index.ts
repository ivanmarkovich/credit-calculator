// @ts-ignore
import { createLogger, createStore } from 'vuex';
import { State } from '@/store/types';

const debug = process.env.NODE_ENV === 'development';
export const store = createStore({
  plugins: debug ? [createLogger()] : [],
  state() {
    return {
      payments: []
    }
  },
  getters: {
    getPayments(state: State) {
      return state.payments
    }
  },
  mutations: {
    addPayment(state: State, {payment}: { payment: object }) {
      state.payments.push(payment)
    },
    setPayments(state: State, {payments}: { payments: Array<object> }) {
      state.payments = payments
    }
  },
  actions: {
    addPayment({commit}: any, {payment}: any) {
      commit('addPayment', {payment})
    },
    setPayments({commit}: any, {payments}: any) {
      commit('setPayments', {payments})
    }
  }
})
