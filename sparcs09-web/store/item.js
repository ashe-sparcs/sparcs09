import client from '../utils/api-client';

export const state = () => ({
  item: {},
});

export const getters = {
  getItem: state => state.item,
};

export const mutations = {
  // mutations for item and its contents
  setItem(state, { item, contents }) {
    state.item = item;
  },
};

export const actions = {

  async getItem({ commit }, { id }) {
    const response = await client.request({
      method: 'get',
      url: `items/${id}/`,
    });
    commit('item/setItem', { item: response.data }, { root: true });
  },
};
