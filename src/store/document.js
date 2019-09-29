import * as fb from 'firebase';

class Request{
    constructor(name, description, ownerId, dateCreate, dateConfirm) {
        this.name = name;
        this.description = description;
        this.ownerId = ownerId;
        this.dateCreate = dateCreate;
        this.dateConfirm = dateConfirm;
    }
}

export default {
    state: {
        requests: []
    },
    mutations: {
        createdRequest(state, payload) {
            state.requests.push(payload);
        },
        loadRequests(state, payload) {
            state.requests = payload;
        }
    },
    actions: {
        // Создания заявки
        async createdRequest({commit, getters}, payload) {
            commit('clearError');
            commit('setLoading', true);

            var dateCreate = new Date();
            
            try {
                const newRequest = new Request(
                    payload.nameRequest, 
                    payload.descriptionRequest, 
                    getters.user.id,
                    dateCreate,
                    null);

                const request = fb.database().ref('requests').push(newRequest);

                commit('setLoading', false);
                commit('createdRequest', {
                    ...newRequest,
                    id: request.key
                })
            }
            catch (error) {
                commit('setError', error.message);
                commit('setLoading', false);
                throw error;
            }
        },

        // Получение документов
        async fetchDocuments({commit}) {
            commit('clearError');
            commit('setLoading', true);

            const resultRequest = []

            try {
               const fbVal = await fb.database().ref('requests').once('value');
               const requests = fbVal.val();

               Object.keys(requests).forEach(key => {
                   const request = requests[key];
                   resultRequest.push(
                       new Request(request.name, request.description, request.ownerId, request.dateCreate, request.dateConfirm, key)
                    );
               })

                commit('loadRequests', resultRequest);
                commit('setLoading', false);
            }
            catch (error) {
                commit('setError', error.message);
                commit('setLoading', false);
                throw error;
            }
        }
    },
    getters: {
        requests (state) {
            return state.requests;
        }
    }
};