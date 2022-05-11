<template>
  <v-card
    class='mx-auto'
    max-width='80%'
  >
    <v-toolbar :color=colorBuilding height='20px'/>

    <v-row>
      <v-col cols='12'>
        <v-card-title class='justify-center'>
          Edificio Naranjo
        </v-card-title>
        <v-card-subtitle class='text-center text-h6'>
          Sala 22
          <v-btn icon @click='dialogAction()'>
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
        </v-card-subtitle>
      </v-col>
    </v-row>

    <v-row >
      <v-col md='2' class='align-center pa-6'>
        <v-card min-height='80px' color='#ffba52' class='align-center'>
          <v-card-title class='justify-center'> <v-icon color='white' size='40px'> mdi-alert-octagon </v-icon> </v-card-title>
          <v-card-title class='justify-center pt-0'> 1 </v-card-title>
          <v-card-subtitle class='text-center'> Reportes </v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>

    <v-dialog v-model='dialog' min-width='400px' max-width='400px'>
      <edit-class-room-card :class-room-name='classRoomName' @dialogAction='dialogAction'/>
    </v-dialog>
  </v-card>
</template>

<script>
export default {
  name: 'ClassRoom',
  data() {
    return {
      dialog: false,
      classRoomName: 'Sala 22',
      colorBuilding: 'orange'
    }
  },
  methods: {
    dialogAction() {
      this.dialog = !this.dialog;
    }
  }
};
</script>

<style scoped>

</style>
