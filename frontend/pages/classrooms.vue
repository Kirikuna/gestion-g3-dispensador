<template>
  <div>
    <class-room-view :classRoomId='$route.params.id' :colorBuilding='$route.params.bColor' :nameBuilding='$route.params.bName'/>
  </div>
</template>

<script>
export default {
  name: 'classrooms',
  data: () => {
    return {};
  }
};
</script>

<style scoped>

</style>
