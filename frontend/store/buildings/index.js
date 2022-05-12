export const state = () => ({
  buildings: null,
})

export const mutations = {
  setBuildings(state, payload) {
    state.buildings = payload
  },
  addBuilding(state, building) {
    state.buildings.push(building)
  },
  editBuilding(state, building) {
    const item = state.buildings.find((item) => item.id === building.id)
    Object.assign(item, building)
  },
  deleteBuilding(state, payload) {
    const index = state.buildings.findIndex(
      (building) => building.id === payload
    )
    state.buildings.splice(index, 1)
  },
  addSala(state, payload) {
    const building = state.buildings.find(
      (building) => building.id === payload.eid
    )
    building.Rooms.push(payload.room)
  },
}

export const actions = {
  async getBuildings(context) {
    const buildings = await this.$axios.get(
      `${process.env.NUXT_ENV_BACKEND}/edificio/get-all-edificios`
    )
    context.commit('setBuildings', buildings.data.data)
  },
  async addBuilding(context, payload) {
    await this.$axios
      .post(`${process.env.NUXT_ENV_BACKEND}/edificio/add-edificio`, {
        name: payload.Name,
        color: payload.Color,
      })
      .then((building) => {
        context.commit('addBuilding', building.data.data)
      })
      .catch((error) => {
        console.log(error)
      })
  },

  async editBuilding(context, payload) {
    await this.$axios
      .put(
        `${process.env.NUXT_ENV_BACKEND}/edificio/update-edificio/${payload.id}`,
        {
          id: payload.id,
          name: payload.Name,
          color: payload.Color,
        }
      )
      .then((building) => {
        console.log(building.data.data)
        context.commit('editBuilding', building.data.data)
      })
      .catch((error) => {
        console.log(error)
      })
  },
  async deleteBuilding(context, payload) {
    await this.$axios
      .delete(
        `${process.env.NUXT_ENV_BACKEND}/edificio/delete-edificio/${payload}`
      )
      .then((buildingId) => {
        context.commit('deleteBuilding', buildingId.data.data)
      })
      .catch((error) => {
        console.log(error)
      })
  },
  async addSala(context, payload) {
    await this.$axios
      .post(`${process.env.NUXT_ENV_BACKEND}/sala/add-sala`, {
        eid: payload.eid,
        name: payload.room.Name,
      })
      .then((data) => {
        context.commit('addSala', { eid: payload.eid, room: data.data.data })
      })
      .catch((error) => {
        console.log(error)
      })
  },
  async deleteClassRoom(context, payload) {
    await this.$axios
      .delete(`${process.env.NUXT_ENV_BACKEND}/sala/delete-sala/${payload.id}`)
      .catch((error) => {
        console.log(error)
      })
  },
  async updateClassRoom(context, payload) {
    await this.$axios
      .put(`${process.env.NUXT_ENV_BACKEND}/sala/update-sala/${payload.id}`, {
        name: payload.name,
      })
      .catch((error) => {
        console.log(error)
      })
  },
}

export const getters = {
  getBuildings(state) {
    return state.buildings
  },
  getRoom(state) {
    const building = state.buildings.find(
      (building) => building.id === payload.eid
    )
  },
}
