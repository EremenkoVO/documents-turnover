import * as fb from 'firebase';

class request{
    constructor(name, description, ownerId) {
        this.name = name;
        this.description = description;
        this.ownerId = ownerId;
    }
}

export default {
    state: {

    },
    mutations: {
        createdRequest(state, payload) {
            state.request.push(payload);
        },
    },
    actions: {
        // Создания заявки
        async createdRequest({commit, getters}, payload) {
            commit('clearError');
            commit('setLoading', true);
            
            try {
                const newRequest = new request(payload.nameRequest, payload.descriptionRequest, getters.user.id);
                fb.database().ref('requests').push(newRequest);
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
        request (state) {
            return state.request;
        },
        adById (state) {
            return adId => {
                return state.ads.find(ad => ad.id === adId);
            };
        }
    }
};