<template>
  <v-card
    class='mx-auto'
    max-width='344'
  >
    <v-toolbar :color='building.Color' height='20px'>

    </v-toolbar>

    <v-toolbar height='50%'>
      <v-card-title
        class='justify-center d-flex ml-auto mr-auto text-center'
        style='word-break: break-word'
      >

        {{ building.Name }}
      </v-card-title>

    </v-toolbar>

    <v-card-text class='pa-0'>
      <QRGeneration :QRroute='$route.query' classRoomName='nombre'/>
    </v-card-text>

  </v-card>
</template>

<script>
//TODO: alinear bien el boton de editar
export default {
  props: ['building'],
  data: () => {
    return { Rooms: [] };

  },
  methods: {
    async getRooms() {},
  },
};
</script>

<style scoped>
</style>
