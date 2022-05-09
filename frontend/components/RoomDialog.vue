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
          @click='loadBuildings'
          block
        >
          Agregar sala
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class='text-h5'>Agregar sala</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-form v-model='roomForm.valid'>
                <v-col cols='12'>
                  <v-text-field
                    label='Nombre'
                    v-model='roomForm.room.Name'
                    :rules='roomForm.nameRules'
                    required
                  ></v-text-field>
                </v-col>
                <v-select
                  v-model='roomForm.building'
                  :items='roomForm.buildings'
                  item-text='Name'
                  return-object
                >
                </v-select>
                <v-col cols='12'>
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
            @click='dialog = false; saveRoom()'
            :disabled='!roomForm.valid'
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
      roomForm: {
        valid: false,
        nameRules: [
          v => !!v || 'El nombre es requerido',
        ],
        buildings: [],
        building: {},
        room: {
          Name: '',
        },

      },
    };
  },
  methods: {
    async saveRoom() {
      const room = await this.$axios.post(`${process.env.NUXT_ENV_BACKEND}/sala/add-sala`, {
        eid: this.roomForm.building.id,
        name: this.roomForm.room.Name,
      }).then((data) => {
        return data.data.data;
      }).catch((error)=>{
        console.log(error);
      });

      console.log(room);

    },
    loadBuildings() {
      this.roomForm.buildings = this.$store.getters['buildings/getBuildings'];
      console.log(this.$store.getters['buildings/getBuildings']);
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
