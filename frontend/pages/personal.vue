<template>
  <v-data-table
    :headers='headers'
    :items='users'
    :search='search'
    sort-by='calories'
    class='elevation-1'
    :footer-props="{
      'items-per-page-text':'Usuarios por página',

    }"

  >
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-icon>
          mdi-account
        </v-icon>
        <v-toolbar-title>Gestión de Personal</v-toolbar-title>
        <v-text-field
          v-model='search'
          append-icon='mdi-magnify'
          label='Buscar'
          single-line
          hide-details
        ></v-text-field>
        <v-spacer></v-spacer>
        <v-dialog
          v-model='dialog'
          max-width='500px'
        >
          <template v-slot:activator='{ on, attrs }'>
            <v-btn
              color='primary'
              dark
              class='mb-2'
              v-bind='attrs'
              v-on='on'
            >
              Añadir Usuario
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class='text-h5'>{{ formTitle }}</span>
            </v-card-title>

            <v-card-text >
              <v-form v-model='formValidate.valid'>
                <v-container>
                  <v-row>
                    <v-col
                      cols='12'
                      sm='6'
                      md='4'
                    >
                      <v-text-field
                        v-model='editedItem.Firstname'
                        label='Nombre'
                        :rules='formValidate.firstnameRules'
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols='12'
                      sm='6'
                      md='4'
                    >
                      <v-text-field
                        v-model='editedItem.Lastname'
                        label='Apellido'
                        :rules='formValidate.lastnameRules'
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols='12'
                      sm='6'
                      md='4'
                    >
                      <v-text-field
                        v-model='editedItem.Username'
                        label='Nombre de Usuario'
                        :rules='formValidate.usernameRules'
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols='12'
                      sm='6'
                      md='4'
                      v-if='editedIndex === -1'
                    >
                      <v-text-field
                        v-model='editedItem.Password'
                        label='Contraseña'
                        type='password'
                        :rules='formValidate.passwordRules'
                      ></v-text-field>
                    </v-col>

                    <v-col
                      cols='12'
                      sm='6'
                      md='4'
                    >
                      <v-select
                        v-model='editedItem.Role'
                        :items="['Admin', 'Reponedor']"
                        label='Rol'
                        :rules='formValidate.roleRules'
                      ></v-select>
                    </v-col>

                  </v-row>
                </v-container>
              </v-form>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color='blue darken-1'
                text
                @click='close'
              >
                Cancelar
              </v-btn>
              <v-btn
                color='blue darken-1'
                text
                @click='save'
                :disabled='!formValidate.valid'
              >
                Guardar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog
          v-model='dialogDelete'
          max-width='500px'
        >
          <v-card>
            <v-card-title class='text-h5'>Are you sure you want to delete this item?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color='blue darken-1'
                text
                @click='closeDelete'
              >Cancel
              </v-btn>
              <v-btn
                color='blue darken-1'
                text
                @click='deleteItemConfirm'
              >OK
              </v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.Actions='{ item }'>
      <v-btn
        color='primary'
        @click='editItem(item)'
      >
        Editar
      </v-btn>

    </template>
    <template v-slot:no-data>
      No hay usuarios
    </template>
  </v-data-table>
</template>

<script>
export default {
  data: () => ({
    search: '',
    dialog: false,
    dialogDelete: false,
    headers: [
      { text: 'Nombre', value: 'Firstname' },
      { text: 'Apellido', value: 'Lastname' },
      { text: 'Nombre de Usuario', value: 'Username' },
      { text: 'Rol', value: 'Role' },
      { text: 'Acciones', value: 'Actions', sortable: false },
    ],
    editedIndex: -1,
    editedItem: {
      Firstname: '',
      Lastname: '',
      Username: '',
      Password: '',
      Role: '',
    },
    defaultItem: {
      Firstname: '',
      Lastname: '',
      Username: '',
      Password: '',
      Role: '',
    },

    formValidate: {
      valid: false,
      firstnameRules: [
        v => !!v || 'El nombre es requerido',
      ],
      lastnameRules: [
        v => !!v || 'El apellido es requerido',
      ],
      usernameRules: [
        v => !!v || 'El nombre de usuario es requerido',
      ],
      passwordRules: [
        v => !!v || 'La contraseña es requerida',
      ],
      roleRules: [
        v => !!v || 'El rol es requerido',
      ],

    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'Añadir Usuario' : 'Editar Usuario';
    },

    users() {
      return this.$store.getters['users/getUsers'];
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  created() {
    this.initialize();
  },

  methods: {
    async initialize() {
      await this.$store.dispatch('users/getUsers');
    },

    editItem(item) {
      this.editedIndex = this.users.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.users.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.users.splice(this.editedIndex, 1);
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {
        this.$store.dispatch('users/updateUser', this.editedItem);
      } else {
        this.$store.dispatch('users/registerUser', this.editedItem);
      }
      this.close();
    },
  },
};
</script>

<style scoped>

</style>
