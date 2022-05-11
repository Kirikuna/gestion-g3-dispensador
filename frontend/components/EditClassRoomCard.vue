<template>
  <v-card class='mx-auto' fluid style='padding: 5px'>
    <v-subheader min-widht="100%"> <h1>Sala</h1> </v-subheader>
    <v-divider/>
    <v-card-text class="justify-content" style='margin-top: 10px'>
      <v-row
        align="center"
        justify="space-around"
      >
        <v-col md='12'>

          <v-text-field
            v-model='classRoomNameAux'
            label='Nombre de sala'
            clearable
          />
        </v-col>
        <v-btn small color="error" @click='deleteClassRoom'> Eliminar </v-btn>
        <v-btn small color="primary" @click='saveClassRoom'> Guardar </v-btn>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'EditClassRoom',
  props: {
    classRoomName: {
      type: String,
      default: null,
    },
  },
  data(){
    return {
      classRoomNameAux: this.classRoomName
    }
  },
  watch: {
    classRoomName() {
      this.classRoomNameAux = this.classRoomName;
    },
  },
  methods:{
    deleteClassRoom() {
      console.log('delete');
      this.$emit('dialogAction', this.classRoomName);
    },
    saveClassRoom() {
      console.log('save');
      this.$emit('dialogAction', this.classRoomName);
    },
  }
};
</script>

<style scoped>

</style>
