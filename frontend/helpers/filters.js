export function filterBuildings(buildingNames, buildings) {
  let filteredList = [...buildings];

  if (buildingNames !== 'all') {
    filteredList = filteredList.filter(building => buildingNames.includes(building.Name));
  }

  return filteredList;
}
