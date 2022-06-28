export const state = () => ({
  users: [],
});

export const mutations = {
  setUsers(state, payload) {
    state.users = payload;
  },
};

export const actions = {
  async getUsers(context) {
    await this.$axios.get('/auth/get-all-usuarios')
      .then((data) => {
        context.commit('setUsers', data.data.data);
        //console.log(data.data.data);
      })
      .catch((error) => {
        console.log(error);
      });

  },
};

export const getters = {
  getUsers(state) {
    return state.users;
  },
};
