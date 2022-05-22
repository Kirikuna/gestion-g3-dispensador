<template>
  <div>
    <v-dialog
      v-model='dialog'
      width='500'
      persistent
    >
      <v-card>
        <v-card-title>
          <span class='text-h5'>{{ title }}</span>
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
          <v-btn
            color='red darken-1'
            text
            @click='delBuilding=true'
            v-if='this.building'
          >
            Eliminar
          </v-btn>
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
      <v-dialog
        v-model='delBuilding'
        persistent
        max-width='290'
      >
        <v-card>
          <v-card-title>
            {{ 'Eliminar'}}
          </v-card-title>
          <v-card-text>¿Estás seguro que deseas eliminar?</v-card-text>
          <v-card-actions>
            <v-btn
              color='blue darken-1'
              text
              @click='delBuilding=false'
              :disabled='!buildingForm.valid'

            >
              Cancelar
            </v-btn>
            <v-btn
              color='red darken-1'
              text
              @click='delBuilding=false; deleteBuilding()'
              v-if='this.building'
            >
              Eliminar
            </v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-dialog>
  </div>
</template>
<script>
export default {
  props: ['btnCaption', 'title', 'building', 'value', 'building', 'action'],
  data() {
    return {
      delBuilding: false,
      type: 'hex',
      color: '#ffffff',
      buildingForm: {

        valid: false,
        nameRules: [
          v => !!v || 'El nombre es requerido',
        ],

        building: {
          id: this.building ? this.building.id : '',
          Name: this.building ? this.building.Name : '',
          Color: this.building ? this.building.Color : '',
          Rooms: [],
        },

      },
    };
  },
  methods: {
    saveBuilding() {
      switch (this.action) {
        case 'save':
          this.$store.dispatch('buildings/addBuilding', this.buildingForm.building);
          break;
        case 'edit':
          this.$store.dispatch('buildings/editBuilding', this.buildingForm.building);
          break;
        default:
          break;
      }

      //this.$store.commit('buildings/addBuilding', this.buildingForm.building);
    },
    deleteBuilding() {
      this.$store.dispatch('buildings/deleteBuilding', this.buildingForm.building.id);
    },
  },
  computed: {
    dialog: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('input', value);
      },
    },

  },
};
</script>
<style>
.toggle-button {
  background-color: #65AFFF !important;
  color: white !important;
}
</style>
