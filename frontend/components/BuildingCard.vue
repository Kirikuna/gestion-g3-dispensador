<template>
  <v-card
    class='mx-auto'
    max-width='344'
  >
    <v-toolbar :color='building.Color' height='20px'>

    </v-toolbar>

    <v-toolbar>
      <v-card-title class='justify-center'>
        {{ building.Name }}
      </v-card-title>
      <v-row justify='end'>
        <v-col cols='6'>
          <v-btn x-small @click.stop='dialog=true'>
            editar
          </v-btn>
          <BuildingDialog
            v-model='dialog'
            title='Editar edificio'
            action='edit'
            :building='building'

          />
        </v-col>
      </v-row>
    </v-toolbar>


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
//TODO: alinear bien el boton de editar
export default {
  props: ['building'],
  data: () => {
    return { dialog: false, Rooms: [] };

  },
  methods: {
    async getRooms() {
      this.Rooms = await this.$axios.get(`${process.env.NUXT_ENV_BACKEND}/sala/get-edificio-salas/${this.building.id}`).then((data) => {
        return data.data.data;
      }).catch((error) => {
        console.log(error);
      });
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
