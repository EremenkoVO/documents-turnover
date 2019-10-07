import * as fb from 'firebase';

class Request{
    constructor(name, description, ownerId, dateCreate, dateConfirm, status, fileSrc = '', id = null) {
        this.name = name;
        this.description = description;
        this.ownerId = ownerId;
        this.dateCreate = dateCreate;
        this.dateConfirm = dateConfirm;
        this.status = status;
        this.fileSrc = fileSrc;
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
        },
        updateRequest (state, {status, file, id}) {
            const request = state.requests.find(a => {
                return a.id === id;
            });
        
            request.state = status;
            request.file = file;
        },
        setUpdateStatus(state, {status, id}) {
            const request = state.requests.find(a => {
                return a.id === id;
            });
        
            request.state = status;
        }
    },
    actions: {
        /**
         * Создание заявки
         * @param {*} commit 
         * @param {*} payload 
         */
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
                        payload.status,
                        ''
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

        /**
         * Обновление заявки
         * @param {*} commit
         * @param {*} payload 
         */
        async updateRequest({commit}, {status, file, id}) {
            commit('clearError');
            commit('setLoading', true);

            try {
                const fileExt = file.name.slice(file.name.lastIndexOf('.'));
                const fileData = await fb.storage().ref(`documents/${id}.${fileExt}`).put(file);
                const fileSrc = await fb.storage().ref().child(fileData.ref.fullPath).getDownloadURL();

                await fb.database().ref('requests').child(id).update({
                    fileSrc,
                    status
                  });

                commit('setLoading', false);
                commit('updateRequest', {status, file, id});
            }
            catch (error) {
                commit('setError', error.message);
                commit('setLoading', false);
                throw error;
            }
        },

        /**
         * Обновление статуса заявки
         * @param {*} commit
         * @param {*} payload 
         */
        async updateStatusRequest ({commit}, {status, id}) {
            commit('clearError');
            commit('setLoading', true);

            try {
                await fb.database().ref('requests').child(id).update({
                    status
                });

                commit('setLoading', false);
                commit('setUpdateStatus', {status, id});
                commit('clearSuccess');
                commit('setSuccess', 'Успешно обновленно');
            }
            catch (error) {
                commit('setError', error.message);
                commit('setLoading', false);
                throw error;
            }
        },

        /**
         * Получение заявок
         * @param {*} commit 
         */
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
                       new Request(request.name, request.description, request.ownerId, request.dateCreate, request.dateConfirm, request.status, request.fileSrc, key)
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

        /**
         * Удаление заявки
         * @param {*} commit 
         * @param {*} payload 
         */
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
                return state.requests.find(requests => requests.id === requestId);
            };
        }
    }
};