export default {
  state: {
    loading: false,
    success: null,
    error: null
  },
  mutations: {
    setLoading (state, payload) {
      state.loading = payload;
    },
    setError (state, payload) {
      state.error = payload;
    },
    setSuccess (state, payload) {
      state.success = payload;
    },
    clearError (state) {
      state.error = null;
    },
    clearSuccess (state) {
      state.success = null;
    }
  },
  actions: {
    setLoading ({commit}, payload) {
      commit('setLoading', payload);
    },
    setError ({commit}, payload) {
      commit('setError', payload);
    },
    setSuccess ({commit}, payload) {
      commit('setSuccess', payload);
    },
    clearError ({commit}) {
      commit('clearError');
    },
    clearSuccess ({commit}) {
      commit('clearSuccess');
    }
  },
  getters: {
    loading (state) {
      return state.loading;
    },
    error (state) {
      return state.error;
    },
    success (state) {
      return state.success;
    }
  }
};
