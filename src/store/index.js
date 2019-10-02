import Vue from 'vue';
import Vuex from 'vuex';
import user from './user';
import shared from './shared';
import request from './request';
import profile from './profile';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        user, shared, request, profile
    }
});