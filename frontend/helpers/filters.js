export function filterBuildings(buildingNames, buildings) {
  let filteredList = [...buildings];
  if (buildingNames !== 'all') {
    filteredList = filteredList.filter(building => buildingNames.includes(building.Name));
  }
  return filteredList;
}

export function filterStates(states, buildings) {
  let filteredList = [...buildings];
  if (states !== 'all') {
    filteredList = filteredList.map((building) => {
        building.Rooms = building.Rooms.filter(room => states.includes(room.State));
        return building;
      },
    );
  }

  return filteredList;
}
