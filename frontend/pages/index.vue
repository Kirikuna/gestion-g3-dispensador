<template>
  <div>
    <BuildingsView />
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
