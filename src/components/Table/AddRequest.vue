<template>
  <span>
      <v-dialog
        width="500"
      >
        <template v-slot:activator="{ on }">
          <v-btn
            id="addrequest"
            color="primary"
            dark
            v-on="on"
          >
           <v-icon>mdi-plus</v-icon> Добавить заявку
          </v-btn>
        </template>
  
        <v-card>
          <v-card-title
            class="headline grey lighten-2"
            primary-title
          >
            Добавление заявки
          </v-card-title>
          <v-container>
          <v-text-field
            label="Наименование заявки"
            name="nameRequest"
            type="text"
            v-model="nameRequest"
            ></v-text-field>

            <v-textarea
                name="descriptionRequest"
                label="Описание заявки"
                v-model="descriptionRequest"
            ></v-textarea>
          </v-container>
          
        
  
          <v-divider></v-divider>
  
          <v-card-actions>
            <div class="flex-grow-1"></div>
            <v-btn
              color="primary"
              text
              @click="createdRequest()"
            >
              добавить
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
  </span>
</template>

<script>
import moment from 'moment';

moment.locale('ru');

export default {
    name: 'AddRequest',
    data() {
        return {
            descriptionRequest: null,
            nameRequest: null,
            dateCreate: moment().format('L'),
            dateConfirm: '',
            status: 1 
        }
    },
    computed: {
        loading () {
            return this.$store.getters.loading
        }
    },
    methods: {
        createdRequest() {
            const request = {
                nameRequest: this.nameRequest,
                descriptionRequest: this.descriptionRequest,
                dateCreate: this.dateCreate,
                dateConfirm: this.dateConfirm,
                status: this.status,
                fileSrc: ''
            };

            this.$store.dispatch('createdRequest', request);
        },
    }
}
</script>

<style scoped>
  #addrequest{
    margin-bottom: 15px;
    margin-right: 15px;
  }
</style>