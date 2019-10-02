<template>
  <v-container>
    <add-request></add-request>
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">Наименование документа</th>
            <th class="text-left">Описание заявки</th>
            <th class="text-left">Владелец</th>
            <th class="text-left">Дата создания</th>
            <th class="text-left">Дата подтверждения</th>
            <th class="text-left">Статус</th>
            <th class="text-left"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in request" :key="item.key">
            <td>{{ item.name }}</td>
            <td>{{ item.description }}</td>
            <td>{{ getUserName(item.ownerId) }}</td>
            <td>{{ item.dateCreate }}</td>
            <td>{{ item.dateConfirm }}</td>
            <td>{{ getStatus(item.state) }}</td>
            <td><v-btn class="btn-table" color="primary" :to="'/request/' + item.id"><v-icon>mdi-open-in-new</v-icon></v-btn>
                <v-btn class="btn-table" color="primary" @click="deleteRequest(item.id)"><v-icon>mdi-delete</v-icon></v-btn>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </v-container>
</template>

<script>
import AddRequest from './AddRequest';
import dictionary from '../../config/dictionary';

export default {
    name: 'MainTable',
    props: ['id'],
    components: {
      AddRequest
    },
    data () {
        return {
            descriptionRequest: null,
            nameRequest: null,
            dateCreate: '01.10.2019',
            dateConfirm: null,
            state: 1,
            search: null,
            dict: dictionary.stateDictionary,
        }
    },
    computed: {
        // Состояние загрузки
        loading () {
            return this.$store.getters.loading
        },
        // Получение заявок
        request () {
            return this.$store.getters.requests;
        },
        // Получение пользователей
        user() {
            return this.$store.getters.user;
        },
        // Получение информации о пользователе
        profiles() {
            return this.$store.getters.profiles;
        }
    },
    methods: {
        // Получение статуса
        getStatus(state) {
          return this.dict[state];
        },

        // Получение информации о пользователе
        getUserName(ownerId) {
          var profilelength = this.profiles.length;

          for (var i=0; i < profilelength; i++) {
            if (this.profiles[i].ownerId === ownerId) {
              return this.profiles[i].secondName + ' ' + this.profiles[i].nameUser + ' ' + this.profiles[i].patronymic; 
            }
          }
        },

        // Удаление заявки
        deleteRequest(id) {
          this.$store.dispatch('deleteRequest', id);
          this.$store.dispatch('fetchRequest');
        }
    },
    created() {
        // Инициализируем заявки
        this.$store.dispatch('fetchRequest');
        // Инициализируем профили пользователей
        this.$store.dispatch('fetchProfile');
    },
}
</script>

<style>
#add {
    margin: 2%;
}
#mainTable {
    margin: 2%;
    margin-top: 0; 
}
.btn-table {
  margin-right: 5px;
}
</style>