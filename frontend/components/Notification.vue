<template>
  <v-snackbar
    v-model="show"
    :color="color"
    :timeout="3000"
    class="mb-16"
  >
    <b>{{message}}</b>
    <v-spacer></v-spacer>

  </v-snackbar>
</template>

<script>
export default {
  name: 'Notification',
  props: ['show', 'color', 'message']
};
</script>

<style scoped>

</style>
