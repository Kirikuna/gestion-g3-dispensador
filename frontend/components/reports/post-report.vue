<template>
  <v-card
    class='ma-auto'
    max-width='400px'
  >
    <v-toolbar color='success' height='20px'/>

    <v-container>
      <v-row>
          <v-col cols='12'>
            <v-card-title class='justify-center'>
              <v-icon x-large>
                mdi-thumb-up-outline
              </v-icon>
            </v-card-title>

            <v-card-title class='justify-center'>
              <h2>
                ¡Gracias!
              </h2>
            </v-card-title>

            <v-card-text class='text-center'>
              Tu reporte ha sido enviado satisfactoriamente
            </v-card-text>
            </v-col>
      </v-row>

      <v-row>
        <v-col>
          <v-card-actions class='justify-center'>
            <v-btn color='success' to="/">
              Ir a Edificios
            </v-btn>
          </v-card-actions>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
export default {
  name: 'post-report',
  data(){
    return {
    }
  },
  methods:{
    selectedProblem(problem) {
      this.$emit('selectedProblem', problem);
    },
  },
};
</script>

<style scoped>
.option-card{
  cursor: pointer;
}
</style>
