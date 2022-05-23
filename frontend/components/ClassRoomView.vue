<template>
  <v-card
    class='mx-auto'
    max-width='80%'
  >
    <v-toolbar :color=colorBuilding height='20px'/>

    <v-row>
      <v-col cols='12'>
        <v-card-title class='justify-center'>
          {{ nameBuilding }}
        </v-card-title>
        <v-card-subtitle class='text-center text-h6'>
          {{classRoomName}}
          <v-btn icon @click='dialogAction()'>
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
        </v-card-subtitle>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12"  md='2' xs="12" sm="12" class='align-center pa-6' align-self='end'>
        <v-card min-height='80px' color='#ffba52' class='align-center'>
          <v-card-title class='justify-center'>
            <v-icon color='white' size='40px'> mdi-alert-octagon </v-icon>
          </v-card-title>
          <v-card-title class='justify-center pt-0'> 1 </v-card-title>
          <v-card-subtitle class='text-center'> Reportes </v-card-subtitle>
        </v-card>
      </v-col>
      <v-spacer></v-spacer>
      <v-col cols="12" md='2' xs="12" sm="12" align-self='end' class="pa-6">
        <v-btn min-width="100%" max-width="100%" @click="ruta()">
          Solucionar
        </v-btn>
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-cols cols="12" md='12' xs="12" sm="12" class="pa-6">
        <v-data-table
          :headers="headers"
          :items="desserts"
          :items-per-page="5"
          class="pointer elevation-1"
        ></v-data-table>
      </v-cols>
    </v-row>

    <v-dialog v-model='dialog' min-width='400px' max-width='400px'>
      <edit-class-room-card :class-room-name='classRoomName' :classRoomId='classRoomId' @dialogAction='dialogAction'/>
    </v-dialog>
    <QRGeneration/>
  </v-card>
</template>

<script>
export default {
  props: {
    classRoomId: {
      type: String,
      default: null,
    },
    colorBuilding: {
      type: String,
      default: null,
    },
    nameBuilding: {
      type: String,
      default: null,
    }
  },
  name: 'ClassRoom',
  data() {
    return {
      dialog: false,
      classRoomName: null,
      classRoom: null,
      headers: [
          {
            text: 'Mensaje',
            align: 'start',
            value: 'report',
          },
          { text: 'Fecha de reporte', value: 'date' },
          { text: 'Hora de reporte', value: 'hour' },
        ],
        desserts: [
          {
            report: 'Sin Alcohol',
            date: '22/04/2022',
            hour: '19:00',
          },
          {
            report: 'Rellenado',
            date: '22/04/2022',
            hour: '08:00',
          },
          {
            report: 'Sin batería',
            date: '21/04/2022',
            hour: '14:00',
          },
        ],
    }
  },
  methods: {
    dialogAction() {
      this.dialog = !this.dialog;
    },
    async getRoom() {
      this.classRoom = await this.$axios.get(`${process.env.NUXT_ENV_BACKEND}/sala/get-sala/${this.classRoomId}`);
      this.classRoom = this.classRoom.data.data;
      this.classRoomName = this.classRoom.Name;
    },
    ruta(){
      console.log(this.$route.fullPath)
    }
  },
  beforeMount() {
    this.getRoom();
  }
};
</script>

<style scoped>

</style>
