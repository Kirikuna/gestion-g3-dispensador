<template>
  <div>
    <v-card >
      <v-card-title class='justify-center'>QR de reporte: </v-card-title>
      <v-img
        class='mx-auto'
        src='https://mike42.me/blog/images/2012-02-12-bitrevis-qr-code.png'
        width="250"
        height="250"
      ></v-img>
      <v-card-title class='justify-center'>Link: dispensadores.gptech3.com/reportar?sala=sala22&edificio=edificio-verde</v-card-title>
      <v-card-actions class='justify-center'>
        <v-btn class='toggle-button'>
          Descargar imagen
        </v-btn>

      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'QRGeneration',
};
</script>

<style scoped>
.toggle-button {
  background-color: #65AFFF !important;
  color: white !important;
}
</style>
