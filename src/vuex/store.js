import Vuex from 'vuex'
import Vue from 'vue'
import firebase from 'firebase'
import { CHANGE_KEYWORD, SEARCH, FAVORITE, DELETE, EXPAND, DISEXPAND, LOGIN, LOGOUT, SET_LOGIN_USER,
  DELETE_LOGIN_USER, FETCH_GIFS } from './mutation-types'
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
  login_user: null
}

const actions = {
  [CHANGE_KEYWORD] ({ commit }, keyword) {
    commit(CHANGE_KEYWORD, keyword)
  },
  [SEARCH] ({ commit, state }) {
    axios.get('https://api.giphy.com/v1/gifs/search?q=' + state.keyword + '&api_key=6ttGOvcMC6k2CPxvCXv1qm2ijQRzZvP7&limit=52')
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
  [FAVORITE] ({ commit }, gif) {
    const index = state.gifs.indexOf(gif)
    var douboutCount = 0
    if (state.favorites.length !== 0) {
      state.favorites.forEach((favoriteGif) => {
        if (favoriteGif.id === gif.id) {
          douboutCount++
        }
      })
      if (douboutCount === 0) {
        commit(FAVORITE, { gif, index })
      } else {
        return 400
      }
    } else {
      commit(FAVORITE, { gif, index })
    }
  },
  [DELETE] ({ commit }, gif) {
    const index = state.favorites.indexOf(gif)
    console.log('index = ' + index)
    commit(DELETE, index)
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
    firebase.firestore().collection(`users/${getters.login_user.uid}/gifs`).get().then(snapshot =>
      snapshot.forEach(doc => commit(FAVORITE, doc.data())))
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
    console.log(state.expandGif.length)
  },
  [DISEXPAND] (state) {
    state.expandGif.length = 0
    console.log(state.expandGif)
  },
  [FAVORITE] (state, { gif, index }) {
    state.favorites.push(gif)
    state.gifs.splice(index, 1)
  },
  [DELETE] (state, index) {
    state.favorites.splice(index, 1)
  },
  [SET_LOGIN_USER] (state, user) {
    state.login_user = user
    console.log('mutation SET LOGINUSER')
    console.log(state.login_user)
  },
  [DELETE_LOGIN_USER] (state) {
    console.log('mutation DELETE LOGINUSER')
    state.login_user = null
  }
}
const getters = {
  gifs: state => state.gifs,
  expandGif: state => state.expandGif,
  favorites: state => state.favorites,
  keyword: state => state.keyword,
  login_user: state => state.login_user
}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})
