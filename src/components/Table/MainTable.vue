<template>
  <div>
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
                :items="documents"
                :search="search"
                :items-per-page="5"
                class="elevation-1">
            </v-data-table>
        </v-card>
  </div>
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
                text: '№ Документа',
                align: 'left',
                sortable: false,
                value: 'id',
            },
            {text: 'Владелец', value: 'owner'},
            {text: 'Дата создания', value: 'date_create'},
            {text: 'Дата подтверждения', value: 'date_confirm'}
        ],
        documents: [],
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