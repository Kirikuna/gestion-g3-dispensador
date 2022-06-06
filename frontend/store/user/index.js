export const state = () => ({
  user: {role: 'Admin'},
})

export const mutations = {
  setUserRole(state, payload) {
    state.user.role = payload
  },
}

export const actions = {
  async setUserRole(context, payload) {
    context.commit('setUserRole', payload)
  },
}

export const getters = {
  getUserRole(state) {return state.user.role},
}
