import Vuex from 'vuex'
import Vue from 'vue'
import { CHANGE_KEYWORD, SEARCH, FAVORITE, DELETE, EXPAND, DISEXPAND } from './mutation-types'
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
  expandGif: []
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
  }
}
const getters = {
  gifs: state => state.gifs,
  expandGif: state => state.expandGif,
  favorites: state => state.favorites,
  keyword: state => state.keyword
}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})
