<template>
  <v-app id='inspire'>
    <SignIn :redirect='"/"'></SignIn>
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
