import Vue from 'vue'
import Vuex from 'vuex'
import ajax from '../js/api.js';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        // major: ['玄幻', '奇幻', '武侠', '仙侠', '都市', '职场', '历史', '游戏'],
        malltypebooks: [],
        ranking: {},
        books: [],
        major: '',
        backPosition: '书架'
    },
    mutations: {
        SET_MAJOR(state, value) {
            state.major = value;
        },
        INIT_MALLTYPE(state, books) {
            state.malltypebooks = books;
            console.log('maltypebooks 被设置为:', state.malltypebooks); 
        },
        SET_RANKING(state, info) {
            state.ranking = info;
            console.log('ranking 被设置为:', state.ranking);
        },
        SET_BOOKS(state, value) {
            state.books = value;
            console.log('books 被设置为:', state.books);
        },
        SET_BACKPOSITION(state, value) {
            state.backPosition = value;
            console.log('backPosition 被设置为:', state.backPosition);
        }
    },
    actions: {
    }
})