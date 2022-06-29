<template>
  <v-card
    class='ma-auto'
    max-width='400px'
  >
    <v-toolbar
      :color='colorBuilding'
      height='20px'
    />

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

    <v-row
      v-for='(option, index) in options'
      :key='index'
    >
      <v-col cols='12'>
        <v-card
          class='mx-auto option-card v-card--hover '
          :color='option.color'
          max-width='95%'
          @click.native='selectedProblem(option.problem)'
        >
          <v-card-title class='justify-center mb-3'>
            <v-icon
              large
              color='white darken-2'
            > {{ option.icon }}
            </v-icon>
            {{ option.problem }}
          </v-card-title>
          <v-card-subtitle class='text-center'>
            {{ option.description }}
          </v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>

    <v-row v-if='!$auth.user'>
      <v-card-text class='ma-auto text-center'>
        ¿Eres parte del personal?
        <br />
        Ingresa para solucionar
        <br />
        <br />
        <v-btn
          small
          color='success'
          @click='dialog = true'
        >
          Ingresar
        </v-btn>
      </v-card-text>
    </v-row>
    <v-dialog v-model='dialog'>
      <SignIn
        :redirect='$route'
        @closeDialog='closeDialog'
      ></SignIn>
    </v-dialog>

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
  data() {
    return {
      dialog: false,
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
    };
  },
  methods: {
    selectedProblem(problem) {
      this.$emit('selectedProblem', problem);
    },
    closeDialog(data) {
      if (data !== undefined) {
        console.log(data);
        this.dialog = data;
      }
    },
  },
};
</script>

<style scoped>
.option-card {
  cursor: pointer;
}
</style>
