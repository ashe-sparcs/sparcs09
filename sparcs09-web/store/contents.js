import client from '../utils/api-client';

export const state = () => ({
  contents: [],
});

export const getters = {
  getContents: state => state.contents,
};

export const mutations = {
  setContents(state, { contents }) {
    state.contents = contents;
  },
};

export const actions = {

  async getContentsOfItem({ commit }, { id }) {
    const response = await client.request({
      method: 'get',
      url: `items/${id}/contents`,
    });
    commit('contents/setContents', { contents: response.data.contents }, { root: true });
  },
};
