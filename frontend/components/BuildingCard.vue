<template>
  <v-card
    class='mx-auto'
    max-width='344'
  >
    <v-toolbar :color='building.Color' height='20px'>

    </v-toolbar>
    <v-card-title class='justify-center'>
      {{ building.Name }}
    </v-card-title>

    <v-card-text class='pa-0'>
      <v-row>
        <v-col cols='12' v-for='room in building.Rooms' :key='room.name'>
          <room-card class='room-card' :room='room' />
        </v-col>
      </v-row>
    </v-card-text>

  </v-card>
</template>

<script>
export default {
  props: ['building'],
  data: () => {
    return {};
  },
  mounted() {
    console.log(this.building);
  }
};
</script>

<style scoped>
.room-card{
  border: 20px black;
}
</style>
