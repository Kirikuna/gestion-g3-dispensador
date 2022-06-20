<template>
  <div class='mb-10'>
    <v-row
      justify='space-between'

    >
      <v-col>
        <v-row
          justify='start'
          v-if='$auth.user ? $auth.user.Role==="Admin":false'
        >
          <v-col md='4'>
            <v-btn
              class='toggle-button'
              block
              color='65AFFF'
              @click.stop='dialog = true'
            >
              Agregar edificio
            </v-btn>
            <BuildingDialog
              v-model='dialog'
              title='Agregar edificio'
              action='save'
            />
          </v-col>
          <v-col md='4'>
            <RoomDialog />
          </v-col>
        </v-row>
      </v-col>
      <v-col>
        <v-row justify='end'>
          <v-col md='5'>
            <v-select
              v-model='buildingValue'
              :items='this.buildings'
              @input='filterBuildings()'
              chips
              label='Filtrar por edificio'
              item-text='Name'
              multiple
              solo
            ></v-select>
          </v-col>
          <v-col md='5'>
            <v-select
              v-model='stateValue'
              :items='stateFilter'
              :input='filterStates()'
              chips
              label='Filtrar por estado'
              multiple
              solo
            ></v-select>
          </v-col>

        </v-row>
      </v-col>
    </v-row>
    <v-row>
      <v-col
        cols='12'
        v-for='building in filteredBuildings'
        :key='building.Name'
        md='4'
        sm='6'
      >
        <building-card :building='building' />
      </v-col>
    </v-row>
  </div>
</template>
<script>

export default {
  name: 'IndexPage',
  layout: 'default',
  data: () => {
    return {
      dialog: false,
      stateFilter: ['Disponible', 'Con problemas', 'No disponible'],
      buildingFilter: [],
      stateValue: [],
      buildingValue: [],
    };
  },
  computed: {
    buildings() {
      return this.$store.getters['buildings/getBuildings'];
    },
    filteredBuildings() {
      return this.$store.getters['buildings/getFilteredBuildings'];
    },

  },
  methods: {
    async loadBuildings() {
     await this.$store.dispatch('buildings/getBuildings');

    },
    filterBuildings() {
      console.log('filtering');
      console.log(this.buildingValue);
      if(this.buildingValue.length === 0)
        this.$store.dispatch('buildings/filterBuildings', 'all');
      else
        this.$store.dispatch('buildings/filterBuildings', this.buildingValue);

    },
    filterStates() {
    },
  },
  async beforeMount() {
    await this.loadBuildings();
    await this.filterBuildings();
    this.buildingFilter = this.buildings;
    console.log(this.buildings);
  },
};
</script>
<style>

</style>
