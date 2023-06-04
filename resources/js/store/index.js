import { createStore } from 'vuex';
import axios from 'axios';

export const store = createStore({
  state: {
    lists: [],
  },
  mutations: {
    setLists(state, lists) {
      state.lists = lists;
    },
    updateList(state, updatedList) {
      const index = state.lists.findIndex((list) => list.id === updatedList.id);
      if (index !== -1) {
        state.lists.splice(index, 1, updatedList);
      }
    },
    deleteList(state, id) {
      state.lists = state.lists.filter((list) => list.id !== id);
    },
    toggleCompleted(state, id) {
      const list = state.lists.find((item) => item.id === id);
      if (list) {
        list.completed = !list.completed;
      }
    },
  },
  actions: {
    async fetchLists({ commit }) {
      try {
        const response = await axios.get('/lists');
        commit('setLists', response.data);
      } catch (error) {
        console.error(error);
      }
    },
    async updateList({ commit }, list) {
      try {
        const response = await axios.put(`/lists/${list.id}`, list);
        commit('updateList', response.data);
        console.log('List updated successfully');
      } catch (error) {
        console.error(error);
      }
    },
    async deleteList({ commit }, id) {
      try {
        await axios.delete(`/lists/${id}`);
        commit('deleteList', id);
      } catch (error) {
        console.error(error);
      }
    },
    saveList({ commit }, payload) {
      let url = '/add-list';

      axios.post(url, payload).then((res) => {
        window.location.href = '/home';
      });
    },
  },
  getters: {
    getLists(state) {
      return state.lists;
    },
    getCompletedStatus: (state) => (id) => {
      const list = state.lists.find((item) => item.id === id);
      return list ? list.completed : false;
    },
  },
});

export default store;