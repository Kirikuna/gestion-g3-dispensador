<template>
  <div>
    <v-app-bar
      color='#65AFFF'
      dark
      dense
    >
      <v-toolbar-title class='text-center'>Dispensadores UTALCA</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn-toggle group borderless>
        <v-btn color='#65AFFF'
               depressed
               v-if='$store.getters["user/getUserRole"] === "Admin" || $store.getters["user/getUserRole"] === "Reponedor"'
                to='/indevelopment' nuxt>
          Todos los edificios
        </v-btn>
        <v-spacer
          v-if='$store.getters["user/getUserRole"] === "Admin" || $store.getters["user/getUserRole"] === "Reponedor"'></v-spacer>
        <v-btn color='#65AFFF'
               depressed
               v-if='$store.getters["user/getUserRole"] === "Reponedor"'>
          Reportes Activos
        </v-btn>
        <v-spacer
          v-if='$store.getters["user/getUserRole"] === "Reponedor"'></v-spacer>
        <v-btn color='#65AFFF'
               depressed
               v-if='$store.getters["user/getUserRole"] === "Admin"'
               to='/indevelopment' nuxt>
          Personal
        </v-btn>
        <v-spacer
          v-if='selectedUser === "Admin"'></v-spacer>
        <v-btn color='#65AFFF'
               depressed
               v-if='$store.getters["user/getUserRole"] === "Admin"'
               to='/' nuxt>
          Gestionar edificios
        </v-btn>
        <v-spacer
          v-if='$store.getters["user/getUserRole"] === "Admin"'></v-spacer>
      </v-btn-toggle>

      <v-spacer></v-spacer>

      <v-select
        :value="$store.getters['user/getUserRole']"
        @input='setSelected'
        :items='Users'
        label='Usuario'
        solo
        flat
        dense
        hide-details
        background-color='#65AFFF'
        style='max-width: 200px; width:10%'
      ></v-select>

    </v-app-bar>
  </div>
</template>


<script>
export default {
  data: () => ({
    selectedUser: '',
    Users: ['Admin', 'Reponedor', 'Utalino'],
  }),

  methods: {
    setSelected(value){
      this.$store.dispatch('user/setUserRole', value)
    }
  },
  beforeMount() {
    this.selectedUser = this.$store.getters['user/getUserRole'];
  }
};
</script>
