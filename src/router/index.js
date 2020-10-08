import Vue from 'vue'
import Router from 'vue-router'
import Search from '@/views/Search'
import Favorites from '@/views/Favorites'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'search',
      component: Search
    },
    {
      path: '/favorites',
      name: 'favorites',
      component: Favorites
    }
  ]
})
/*
Router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!this.$store.state.login_user) {
      next({
        name: 'search',
        query: {
          redirect: to.fullPath
        }
      })
    } else {
      next()
    }
  } else {
    next()
  }
})
*/
