<template>
  <v-card
    class='mx-auto'
    max-width='344'
  >
    <v-toolbar :color='building.Color' height='20px'>

    </v-toolbar>

    <v-toolbar height='100%'>
      <v-card-title
        class='justify-center d-flex ml-auto mr-auto text-center'
        style='word-break: break-word'
      >

        {{ building.Name }}
      </v-card-title>


      <v-btn x-small @click.stop='dialog=true'>
        editar
      </v-btn>
      <BuildingDialog
        v-model='dialog'
        title='Editar edificio'
        action='edit'
        :building='building'

      />

    </v-toolbar>

    <v-card-text class='pa-0'>
      <v-row>
        <v-col cols='12' v-for='room in building.Rooms' :key='room.id'>
          <room-card class='room-card' :room='room' @click.native='$router.push({name: "classrooms", query: { id: room.id, bName: building.Name, bColor: building.Color}})'/>
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
};
</script>

<style scoped>
.room-card {
  border: 20px black;
  cursor: pointer;
}
</style>
