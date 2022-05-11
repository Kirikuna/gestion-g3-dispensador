import BuildingDialog from '~/components/BuildingDialog';

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
  editBuilding(state, building) {
    const item = state.buildings.find((item) => item.id === building.id);
    Object.assign(item, building);
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
      context.commit('addBuilding', building.data.data);
    }).catch((error) => {
      console.log(error);
    });
  },

  async editBuilding(context, payload) {
    await this.$axios.put(`${process.env.NUXT_ENV_BACKEND}/edificio/update-edificio/${payload.id}`, {
      id: payload.id,
      name: payload.Name,
      color: payload.Color,
    })
      .then((building) => {
        console.log(building.data.data);
        context.commit('editBuilding', building.data.data);
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
