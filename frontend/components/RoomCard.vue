<template>
  <v-card
    class='mx-auto'
    max-width='344'
  >
    <v-row justify='space-between'>
      <v-col cols='4'>
        <v-card-title class='justify-center pa-0' style='font-size: 0.8em'>{{ room.name }}</v-card-title>
      </v-col>
      <v-col cols='4'>
        <v-card-text class='pa-0'>{{"3-12-1999"}}</v-card-text>
      </v-col>
      <v-col cols='4'>
        <v-card-actions class='pa-0 justify-center' >
            <div
              class="pa-3 rounded-circle d-inline-block"
              :style='{backgroundColor: room.available ? "green": "red"}'
            ></div>
        </v-card-actions>
      </v-col>
    </v-row>
  </v-card>
</template>
<script>
export default {
  props: ['room'],
};
</script>
