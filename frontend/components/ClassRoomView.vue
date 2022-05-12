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

    <v-row >
      <v-col md='2' class='align-center pa-6'>
        <v-card min-height='80px' color='#ffba52' class='align-center'>
          <v-card-title class='justify-center'>
            <v-icon color='white' size='40px'> mdi-alert-octagon </v-icon>
          </v-card-title>
          <v-card-title class='justify-center pt-0'> 1 </v-card-title>
          <v-card-subtitle class='text-center'> Reportes </v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>

    <v-dialog v-model='dialog' min-width='400px' max-width='400px'>
      <edit-class-room-card :class-room-name='classRoomName' :classRoomId='classRoomId' @dialogAction='dialogAction'/>
    </v-dialog>
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
    }
  },
  beforeMount() {
    this.getRoom();
  }
};
</script>

<style scoped>

</style>
