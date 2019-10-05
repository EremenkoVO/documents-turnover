import * as fb from 'firebase';

class User {
  constructor (id, email) {
    this.id = id;
    this.email = email;
  }
}

export default {
  state: {
    user: []
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload;
    }
  },
  actions: {
    // Регистрация пользователя
    async registerUser ({commit}, {email, password}) {
      commit('clearError');
      commit('setLoading', true);
      
      try {
        const user = await fb.auth().createUserWithEmailAndPassword(email, password);
        commit('setUser', new User(user.uid, user.email));
        commit('setLoading', false);
      } catch (error) {
        commit('setLoading', false);
        commit('setError', error.message);
        throw error;
      }
    },
    
    // Авторизация пользователя
    async loginUser ({commit}, {email, password}) {
      commit('clearError');
      commit('setLoading', true);
      try {
        const user = await fb.auth().signInWithEmailAndPassword(email, password);
        if (user.uid != null) {
          commit('setUser', new User(user.uid, user.email));
        }
        commit('setLoading', false);
      } catch (error) {
        commit('setLoading', false);
        commit('setError', error.message);
        throw error;
      }
    },

    // Автоматический вход пользоватея
    autoLoginUser({commit}, payload) {
      commit('setUser', new User(payload.uid, payload.email));
    },

    // Выход пользователя
    logoutUser({commit}) {
      fb.auth().signOut();
      commit('setUser', null);
    }
  },
  getters: {
    user (state) {
      return state.user;
    },

    // Сотояние пользователя
    isUserLoggedIn (state) {
      return state.user !== null;
    }
  }
};
