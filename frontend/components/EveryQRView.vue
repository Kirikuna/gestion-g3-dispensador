<template>
  <div class='mb-10'>
    <v-row>
      <v-col cols='12' v-for='building in buildings' :key='building.id' xl='2' lg='3' md='4' sm='6'>
        <QRCard :building='building' />
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
      return this.$store.getters['buildings/getBuildings'];
    },

  },
  methods: {
    loadBuildings() {
      this.$store.dispatch('buildings/getBuildings');

    },
  },
  created() {
    this.loadBuildings();
  },
};
</script>
<style>

</style>
