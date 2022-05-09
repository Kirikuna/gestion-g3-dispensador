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
        <v-col cols='12' v-for='room in Rooms' :key='room.name'>
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
    return { Rooms: [] };

  },
  methods: {
    async getRooms() {
      this.Rooms = await this.$axios.get(`${process.env.NUXT_ENV_BACKEND}/sala/get-edificio-salas/${this.building.id}`).then((data) => {
        return data.data.data;
      }).catch((error) => {
        console.log(error);
      });
      console.log(this.Rooms);
    },
  },
  mounted() {
    this.getRooms();
  },
};
</script>

<style scoped>
.room-card {
  border: 20px black;
}
</style>
