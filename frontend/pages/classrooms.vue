<template>
  <div>
    <class-room-view :classRoomId='$route.query.id' :colorBuilding='$route.query.bColor' :nameBuilding='$route.query.bName'/>
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
