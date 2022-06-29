<template>
  <div>
    <v-app-bar
      color='#65AFFF'
      dark
      dense
    >
      <v-toolbar-title class='text-center'>Dispensadores UTALCA</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn-toggle
        group
        borderless
      >
        <v-btn
          color='#65AFFF'
          depressed
          v-if='$auth.user ? $auth.user.Role === "Admin" || $auth.user.Role === "Reponedor" : false'
          to='/indevelopment'
          nuxt
        >
          Todos los QR
        </v-btn>
        <v-spacer
          v-if='$auth.user ? $auth.user.Role === "Admin" || $auth.user.Role === "Reponedor" : false'
        ></v-spacer>
        <v-spacer
          v-if='$auth.user ? $auth.user.Role === "Reponedor": false'
        ></v-spacer>
        <v-btn
          color='#65AFFF'
          depressed
          v-if='$auth.user ? $auth.user.Role === "Admin": false'
          to='/personal'
          nuxt
        >
          Personal
        </v-btn>
        <v-spacer
          v-if='$auth.user ? $auth.user.Role === "Admin": false'
        ></v-spacer>
        <v-btn
          color='#65AFFF'
          depressed
          v-if='!!$auth.user'
          to='/'
          nuxt
        >
          Gestionar edificios
        </v-btn>
        <v-spacer
          v-if='$auth.user ? $auth.user.Role === "Admin" : false'
        ></v-spacer>
      </v-btn-toggle>

      <v-spacer></v-spacer>

      <v-menu
        offset-y
        v-if='$auth.user'
      >
        <template #activator='{ on, attrs }'>

          <v-btn
            text
            color='white'
            v-bind='attrs'
            v-on='on'
            class='pl-2 pr-2'
            v-if='$auth.user'
          >

            <v-avatar
              size='30'
              class='mr-2'
            >
              <img
                src='https://cdn.vuetifyjs.com/images/john.jpg'
                alt='John'
              >
            </v-avatar>
            {{ $auth.user ? $auth.user.Username : '' }}
          </v-btn>

        </template>
        <v-list
          dense
          height='100%'
        >
        <span
          v-for='item in items'

          :key='item.title'
        >

        <v-list-item

          v-if='item.condition'
        >
          <router-link :to='item.to'>
            <v-btn
              large
              plain
              class='text-center white--text'
              color='#02B5C2'

            >
                <v-icon class='mr-1'>
                  {{ item.icon }}
                </v-icon>
               {{ item.title }}
            </v-btn>
          </router-link>
        </v-list-item>

        </span>
          <v-spacer />
          <v-list-item>
            <v-btn
              large
              plain
              class='text-center'
              color='red'
              href='/'
              @click='logOut()'
            >
              <v-icon class='mr-1'>
                mdi-logout
              </v-icon>
              Cerrar sesión
            </v-btn>
          </v-list-item>
          <v-spacer />
        </v-list>
      </v-menu>
      <v-btn
        text
        color='white'
        class='pl-2 pr-2'
        @click='$router.push("/auth/signin")'
        v-if='!$auth.user'
      >

        <v-avatar
          size='30'
          class='mr-2'
        >
          <v-icon>
            mdi-login
          </v-icon>
        </v-avatar>
        Iniciar sesión
      </v-btn>

    </v-app-bar>
  </div>
</template>


<script>
export default {
  data: () => ({
    selectedUser: '',
    Users: ['Admin', 'Reponedor', 'Utalino'],
    items: [],
  }),

  methods: {
    async logOut() {
      await this.$auth.logout();
      await this.$cookies.remove('token');
      console.log(this.$auth.user);
    },
  },
};
</script>
