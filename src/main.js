// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueMdl from 'vue-mdl'
import store from './vuex/store'
import firebase from 'firebase'
Vue.use(VueMdl)

Vue.config.productionTip = false
var firebaseConfig = {
  apiKey: 'AIzaSyBuUqcPqPIiu3kj36NIhVCFxhCcAHEyZgc',
  authDomain: 'my-gify-app.firebaseapp.com',
  databaseURL: 'https://my-gify-app.firebaseio.com',
  projectId: 'my-gify-app',
  storageBucket: 'my-gify-app.appspot.com',
  messagingSenderId: '592646222205',
  appId: '1:592646222205:web:ae71b2ca07f78a11f79c14',
  measurementId: 'G-LP69VZ9HQ3'
}
// Initialize Firebase
firebase.initializeApp(firebaseConfig)
firebase.analytics()
// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
