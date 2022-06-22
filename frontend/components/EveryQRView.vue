<template>
  <div class='mb-10'>
    <v-row>
      <v-col cols='12'>
        <v-btn @click="download"> descargar </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols='12' v-for='room in rooms' :key='room.id' xl='2' lg='3' md='4' sm='6'>
        <QRCard :id="room.id" :room='room' />
      </v-col>
    </v-row>
  </div>
</template>
<script>
import JZip from 'jszip';
export default {
  layout: 'default',
  data: () => {
    return {
      dialog: false,
      rooms: [],
    };
  },
  methods: {
    async loadBuildings() {
      this.rooms = await this.$axios.get(`${process.env.NUXT_ENV_BACKEND}/qrdata/all`).then((data) => {
        return data.data.data;
      }).catch((error) => {
        console.log(error);
      });
    },
    download() {
      const zip = new JZip();
      const a = document.createElement("a");
      this.rooms.forEach(room => {
        const canvas = document.getElementById(room.id).getElementsByTagName('canvas');
        const dataURL = canvas[0].toDataURL('image/png');
        zip.file(`${room.edificioname}-${room.salaname}.png`, dataURL.replace(/^data:image\/(png|jpg);base64,/, ""), {base64: true});
      });
      
      zip.generateAsync({type:"base64"}).then(function (base64) {
        a.href="data:application/zip;base64," + base64;
        a.download = 'qr_salas_utalca';
        a.click();
      });
    },
  },
  created() {
    this.loadBuildings();
  },
};
</script>
<style>

</style>
