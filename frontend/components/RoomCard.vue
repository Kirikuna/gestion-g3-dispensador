<template>
  <v-card
    class='mx-auto'
    max-width='344'
  >
    <v-row justify='space-between'>
      <v-col cols='4'>
        <v-card-title class='justify-center pa-0' style='font-size: 0.8em'>{{ room.Name }}</v-card-title>
      </v-col>
      <v-col cols='4'>
        <v-card-text class='pa-0'>{{room.Logs.Date}} {{room.Logs.Time}}</v-card-text>
      </v-col>
      <v-col cols='4'>
        <v-card-actions class='pa-0 justify-center' >
            <div
              class="pa-3 rounded-circle d-inline-block"
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
  methods:{
    getColor(State){
      if(State===0) return "green";
      else if(State===1) return "yellow";
      else return "red"
    }
  }
};
</script>
