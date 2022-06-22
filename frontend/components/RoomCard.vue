<template>
  <v-card
    class='custom-room-card mx-auto'

  >
    <v-row justify='space-between mx-auto'>
      <v-col class='pa-2' cols='5'>
        <v-card-title
          class='justify-start room-name pa-0'
        >{{ room.Name }}
        </v-card-title>
      </v-col>
      <v-col class='pa-2'>
        <v-card-title
          class='pa-0'
          style='font-size: 0.9em; max-width: 150px'
        >{{ '3-12-1999' }}
        </v-card-title>
      </v-col>
      <v-col class='pa-2'>
        <v-card-actions class='pa-0 justify-center'>
          <div
            class='pa-3 rounded-circle d-inline-block state-circle'
            :style='{backgroundColor: this.getColor(room.State)}'
          ></div>
        </v-card-actions>
      </v-col>
    </v-row>
  </v-card>
</template>
<script>
export default {
  props: ['room'],
  methods: {
    getColor(State) {
      if (State === 0) return 'green';
      else if (State === 1) return 'yellow';
      else return 'red';
    },
  },
};
</script>

<style>
.custom-room-card {
  border-radius: 0 !important;
  box-shadow: none !important;
}

.room-name {
  font-size: 0.9em;
  word-wrap: break-word !important;
  display: inline-block !important;
  line-height: 1rem !important;
}


.v-card__text, .v-card__title {
  word-break: normal; /* maybe !important  */
}

.state-circle {
  border: 1.5px solid #CACACA !important;
}

</style>
