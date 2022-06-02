<template>
  <v-card
    class='mx-auto'
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

    <v-row v-for='(option, index) in options' :key='index'>
      <v-col cols='12'>
        <v-card class='mx-auto option-card' :color='option.color' max-width='95%' @click.native='selectedProblem(option.problem)'>
          <v-card-title class='justify-center mb-3'>
            <v-icon large color="white darken-2"> {{ option.icon }} </v-icon> {{option.problem}}
          </v-card-title>
          <v-card-subtitle class='text-center'>
            {{ option.description }}
          </v-card-subtitle>
        </v-card>
      </v-col>
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
      options: [
        {
          problem: 'Sin Alcohol',
          description: 'El dispositivo emite ruido pero no dispensa alcohol',
          icon: 'mdi-water-alert',
          color: '#F08E8E',
        },
        {
          problem: 'Sin Batería',
          description: 'El dispositivo no emite ruido al utilizar el sensor',
          icon: 'mdi-battery-charging',
          color: '#FFC46C',
        },
        {
          problem: 'Otro problema',
          description: 'El problema no coincide con los anteriores',
          icon: 'mdi-wrench-clock',
          color: '#B1B1B1',
        },
      ],
    }
  },
  methods:{
    selectedProblem(problem) {
      this.$emit('selectedProblem', problem);
    },
  }
};
</script>

<style scoped>
  .option-card {
    cursor: pointer;
  }
</style>
