export const state = () => ({
  classRooms: null,
})

export const mutations = {
  setClassRooms(state, payload) {
    state.classRooms = payload
  },
}

export const actions = {
  async getClassRooms(context) {
    const buildings = await this.$axios.get(
      `${process.env.NUXT_ENV_BACKEND}/sala/get-sala/${this.route.params.id}`
    )
    context.commit('setBuildings', buildings.data.data)
  },
}

export const getters = {
  getClassRooms(state) {},
}
