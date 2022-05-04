export const state = () => ({
  buildings: [
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
  ],
});

export const mutations = {
  addBuilding(state, building) {
    state.buildings.push(building);
  },
};
