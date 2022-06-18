<template>
  <v-card
    class='ma-auto'
    max-width='400px'
  >
    <v-toolbar :color="colorBuilding" height='20px'/>

    <v-row>
      <v-col>
        <v-card-title class='justify-center'>
          {{ nameBuilding }}
        </v-card-title>
        <v-card-subtitle class='text-center text-h6'>
          {{ nameRoom }}
        </v-card-subtitle>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols='12'>
        <v-card class='text-center mx-auto' color='#B1B1B1' max-width='95%'>
          <v-card-title class='justify-center mb-3'>
            <v-icon large color="white darken-2"> mdi-wrench-clock </v-icon> Otro problema
          </v-card-title>
          <v-card-subtitle class='text-center'>
            Describe el problema
          </v-card-subtitle>
          <v-card max-width='80%' class='mx-auto'>
            <v-text-field 
                v-model="problem"
                single-line
                solo
                label="Problema"
                counter
                maxlength="15"
            />
          </v-card>
          <v-btn class="mt-3 mb-3" color="info" @click.native='getProblem()' :disabled='problem.length === 0'>
            Reportar
          </v-btn>
        </v-card>
      </v-col>
    </v-row>

    <v-row >
      <v-card-text class='ma-auto text-center'>
        ¿Eres parte del personal?
        <br/>
        Ingresa para solucionar
        <br/>
        <br/>
        <v-btn small color="success">
          Ingresar
        </v-btn>
      </v-card-text>
    </v-row>
    <v-row>
      
    </v-row>

  </v-card>
</template>

<script>
export default {
  name: 'select-problem',
  props: {
    nameRoom: {
      type: String,
      default: null,
    },
    nameBuilding: {
      type: String,
      default: null,
    },
    colorBuilding: {
      type: String,
      default: null,
    },
  },
  data(){
    return {
        problem: '',
    }
  },
  methods:{
    getProblem() {
      this.$emit('otherProblem', problem);
    },
  },
};
</script>

<style scoped>
</style>
