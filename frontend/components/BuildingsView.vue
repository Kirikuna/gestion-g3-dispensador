<template>
  <div>
    <v-row justify='space-between'>
      <v-col cols='4'>
        <BuildingDialog />
      </v-col>
      <v-col cols='4'>
        <RoomDialog />
      </v-col>
      <v-col cols='12' md='6'>
        <v-row>
          <v-col cols='12' md='6'>
            <v-btn>
              Filtrar por edificio
            </v-btn>
          </v-col>
          <v-col cols='12' md='6'>
            <v-btn>
              Filtrar por estado
            </v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols='12' v-for='building in buildings' :key='building.name' md='4' sm='6'>
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
    };
  },
  computed: {
    buildings() {
      return this.$store.state.buildings.buildings;
    },

  },
};
</script>
<style>

</style>
