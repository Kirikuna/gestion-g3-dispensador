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
        <v-btn color='#65AFFF' depressed v-if='selectedUser === "Admin" || selectedUser === "Reponedor"'>
          Todos los edificios
        </v-btn>
        <v-spacer v-if='selectedUser === "Admin" || selectedUser === "Reponedor"'></v-spacer>
        <v-btn color='#65AFFF' depressed v-if='selectedUser === "Reponedor"'>
          Reportes Activos
        </v-btn>
        <v-spacer v-if='selectedUser === "Reponedor"'></v-spacer>
        <v-btn color='#65AFFF' depressed v-if='selectedUser === "Admin"'>
          Personal
        </v-btn>
        <v-spacer v-if='selectedUser === "Admin"'></v-spacer>
        <v-btn color='#65AFFF' depressed v-if='selectedUser === "Admin"'>
          Gestionar edificios
        </v-btn>
        <v-spacer v-if='selectedUser === "Admin"'></v-spacer>
      </v-btn-toggle>
      <v-spacer></v-spacer>


      <v-select
        v-model='selectedUser'
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
    selectedUser: 'Admin',
    Users: ['Admin', 'Reponedor', 'Utalino'],
  }),
};
</script>
