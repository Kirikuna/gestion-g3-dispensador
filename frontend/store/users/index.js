export const state = () => ({
  users: [],
});

export const mutations = {
  setUsers(state, payload) {
    state.users = payload;
  },
  updateUser(state, user) {
    const item = state.users.find((item) => item.id === user.id);
    Object.assign(item, user);
  },
  registerUser(state, user) {
    state.users.push(user);
  },
  deleteUser(state, payload) {
    const index = state.users.findIndex(
      (user) => user.id === payload,
    );
    state.users.splice(index, 1);
  },
};

export const actions = {
  async getUsers(context) {
    await this.$axios.get('/auth/get-all-usuarios')
      .then((data) => {
        context.commit('setUsers', data.data.data);
      })
      .catch((error) => {
        console.log(error);
      });

  },
  async registerUser(context, payload) {
    await this.$axios.post(`/auth/signup`, payload)
      .then((data) => {
        console.log(data.data.data);
        context.commit('registerUser', data.data.data);
      })
      .catch((error) => {
          console.log(error);
        },
      );
  },

  async updateUser(context, payload) {
    await this.$axios.put(`/auth/update-usuario/${payload.id}`, payload)
      .then((data) => {
        console.log(data.data.data);
        context.commit('updateUser', data.data.data);
      })
      .catch((error) => {
          console.log(error);
        },
      );
  },

  async deleteUser(context, payload) {
    await this.$axios.delete(`/auth/delete-usuario/${payload}`)
      .then((data) => {
        console.log(data.data.data);
        context.commit('deleteUser', data.data.data);
      })
      .catch((error) => {
          console.log(error);
        },
      );
  },

};

export const getters = {
  getUsers(state) {
    return state.users;
  },
};
