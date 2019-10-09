<template>
  <v-container>
    <v-stepper :value="getState" alt-labels>
      <v-stepper-header>
        <v-stepper-step step="1" :complete="step(1)">Заявка заведена</v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step step="2" :complete="step(2)">Заявка на рассмотрении</v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step step="3" :complete="step(3)">Заявка оформленна</v-stepper-step>
      </v-stepper-header>
        <v-stepper-items>
          <v-stepper-content step="1">
            <v-card height="600px">
              <h3>Наименование заявки: {{request.name}}</h3>
              <h3>Описание заявки: {{request.description}}</h3>

              <div class="mx-auto">
                <input type="file" class="btn" ref="file1" @change="setFile">
              </div>

              <v-btn @click="upload(2)">Загрузить документ</v-btn>
            </v-card>
          </v-stepper-content>

          <v-stepper-content step="2">
            <v-card height="600px">
              <h3>Наименование заявки: {{request.name}}</h3>
              <h3>Описание заявки: {{request.description}}</h3>
              <div>
                <v-btn :href="downloadDocument()" download color="warning" target="blank">Скачать документ</v-btn>
              </div>
              <div>
                <label>Загрузить подписанный документ</label>
                <div>
                  <input type="file" class="btn" ref="file2" @change="setFile">
                </div>
                <v-btn @click="upload(2)">Загрузить документ</v-btn>
              </div>
              <div>
                <v-btn @click="confirmDocument(3)" color="primary">Подтвердить документ</v-btn>
              </div>
            </v-card>
            
          </v-stepper-content>
          <v-stepper-content step="3">
            <v-card height="600px">
              <h3>Наименование заявки: {{request.name}}</h3>
              <h3>Описание заявки: {{request.description}}</h3>
              <v-btn :href="downloadDocument()" download target="blank" color="primary">Скачать готовый документ</v-btn>
            </v-card>            
          </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </v-container>
</template>

<script>
export default {
    name: 'Request',
    props: ['id'],
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
        this.file = this.$refs.file1.files[0] || this.$refs.file2.files[0];
      },

      /**
       * Загрузить документ
       */
      upload(status) {
        if (this.file != null) {

            const id = this.request.id;

            this.$store.dispatch('updateRequest', {
              status: status,
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

        if (this.file != null) {
          this.$store.dispatch('updateStatusRequest', {status, id});
        }
        else {
          this.$store.dispatch('setError', 'Необходимо загрузить подписанный документ');
        }
      }
    }
}
</script>

<style>

</style>