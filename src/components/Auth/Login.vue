<template>
    <v-content>
      <v-container
        fluid
        fill-height
      >
        <v-layout
          align-center
          justify-center
        >
          <v-flex
            xs12
            sm8
            md4
          >
            <v-card class="elevation-12">
              <v-toolbar
                color="primary"
                dark
                flat
              >
                <v-toolbar-title>Авторизация</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form v-model="valid" ref="form" validation>
                  <v-text-field
                    label="Эл. почта"
                    name="email"
                    prepend-icon="mdi-account"
                    type="text"
                    v-model="email"
                    :rules="emailRules"
                  ></v-text-field>

                  <v-text-field
                    id="password"
                    label="Пароль"
                    name="password"
                    prepend-icon="mdi-key"
                    type="password"
                    v-model="password"
                    :rules="passwordRules"
                    :counter="8"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="onSubmit" :loading="loading" :disabled="!valid || loading">Войти</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
</template>

<script>
export default {
    data: () => ({
        valid: false,
        email: '',
        emailRules: [
            v => !!v || 'Требуется электронная почта',
            v => /.+@.+/.test(v) || 'Эл. почта должена быть действительной',
        ],
        password: '',
        passwordRules: [
            v => !!v || 'Требуется пароль',
            v => (v && v.length >= 8) || 'Пароль должен быть больше 8 символов'
        ]
    }),
    computed: {
      loading () {
        return this.$store.getters.loading
      }
    },
    methods: {
        onSubmit () {
            if (this.$refs.form.validate()) {
              const user = {
                  email: this.email,
                  password: this.password
              }
              this.$store.dispatch('loginUser', user)
              .then(() => {
                this.$router.push('/main');
              })
              .catch(() => {});
            }
        }
    },
    created () {
      if (this.$route.query['loginError']) {
        this.$store.dispatch('setError', 'Please log in to access this page.')
      }
    }

}
</script>

<style scoped>
</style>