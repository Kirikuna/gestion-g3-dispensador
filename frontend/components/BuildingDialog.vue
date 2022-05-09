<template>
  <div>
    <v-dialog
      v-model='dialog'
      width='500'
      persistent
    >
      <template v-slot:activator='{ on, attrs }'>
        <v-btn
          class='toggle-button'
          v-bind='attrs'
          v-on='on'
          block
          color='65AFFF'
        >
          Agregar edificio
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class='text-h5'>Agregar edificio</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-form v-model='buildingForm.valid'>
                <v-col cols='12'>
                  <v-text-field
                    label='Nombre'
                    v-model='buildingForm.building.Name'
                    :rules='buildingForm.nameRules'
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols='12'>
                  <v-color-picker v-model='buildingForm.building.Color'></v-color-picker>
                </v-col>
              </v-form>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color='blue darken-1'
            text
            @click='dialog = false; saveBuilding()'
            :disabled='!buildingForm.valid'
          >
            Guardar
          </v-btn>
          <v-btn
            color='blue darken-1'
            text
            @click='dialog = false'
          >
            Cerrar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dialog: false,
      type: 'hex',
      color: '#ffffff',
      buildingForm: {
        valid: false,
        nameRules: [
          v => !!v || 'El nombre es requerido',
        ],

        building: {
          Name: '',
          Color: '',
          Rooms: [],
        },

      },
    };
  },
  methods: {
    saveBuilding() {
      console.log(this.color);
      this.$store.dispatch('buildings/addBuilding', this.buildingForm.building);
      //this.$store.commit('buildings/addBuilding', this.buildingForm.building);
    },
  },
};
</script>
<style>
.toggle-button{
  background-color: #65AFFF !important;
  color: white !important;
}
</style>
