import client from '../utils/api-client';

export const state = () => ({
  item: {},
  contents: [],
  comments: { count: 0, comments: [] },
  payments: { total: 0, payment_me: {}, payment_others: [] },
});

export const getters = {
  getItem: state => state.item,
  getContents: state => state.contents,
  getComments: state => state.comments,
  getPayments: state => state.payments,
  getMyPayment: state => state.payments.payment_me || {},
};

export const mutations = {
  // mutations for item and its contents
  setItem(state, { item, contents }) {
    state.item = item;
  },
  setContents(state, { contents }) {
    state.contents = contents;
  },

  // mutations for comments
  appendComments(state, { comments }) {
    state.comments.comments =
      state.comments.comments.concat(comments.comments);
    state.comments.count = comments.count;
  },
  addComment(state, { comment }) {
    state.comments.comments.unshift(comment);
    state.comments.count += 1;
  },
  deleteComment(state, { id }) {
    state.comments.comments.find(c => c.id === id).content = 'DELETED';
    state.comments.count -= 1;
  },

  // mutations for payments
  setPayments(state, { payments }) {
    state.payments = payments;
  },
  registerPayment(state, { payment }) {
    state.payments.my_payment = payment;
    state.payments.total += 1;
  },
};

export const actions = {

  // actions for item and its contents
  async getItem({ commit }, { id }) {
    const response = await client.request({
      method: 'get',
      url: `items/${id}/`,
    });
    commit('itemDetail/setItem', { item: response.data }, { root: true });
  },
  async getContentsOfItem({ commit }, { id }) {
    const response = await client.request({
      method: 'get',
      url: `items/${id}/contents`,
    });
    commit('itemDetail/setContents', { contents: response.data.contents }, { root: true });
  },


  // actions for comments
  async getCommentsOfItem({ commit }, { id, offset }) {
    const response = await client.request({
      method: 'get',
      url: `items/${id}/comments?offset=${offset}&sort=-created_date`,
    });
    commit('itemDetail/appendComments', { comments: response.data }, { root: true });
  },
  async addCommentToItem({ commit }, { id, comment }) { // id is of item
    const response = await client.request({
      method: 'post',
      url: `items/${id}/comments/`,
      data: comment,
    });
    commit('itemDetail/addComment', { comment: response.data.comment }, { root: true });
  },
  async deleteComment({ commit }, { id }) {
    await client.request({
      method: 'delete',
      url: `comments/${id}`,
    });
    commit('itemDetail/deleteComment', { id }, { root: true });
  },

  // actions for payments
  async getPaymentsOfItem({ commit }, { id }) {
    const response = await client.request({
      method: 'get',
      url: `items/${id}/payments`,
    });
    console.log(response.data);
    console.log(response.data.payment_me.records);
    commit('itemDetail/setPayments', { payments: response.data }, { root: true });
  },
  async registerPaymentToItem({ commit }, { id, records }) {
    const response = await client.request({
      method: 'post',
      url: `items/${id}/payments/`,
    });
    commit('itemDetail/registerPayment', { payment: response.data.payment }, { root: true });
  },
};
