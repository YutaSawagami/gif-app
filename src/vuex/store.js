import Vuex from 'vuex'
import Vue from 'vue'
import { CHANGE_KEYWORD, SEARCH, FAVORITE, DELETE } from './mutation-types'
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
  favorites: []
}

const actions = {
  [CHANGE_KEYWORD] ({ commit }, keyword) {
    commit(CHANGE_KEYWORD, keyword)
  },
  [SEARCH] ({ commit, state }) {
    axios.get('http://api.giphy.com/v1/gifs/search?q=' + state.keyword + '&api_key=6ttGOvcMC6k2CPxvCXv1qm2ijQRzZvP7&limit=20')
      .then(response => {
        console.log(response.status) // 200
        commit(SEARCH, response.data.data)
      })
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
      }
    } else {
      commit(FAVORITE, { gif, index })
    }
  },
  [DELETE] ({ commit }, gif) {
    const index = state.favorites.indexOf(gif)
    console.log('index = ' + index)
    commit(DELETE, index)
  }
}
const mutations = {
  [CHANGE_KEYWORD] (state, keyword) {
    state.keyword = keyword
  },
  [SEARCH] (state, data) {
    state.gifs = data
  },
  [FAVORITE] (state, { gif, index }) {
    state.favorites.push(gif)
    state.gifs.splice(index, 1)
  },
  [DELETE] (state, index) {
    state.favorites.splice(index, 1)
  }
}
const getters = {
  gifs: state => state.gifs,
  favorites: state => state.favorites
}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})
