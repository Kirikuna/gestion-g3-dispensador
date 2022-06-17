<template>
  <v-app id='inspire'>
    <v-content>
      <v-container
        fluid
        fill-height
      >
        <v-row
          align-center
          justify-center
        >
          <v-col
            xs12
            sm8
            md4
          >
            <v-card class='elevation-12'>
              <v-toolbar
                dark
                color='primary'
              >
                <v-toolbar-title>Iniciar Sesión</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form
                  v-model='account.valid'

                >
                  <v-text-field
                    name='login'
                    label='Nombre de usuario'
                    type='text'
                    v-model='account.username'
                    :rules='account.usernameRules'
                  ></v-text-field>
                  <v-text-field
                    id='password'
                    name='password'
                    label='Contraseña'
                    type='password'
                    v-model='account.password'
                    :rules='account.passwordRules'
                    @keydown.enter='login()'
                  ></v-text-field>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      color='primary'
                      :disabled='!account.valid'
                      @click='login()'
                    >Login
                    </v-btn>
                  </v-card-actions>
                </v-form>
              </v-card-text>

            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'signIn',
  data: () => {
    return {
      account: {
        valid: false,
        username: 'leunam',
        password: '12345',
        usernameRules: [
          v => !!v || 'El nombre de usuario es requerido',
        ],
        passwordRules: [
          v => !!v || 'La contraseña es requerida',
        ],
      },
      notification: {
        show: false,
        color: 'primary',
        message: '',
      },
    };
  },
  methods: {
    async login() {
      await this.$auth.loginWith('local', {
        data: {
          username: this.account.username,
          password: this.account.password,
        },
      })
        .then(async (data) => {
          await this.$auth.setUser(data.data.data.user);
          await this.$cookies.set('token', data.data.data.token);
          await this.$router.push('/')
        })
        .catch((error) => {
          console.log(error);
        });
    },
    notify(show, color, message) {
      this.notification.show = show;
      this.notification.color = color;
      this.notification.message = message;
    },
  },
};
</script>

<style scoped>

</style>
