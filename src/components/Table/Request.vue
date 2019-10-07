<template>
  <v-container>
    <v-stepper :value="getState" alt-labels>
      <v-stepper-header>
        <v-stepper-step step="1" :complete="step(1)">Заявка заведена</v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step step="2" :complete="step(2)">Заявка на рассмотрении</v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step step="3" :complete="step(3)">Заявка на подписании</v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step step="4" :complete="step(4)">Документы подписаны</v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step step="5" :complete="step(5)">Документы оформленны</v-stepper-step>
      </v-stepper-header>
        <v-stepper-items>
          <v-stepper-content step="1">
            <v-card height="600px">
              <h3>Наименование заявки: {{request.name}}</h3>
              <h3>Описание заявки: {{request.description}}</h3>

              <div>
                <input type="file" class="btn" ref="file" @change="setFile">
              </div>

              <v-btn @click="upload">Загрузить документ</v-btn>
            </v-card>
          </v-stepper-content>

          <v-stepper-content step="2">
            <v-card height="600px">
              <v-btn :href="downloadDocument()" download target="blank">Скачать документ</v-btn>
              <v-btn @click="confirmDocument(3)">Подтвердить документ</v-btn>
            </v-card>
            
          </v-stepper-content>
          <v-stepper-content step="3">
            <v-card height="600px">
            </v-card>            
          </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </v-container>
</template>

<script>

export default {
    name: 'Request',
    props: ['id', 'user'],
    date () {
        return {
          file: [],
          status: null
        }
    },
    computed: {
      request () {
        const id = this.id
        return this.$store.getters.requestById(id);
      },

      getState () {
        return this.request.status;
      }
    },
    methods: {
      step(step) {
        return this.request.status > step;
      },

      setFile() {
        this.file = this.$refs.file.files[0];
      },

      /**
       * Загрузить документ
       */
      upload() {
        if (this.file != null) {

            const id = this.request.id;

            this.$store.dispatch('updateRequest', {
              status: '2',
              file: this.file,
              id: id
            });
        }
        else {
          this.$store.dispatch('clearError');
          this.$store.dispatch('setError', 'Загрузите файл');
        }
      },

      /**
       * Скачать документ
       */
      downloadDocument() {
        return this.request.fileSrc;
      },

      /**
       * Подтверждение документов
       */
      confirmDocument(status) {
        const id = this.request.id;

        this.$store.dispatch('updateStatusRequest', {status, id});
      }
    }
}
</script>

<style>

</style>