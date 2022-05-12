<template>
  <v-card class='mx-auto' fluid style='padding: 5px'>
    <v-subheader min-widht="100%"> <h1>Sala</h1> </v-subheader>
    <v-divider/>
    <v-card-text class="justify-content" style='margin-top: 10px'>
      <v-row
        align="center"
        justify="space-around"
      >
        <v-col cols='12' class='pb-0'>

          <v-text-field
            v-model='classRoomNameAux'
            label='Nombre de sala'
            clearable
          />
        </v-col>
        <v-col cols='12' class='pa-0'>
          <v-card-actions>
            <v-btn small color="error" @click='deleteClassRoom' href='/'> Eliminar </v-btn>
            <v-spacer/>
            <v-btn small color="primary" @click='saveClassRoom'> Guardar </v-btn>
          </v-card-actions>
        </v-col>

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
    classRoomId: {
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
    async deleteClassRoom() {
      await this.$store.dispatch('buildings/deleteClassRoom', {id: this.classRoomId});
    },
    async saveClassRoom() {
      await this.$store.dispatch('buildings/updateClassRoom', {id: this.classRoomId, name: this.classRoomNameAux});
      this.$emit('dialogAction', this.classRoomNameAux);
    },
  }
};
</script>

<style scoped>

</style>
