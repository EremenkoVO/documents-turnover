<template>
  <v-container>
      <v-card>
          <v-container>
            <v-text-field v-model="nameUser" label="Имя"></v-text-field>
            <v-text-field v-model="secondName" label="Фамилия"></v-text-field>
            <v-text-field v-model="patronymic" label="Отчество"></v-text-field>
            <v-btn color="primary" @click="updateProfile">Сохранить</v-btn>
          </v-container>
      </v-card>
  </v-container>
</template>

<script>
export default {
    data () {
        return {
            nameUser: null,
            secondName: null,
            patronymic: null
        }
    },
    computed: {
        loading () {
            return this.$store.getters.loading;
        },
        profile () {
            return this.$store.getters.profiles;
        },
        user () {
            return this.$store.getters.user.id;
        }
    },
    methods: {
        updateProfile() {
            this.$store.dispatch('updateProfile', {
                id: this.profile.id,
                nameUser: this.nameUser,
                secondName: this.secondName,
                patronymic: this.patronymic,
                ownerId: this.profile.ownerId
            });
        },

        // Получение информации о пользователе
        getUserInfo () {
            var profileLength = this.profile.length;

            for (var i=0; i < profileLength; i++) {
                if (this.profile[i].ownerId === this.user) {
                    this.nameUser = this.profile[i].nameUser;
                    this.secondName = this.profile[i].secondName;
                    this.patronymic = this.profile[i].patronymic;
                }
            }
        }
    },
    mounted() {
        this.getUserInfo();
    },
    created() {
        this.$store.dispatch('fetchProfile');
    },
}
</script>

<style>

</style>