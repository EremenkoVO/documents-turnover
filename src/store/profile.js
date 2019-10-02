import * as fb from 'firebase';

class Profile {
    constructor (nameUser, secondName, patronymic, ownerId, id=null) {
        this.nameUser = nameUser;
        this.secondName = secondName;
        this.patronymic = patronymic;
        this.ownerId = ownerId;
        this.id = id;
    
    }
}

export default {
    state: {
        profile: []
    },
    mutations: {
        setProfile (state, payload) {
            state.profile.push(payload);
        },
        loadProfiles(state, payload) {
            state.profile = payload;
        },
        updateAd (state, {nameUser, secondName, patronymic, ownerId, id}) {
            const profile = state.profile.find(a => {
              return a.id === id;
            });

            profile.nameUser = nameUser;
            profile.secondName = secondName;
            profile.patronymic = patronymic;
            profile.ownerId = ownerId;
            profile.id = id;
          }
    },
    actions: {
        // Заполнение профиля
        async setProfile({commit, getters}, payload) {
            commit('clearError');
            commit('setLoading', true);

            try {
                const newProfile = new Profile (
                    payload.nameUser,
                    payload.secondName,
                    payload.patronymic,
                    getters.user.id
                );

                const profile = fb.database().ref('profiles').push(newProfile);

                commit('setLoading', false);
                commit('setProfile', {
                    ...newProfile,
                    id: profile.key
                });

                commit('clearSuccess');
                commit('setSuccess', 'Профиль сохранен');
            }
            catch (error) {
                commit('setError', error.message);
                commit('setLoading', true);
                throw error;
            }
        },

        async updateProfile({commit}, {id, nameUser, secondName, patronymic, ownerId}) {
            commit('clearError');
            commit('setLoading', true);

            try {
                await fb.database().ref('profiles').child(id).update({
                    nameUser, 
                    secondName, 
                    patronymic, 
                    ownerId
                });

                commit('setLoading', false);
                commit('clearSuccess');
                commit('setSuccess', 'Профиль сохранен');
            }
            catch (error) {
                commit('setError', error.message);
                commit('setLoading', false);
                throw error;
            }
        },

        // Получение документов
        async fetchProfile({commit}) {
            commit('clearError');
            commit('setLoading', true);

            const resultProfile = [];

            try {
               const fbProfile = await fb.database().ref('profiles').once('value');
               const profiles = fbProfile.val();

               Object.keys(profiles).forEach(key => {
                   const profile = profiles[key];
                   resultProfile.push(
                       new Profile(profile.nameUser, profile.secondName, profile.patronymic, profile.ownerId, key)
                    );
               });

                commit('loadProfiles', resultProfile);
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
        profiles (state) {
            return state.profile;
        }
    }
};