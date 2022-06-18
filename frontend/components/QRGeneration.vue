<template>
  <div>
    <v-card>
      <v-card-title class='justify-center'>QR de reporte:</v-card-title>
      <v-card-title class='justify-center'>
        <qrcode-vue id='qr' class-name='mx-auto' :value='qrValue' size='250'></qrcode-vue>
      </v-card-title>
      <v-card-title class='justify-center'>Link:
        {{ qrValue }}
      </v-card-title>
      <v-card-actions class='justify-center'>
        <v-btn class='toggle-button' @click="download()">
          Descargar imagen
        </v-btn>

      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import QrcodeVue from 'qrcode.vue';

export default {
  name: 'QRGeneration',
  components: { QrcodeVue },
  data: () => {
    return {
      qrValue: 'https://www.google.cl/',
    };
  },
  methods: {
    generateQRlink() {
      console.log();
      return `${process.env.NUXT_ENV_DEPLOY_LINK}/reportar?${new URLSearchParams(this.$route.query).toString()}`;
    },
    download(){
      const canvas = document.getElementById('qr').getElementsByTagName('canvas');
      console.log(this.$route.query);
      console.log(canvas);
      const a = document.createElement("a");
      a.href  = canvas[0].toDataURL('image/png');
      a.download = 'Edificio'
      a.click();
    },
  },
  mounted() {
    console.log(this.$route.query);
    console.log(this.$route.name);
    const qrLink = this.generateQRlink();
    this.qrValue = qrLink ? qrLink : 'No Link Available';
  },

};
</script>

<style scoped>
.toggle-button {
  background-color: #65AFFF !important;
  color: white !important;
}
</style>
