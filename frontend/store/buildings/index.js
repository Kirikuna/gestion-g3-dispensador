export const state = () => ({
  buildings: null,
});

export const mutations = {
  setBuildings(state, payload) {
    state.buildings = payload;
  },
  addBuilding(state, building) {
    state.buildings.push(building);
  },
};

export const actions = {
  async getBuildings(context) {
    const buildings = await this.$axios.get(`${process.env.NUXT_ENV_BACKEND}/edificio/get-all-edificios`);
    context.commit('setBuildings', buildings.data.data);
  },
  async addBuilding(context, payload) {
    await this.$axios.post(`${process.env.NUXT_ENV_BACKEND}/edificio/add-edificio`, {
      name: payload.Name,
      color: payload.Color,
    }).then((building) => {
      console.log(building.data.data);
      context.commit('addBuilding', building.data.data);
    }).catch((error) => {
      console.log(error);
    });
  },
};

export const getters = {
  getBuildings(state) {
    return state.buildings;
  },
};
