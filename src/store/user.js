import * as fb from 'firebase';

class User {
  constructor (id) {
    this.id = id;
  }
}

export default {
  state: {
    user: null
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
        commit('setUser', new User(user.uid));
        commit('setLoading', false);
      } catch (error) {
        commit('setLoading', false);
        commit('setError', error.message);
        throw error;
      }
    },
    
    // Авторизация пользователя
    async loginUser ({commit}, {email, password}) {
      try {
        const user = await fb.auth().signInWithEmailAndPassword(email, password);
        commit('setUser', new User(user.uid));
        localStorage.user = user;
        commit('setLoading', false);
      } catch (error) {
        commit('setLoading', false);
        commit('setError', error.message);
        throw error;
      }
    },

    // автоматический вход пользоватея
    autoLoginUser({commit}, payload) {
      commit('setUser', new User(payload.uid));
    },

    // Выход пользователя
    logoutUser({commit}) {
      localStorage.removeItem('user');
      fb.auth().signOut();
      commit('setUser', null);
    }
  },
  getters: {
    user (state) {
      if (state.user === null) {
        state.user = localStorage.user;
      }
      return state.user;
    },

    // state user login
    isUserLoggedIn (state) {
      return state.user.id !== null;
    }
  }
};
