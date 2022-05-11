<template>
  <v-card
    class='mx-auto'
    max-width='80%'
  >
    <v-toolbar color=orange height='20px'/>

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

    <v-row>
      <v-col md='2' class='align-center pa-6'>
        <v-card min-height='80px' color='#ffba52' class='align-center'>
          <v-icon color='white' size='40px' class='align-center'> mdi-alert-octagon </v-icon>
          <v-card-title class='justify-center'> 1 </v-card-title>
          <v-card-subtitle class='text-center'> Reportes </v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>

    <v-dialog v-model='dialog' max-width='30%'>
      <edit-class-room-card :class-room-name='classRoomName' @dialogAction='dialogAction'></edit-class-room-card>
    </v-dialog>
  </v-card>
</template>

<script>
export default {
  name: 'ClassRoom',
  data() {
    return {
      dialog: false,
      classRoomName: 'Sala 22'
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
