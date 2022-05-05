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
    const buildings = [
      {
        name: 'Edificio Verde',
        color: '#2abf4d',
        rooms: [
          {
            name: 'Laboratorio 1',
            available: true,
          },
          {
            name: 'Laboratorio 2',
            available: false,
          },
        ],
      },
      {
        name: 'Edificio Naranjo',
        color: '#F57127',
        rooms: [
          {
            name: 'Sala 21',
            available: false,
          },
          {
            name: 'Sala 22',
            available: true,
          },
        ],
      },
      {
        name: 'Edificio Rojo',
        color: '#FA5151',
        rooms: [
          {
            name: 'Sala E1',
            available: true,
          },
          {
            name: 'Sala E2',
            available: false,
          },
        ],
      },
    ];

    context.commit('setBuildings', buildings);


  },
};

export const getters = {
  getBuildings(state) {
    return state.buildings;
  },
};
