import client from '../utils/api-client';

export const state = () => ({
  comments: { count: 0, comments: [] },
});

export const getters = {
  getComments: state => state.comments,
};

export const mutations = {
  // append at the front.
  appendComments(state, { comments }) {
    state.comments.comments =
      comments.comments.concat(state.comments.comments);
    state.comments.count = comments.count;
  },
  addComment(state, { comment }) {
    state.comments.comments.push(comment);
    state.comments.count += 1;
  },
  deleteComment(state, { id }) {
    state.comments.comments.find(c => c.id === id).content = 'DELETED';
    state.comments.count -= 1;
  },
};

export const actions = {

  // actions for comments
  async getCommentsOfItem({ commit }, { id, offset }) {
    const response = await client.request({
      method: 'get',
      url: `items/${id}/comments?offset=${offset}&sort=-created_date`,
    });
    response.data.comments.reverse();
    commit('comments/appendComments', { comments: response.data }, { root: true });
  },
  async addCommentToItem({ commit }, { id, comment }) { // id is of item
    const response = await client.request({
      method: 'post',
      url: `items/${id}/comments/`,
      data: comment,
    });
    commit('comments/addComment', { comment: response.data.comment }, { root: true });
  },

  async deleteComment({ commit }, { id }) {
    await client.request({
      method: 'delete',
      url: `comments/${id}`,
    });
    commit('comments/deleteComment', { id }, { root: true });
  },
};
