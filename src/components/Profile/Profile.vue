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
    props: ['id'],
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
            const id = this.id
            return this.$store.getters.profileById(id);
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
                patronymic: this.patronymic
            });
        },

        getProfile() {
            this.nameUser = this.profile.nameUser;
            this.secondName = this.profile.secondName;
            this.patronymic = this.profile.patronymic;
        }
    },
    mounted () {
        this.getProfile();
    },
    created() {
        this.$store.dispatch('fetchProfile');
    },
}
</script>

<style>

</style>