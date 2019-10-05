<template>
  <div id="app">
    <v-app>
      <v-navigation-drawer v-model="drawer" temporary app>
        <v-list dense>
          <v-list-item v-for="item in links" :key="item.title" :to="item.url">
            <v-list-item-action>
              <v-icon>{{item.icon}}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>{{item.title}}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item @click="onLogout">
            <v-list-item-action v-if="isUserLoggedIn">
              <v-icon>mdi-logout</v-icon>
            </v-list-item-action>
            <v-list-item-content v-if="isUserLoggedIn">
              <v-list-item-title>Выйти</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>

      </v-navigation-drawer>

      <v-app-bar app color="primary" dark>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer" class="hidden-md-and-up"></v-app-bar-nav-icon>
        <v-toolbar-title>Рога и Копыта</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items class="hidden-md-and-down">
          <v-btn v-for="item in links"
                :key="item.title"
                :to="item.url"
                text>
                <v-icon left>{{item.icon}}</v-icon>
                {{item.title}}
          </v-btn>
          {{userEmail}}
          <v-btn v-if="isUserLoggedIn"
            @click="onLogout">
            <v-icon left>mdi-logout</v-icon>
            Выйти
          </v-btn>
        </v-toolbar-items>
      </v-app-bar>

      <v-content>
        <router-view></router-view>
      </v-content>
  
      <template v-if="error">
        <v-snackbar
          :timeout="5000"
          :multi-line="true"
          @input="closeError"
          color="error"
          :value="true"
          >
            {{ error }}
          <v-btn
            color="dark"
            text
            @click.native="closeError"
          >
            Закрыть
          </v-btn>
        </v-snackbar>
      </template>

      <template v-if="success">
        <v-snackbar
          :timeout="5000"
          :multi-line="true"
          @input="closeSuccess"
          color="primary"
          :value="true"
          >
            {{ success }}
          <v-btn
            color="dark"
            text
            @click.native="closeSuccess"
          >
            Закрыть
          </v-btn>
        </v-snackbar>
      </template>

    </v-app>
  </div>
</template>

<script>

export default {
  data: () => ({
      drawer: false,
      userEmail: null
    }),
    computed: {
      error () {
        return this.$store.getters.error;
      },

      success () {
        return this.$store.getters.success;
      },

      isUserLoggedIn () {
        return this.$store.getters.isUserLoggedIn;
      },

      links () {
        if (this.isUserLoggedIn) {
          return [
            {title: 'Заявки', icon:'mdi-table', url:'/requests'},
            {title: 'Профиль', icon: 'mdi-account', url: '/profile'}
          ]
        }
        return [
        { title: 'Авторизация', icon: 'mdi-account', url: '/login' },
        { title: 'Регистрация', icon: 'mdi-lock', url: '/registration' }]
      }
    },
    methods: {
      goBack () {
        window.history.length > 1
          ? this.$router.go(-1)
          : this.$router.push('/')
      },

      onLogout () {
        this.$store.dispatch('logoutUser');
        this.$router.push('/');
      },

      closeError () {
        this.$store.dispatch('clearError');
      },

      closeSuccess () {
        this.$store.dispatch('clearSuccess');
      }
  },
};
</script>
