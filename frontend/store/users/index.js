export const state = () => ({
  users: [],
});

export const mutations = {
  setUsers(state, payload) {
    state.users = payload;
  },
  updateUser(state, user) {
    console.log(user);
    console.log(state.users);
    const item = state.users.find((item) => item.id === user.id);
    console.log(item);
    Object.assign(item, user);
  },
  registerUser(state, user) {
    state.users.push(user);
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

};

export const getters = {
  getUsers(state) {
    return state.users;
  },
};
