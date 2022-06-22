<template>
  <v-card
    class='mx-auto'
  >
    <v-toolbar
      :color='building.Color'
      height='20px'
    >

    </v-toolbar>

    <v-toolbar height='100%' >
      <v-card-title
        class='justify-center d-flex ml-auto mr-auto text-center pa-0'
        style='word-break: break-word'
      >

        {{ building.Name }}
      </v-card-title>


      <v-btn
        x-small
        @click.stop='dialog=true'
        v-if='$auth.user ? $auth.user.Role==="Admin":false'
      >
        editar
      </v-btn>
      <BuildingDialog
        v-model='dialog'
        title='Editar edificio'
        action='edit'
        :building='building'

      />

    </v-toolbar>

    <v-card-text class='pa-0'>
      <v-row>
        <v-col
          cols='12'
          v-for='room in building.Rooms'
          :key='room.Name'
        >
          <room-card
            :class='$auth.user ? $auth.user.Role==="Admin" || $auth.user.Role==="Reponedor"  ? "room-card" : "":""'
            :room='room'
            @click.native='
            $auth.user ?
              $auth.user.Role==="Admin" || $auth.user.Role==="Reponedor" ?
              $router.push(
                {name: "classrooms", query: { id: room.id, bName: building.Name, bColor: building.Color}}
              )
              : ()=>{}:()=>{}
            '
          />
        </v-col>
      </v-row>
    </v-card-text>

  </v-card>
</template>

<script>
//TODO: alinear bien el boton de editar
export default {
  props: ['building'],
  data: () => {
    return { dialog: false, Rooms: [] };

  },
  methods: {
    async getRooms() {
      this.Rooms = await this.$axios.get(`${process.env.NUXT_ENV_BACKEND}/sala/get-edificio-salas/${this.building.id}`).then((data) => {
        return data.data.data;
      }).catch((error) => {
        console.log(error);
      });
    },
  },
};
</script>

<style>
.room-card {
  border: 20px black;
  cursor: pointer;
}

</style>
