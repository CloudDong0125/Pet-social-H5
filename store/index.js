import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    user: sessionStorage.getItem('usermessage') ? JSON.parse(sessionStorage.getItem('usermessage')) : {}
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
      sessionStorage.setItem('usermessage', JSON.stringify(user));
    }
  },
  actions: {
    fetchUser({ commit }) {
      const user = sessionStorage.getItem('usermessage') ? JSON.parse(sessionStorage.getItem('usermessage')) : {};
      commit('setUser', user);
    }
  },
  getters: {
    getUser(state) {
      return state.user;
    }
  }
});

export default store;
