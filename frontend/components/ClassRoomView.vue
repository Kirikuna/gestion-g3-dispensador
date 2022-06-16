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
        <v-card min-height='80px' :color='colorReport' class='align-center'>
          <v-card-title class='justify-center'>
            <v-icon color='white' size='40px'> mdi-alert-octagon </v-icon>
          </v-card-title>
          <v-card-title class='justify-center pt-0'> {{cantReports}} </v-card-title>
          <v-card-subtitle class='text-center'> Reportes </v-card-subtitle>
        </v-card>
      </v-col>
      <v-spacer></v-spacer>
      <v-col cols="12" md='2' xs="12" sm="12" align-self='end' class="pa-6">
        <v-btn min-width="100%" max-width="100%" @click="solve">
          Solucionar
        </v-btn>
      </v-col>
    </v-row>
        <v-data-table
          :headers="header"
          :items="logs"
          :items-per-page="10"
          class="pointer elevation-1"
          :loading='loadingDT'
        ></v-data-table>

    <v-dialog v-model='dialog' min-width='400px' max-width='400px'>
      <edit-class-room-card :class-room-name='classRoomName' :classRoomId='classRoomId' @dialogAction='dialogAction'/>
    </v-dialog>
    <QRGeneration/>
    <v-snackbar
      v-model="snackbar"
      :timeout="timeout"
      color="success"
    >
      {{ text }}
      <template v-slot:action="{ attrs }">
        <v-btn
          text
          v-bind="attrs"
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
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
      snackbar: false,
      timeout: 2000,
      colorReport: 'success',
      cantReports: 0,
      text: 'Reporte solucionado',
      header: [
          {
            text: 'Mensaje',
            align: 'center',
            value: 'Report', 
            sorteable: false
          },
          { text: 'Fecha de reporte', value: 'Date', align: 'center', sorteable: false},
          { text: 'Hora de reporte', value: 'Time' , align: 'center', sorteable: false},
        ],
      logs: [],
      loadingDT: true,
    }
  },
  methods: {
    dialogAction(data) {
      this.dialog = !this.dialog;
      if (data !== undefined)
        this.classRoomName = data;
    },
    async getRoom() {
      this.classRoom = await this.$axios.get(`${process.env.NUXT_ENV_BACKEND}/sala/get-sala/${this.classRoomId}`);
      this.classRoom = this.classRoom.data.data;
      this.cantReports = this.classRoom.NumberOfReports;
      this.colorReport = this.classRoom.State === 0 ? 'success' : this.classRoom.State === 1 ? 'warning' : 'danger';
      this.classRoomName = this.classRoom.Name;
    },
    async getLogs() {
      this.loadingDT = true;
      const log = await this.$axios.get(`${process.env.NUXT_ENV_BACKEND}/sala/get-logs/${this.classRoomId}`);
      this.logs = log.data.data;
      this.loadingDT = false;
    },
    async solve() {
      this.snackbar = true;
      this.cantReports = 0;
      this.colorReport = 'success';
      const solve = await this.$axios.put(`${process.env.NUXT_ENV_BACKEND}/sala/solve-sala/${this.classRoomId}`);
      this.logs.unshift(solve.data.data.Log);
    },
  },
  async beforeMount() {
    await this.getRoom();
    await this.getLogs();
  }
};
</script>

<style scoped>

</style>
