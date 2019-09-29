<template>
  <v-container>
      <add-document></add-document>
    <v-card>
        <v-card-title id="mainTable">
            Список документов
        <div class="flex-grow-1"></div>
            <v-text-field
                v-model="search"
                label="Поиск"
                single-line
                hide-details
            >
            <v-icon right>mdi-search</v-icon>
            </v-text-field>
            </v-card-title>
                <v-data-table
                :headers="headers"
                :items="request"
                :search="search"
                :items-per-page="5"
                class="elevation-1">
            </v-data-table>
        </v-card>
  </v-container>
</template>

<script>
import AddDocument from './AddDocument';

export default {
    name: 'MainTable',
    components: {
        AddDocument
    },
    data () {
        return {
        search: null,
        headers: [
            {
                text: '№ Заявки',
                align: 'left',
                sortable: false,
                value: 'id',
            },
            {text: 'Наименование заявки', value: 'name'},
            {text: 'Описание заявки', value: 'description'},
            {text: 'Владелец', value: 'ownerId'},
            {text: 'Дата создания', value: 'date_create'},
            {text: 'Дата подтверждения', value: 'date_confirm'},
            
        ],
        }
    },
    computed: {
        request () {
            return this.$store.getters.requests;
        },
        user() {
            return this.$store.getters.user;
        }
    }
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
</style>