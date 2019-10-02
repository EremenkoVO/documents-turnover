import * as fb from 'firebase';

class Request{
    constructor(name, description, ownerId, dateCreate, dateConfirm, state, id = null) {
        this.name = name;
        this.description = description;
        this.ownerId = ownerId;
        this.dateCreate = dateCreate;
        this.dateConfirm = dateConfirm;
        this.state = state;
        this.id = id;
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
            
            try {
                const newRequest = new Request(
                        payload.nameRequest, 
                        payload.descriptionRequest, 
                        getters.user.id,
                        payload.dateCreate,
                        payload.dateConfirm,
                        payload.state
                    );

                const request = fb.database().ref('requests').push(newRequest);

                commit('setLoading', false);
                commit('createdRequest', {
                    ...newRequest,
                    id: request.key
                });

                commit('clearSuccess');
                commit('setSuccess', 'Заявка создана');
            }
            catch (error) {
                commit('setError', error.message);
                commit('setLoading', false);
                throw error;
            }
        },

        // Получение документов
        async fetchRequest({commit}) {
            commit('clearError');
            commit('setLoading', true);

            const resultRequest = [];

            try {
               const fbVal = await fb.database().ref('requests').once('value');
               const requests = fbVal.val();

               Object.keys(requests).forEach(key => {
                   const request = requests[key];
                   resultRequest.push(
                       new Request(request.name, request.description, request.ownerId, request.dateCreate, request.dateConfirm, request.state, key)
                    );
               });

                commit('loadRequests', resultRequest);
                commit('setLoading', false);
            }
            catch (error) {
                commit('setError', error.message);
                commit('setLoading', false);
                throw error;
            }
        },

        // Удаление заявки
        async deleteRequest({commit}, payload) {
            commit('clearError');
            commit('setLoading', true);

            try {
                await fb.database().ref('requests').child(payload).remove();
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
        },

        requestById (state) {
            return requestId => {
                return state.ads.find(request => request.id === requestId);
            };
        }
    }
};