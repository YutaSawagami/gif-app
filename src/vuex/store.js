import Vuex from 'vuex'
import Vue from 'vue'
import firebase from 'firebase'
import { CHANGE_KEYWORD, SEARCH, FAVORITE, DELETE, EXPAND, DISEXPAND, LOGIN, LOGOUT, SET_LOGIN_USER,
  DELETE_LOGIN_USER, FETCH_GIFS, ADD_FAVORITE_GIFS, CLEAN_FAVORITE_GIFS, NEXT_PAGE, BACK_PAGE,
  BACK_TO_DEFAULT_PAGE } from './mutation-types'
import axios from 'axios'

Vue.use(Vuex)

/* function getGIFs (query) {
  alert(query + 'でAPI検索')
  // const params = encodeURIComponent(query).replace(/%20/g, '+')
  axios.get('http://api.giphy.com/v1/gifs/search?q=' + query + '&api_key=6ttGOvcMC6k2CPxvCXv1qm2ijQRzZvP7&limit=4')
    .then(response => {
      console.log(response.data.data)
      console.log(response.status) // 200
      return response.data.data
    })
}
*/

const state = {
  keyword: '',
  gifs: [],
  favorites: [],
  expandGif: [],
  isExpand: false,
  login_user: null,
  currentPage: 1
}

const actions = {
  [CHANGE_KEYWORD] ({ commit }, keyword) {
    commit(CHANGE_KEYWORD, keyword)
  },
  [SEARCH] ({ commit, state }) {
    axios.get('https://api.giphy.com/v1/gifs/search?q=' + state.keyword + '&api_key=6ttGOvcMC6k2CPxvCXv1qm2ijQRzZvP7&limit=48')
      .then(response => {
        console.log(response.status) // 200
        commit(SEARCH, response.data.data)
      })
  },
  [EXPAND] ({ commit }, gif) {
    commit(EXPAND, gif)
  },
  [DISEXPAND] ({ commit }) {
    commit(DISEXPAND)
  },
  [FAVORITE] ({ commit, getters }, gif) {
    const index = state.gifs.indexOf(gif)
    if (getters.login_user.uid) {
      gif.favoriteDate = new Date()
      firebase.firestore().collection(`users/${getters.login_user.uid}/gifs`).doc(gif.id).set(gif)
      commit(FAVORITE, index)
    }
  },
  [DELETE] ({ commit, getters }, gif) {
    const index = state.favorites.indexOf(gif)
    if (getters.login_user.uid) {
      firebase.firestore().collection(`users/${state.login_user.uid}/gifs`).doc(gif.id).delete()
      commit(DELETE, index)
    }
  },
  [LOGIN] () {
    const GoogleAuthProvider = new firebase.auth.GoogleAuthProvider()
    firebase.auth().signInWithRedirect(GoogleAuthProvider)
  },
  [LOGOUT] () {
    firebase.auth().signOut()
  },
  [SET_LOGIN_USER] ({ commit }, user) {
    commit(SET_LOGIN_USER, user)
  },
  [DELETE_LOGIN_USER] ({ commit }) {
    commit(DELETE_LOGIN_USER)
  },
  [FETCH_GIFS] ({ getters, commit }) {
    firebase.firestore().collection(`users/${state.login_user.uid}/gifs`).orderBy('favoriteDate', 'desc').get().then(snapshot =>
      snapshot.forEach(doc => commit(ADD_FAVORITE_GIFS, doc.data()))
    )
  },
  [CLEAN_FAVORITE_GIFS] ({ commit }) {
    commit(CLEAN_FAVORITE_GIFS)
  },
  [NEXT_PAGE] ({ commit }) {
    commit(NEXT_PAGE)
  },
  [BACK_PAGE] ({ commit }) {
    if (state.currentPage > 1) {
      commit(BACK_PAGE)
    }
  },
  [BACK_TO_DEFAULT_PAGE] ({ commit }) {
    commit(BACK_TO_DEFAULT_PAGE)
  }
}
const mutations = {
  [CHANGE_KEYWORD] (state, keyword) {
    state.keyword = keyword
  },
  [SEARCH] (state, data) {
    state.gifs = data
  },
  [EXPAND] (state, gif) {
    state.expandGif.push(gif)
    console.log(gif)
    state.isExpand = true
  },
  [DISEXPAND] (state) {
    state.expandGif.length = 0
    state.isExpand = false
    console.log(state.expandGif)
  },
  [FAVORITE] (state, index) {
    state.gifs.splice(index, 1)
  },
  [DELETE] (state, index) {
    state.favorites.splice(index, 1)
  },
  [SET_LOGIN_USER] (state, user) {
    state.login_user = user
  },
  [DELETE_LOGIN_USER] (state) {
    state.login_user = null
  },
  [ADD_FAVORITE_GIFS] (state, gif) {
    state.favorites.push(gif)
  },
  [CLEAN_FAVORITE_GIFS] (state) {
    state.favorites = []
  },
  [NEXT_PAGE] (state) {
    state.currentPage += 1
  },
  [BACK_PAGE] (state) {
    state.currentPage -= 1
  },
  [BACK_TO_DEFAULT_PAGE] (state) {
    state.currentPage = 1
  }
}
const getters = {
  gifs: state => state.gifs,
  expandGif: state => state.expandGif,
  favorites: function (state) {
    var page = state.currentPage
    var firstParameter = (page - 1) * 8
    var secondParameter = page * 8
    return state.favorites.slice(firstParameter, secondParameter)
  },
  favoritePageSum: state => parseInt(state.favorites.length / 8.1) + 1,
  currentPage: state => state.currentPage,
  keyword: state => state.keyword,
  login_user: state => state.login_user,
  isExpand: state => state.isExpand
}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})
