<template>
  <div>
    <v-card>
      <v-card-title class='justify-center'>QR de reporte:</v-card-title>
      <v-card-title class='justify-center'>
        <qrcode-vue class-name='mx-auto' :value='qrValue' size='250'></qrcode-vue>
      </v-card-title>
      <v-card-title class='justify-center'>Link:
        dispensadores.gptech3.com/reportar?sala=sala22&edificio=edificio-verde
      </v-card-title>
      <v-card-actions class='justify-center'>
        <v-btn class='toggle-button'>
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

};
</script>

<style scoped>
.toggle-button {
  background-color: #65AFFF !important;
  color: white !important;
}
</style>
