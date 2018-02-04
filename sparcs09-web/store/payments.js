import client from '../utils/api-client';

export const state = () => ({
  payments: { total: 0, payment_me: {}, payment_others: [] },
});

export const getters = {
  getPayments: state => state.payments,
  getMyPayment: state => state.payments.payment_me || {},
};

export const mutations = {

  setPayments(state, { payments }) {
    state.payments = payments;
  },
  registerPayment(state, { payment }) {
    state.payments.my_payment = payment;
    state.payments.total += 1;
  },
};

export const actions = {

  async getPaymentsOfItem({ commit }, { id }) {
    const response = await client.request({
      method: 'get',
      url: `items/${id}/payments`,
    });
    commit('payments/setPayments', { payments: response.data }, { root: true });
  },
  async registerPaymentToItem({ commit }, { id, records }) {
    const response = await client.request({
      method: 'post',
      url: `items/${id}/payments/`,
    });
    commit('payments/registerPayment', { payment: response.data.payment }, { root: true });
  },
};
