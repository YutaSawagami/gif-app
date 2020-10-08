<template>
  <div class="mdl-layout mdl-js-layout mdl-layout--fixed-header">
    <header class="mdl-layout__header">
      <div class="mdl-layout__header-row">
        <span class="mdl-layout-title">GIPHY-VUE</span>&nbsp;&nbsp;
        <router-link :to="{name: 'favorites'}" class="link" v-if="$store.state.login_user"> FAVORITE GIFS</router-link>&nbsp;&nbsp;&nbsp;
        <router-link :to="{name: 'search'}"  class="link"> SEARCH GIFS</router-link> &nbsp;&nbsp;&nbsp;
        <a @click="logout" class="log" v-if="$store.state.login_user" style="cursor: pointer;"> ログアウト </a>
        <a @click="login" class="log" v-else style="cursor: pointer;"> ログイン </a>
        <span class="user-name" v-if="$store.state.login_user">ようこそ&nbsp;{{login_user.displayName}}さん</span>
        <span class="user-name" v-else>未ログイン状態</span>
      </div>
    </header>
  </div>
</template>
<script>
import firebase from 'firebase'
import { mapGetters } from 'vuex'
export default {
  methods: {
    login () {
      this.$store.dispatch('LOGIN')
    },
    logout () {
      this.$store.dispatch('LOGOUT')
      this.$store.dispatch('DISEXPAND')
      this.$store.dispatch('CLEAN_FAVORITE_GIFS')
    }
  },
  created () { // onAuthStateChangedはsignInWithRedirectの後にトリガされる
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.$store.dispatch('SET_LOGIN_USER', user)// ログインユーザー情報をセット
      } else {
        this.$store.dispatch('DELETE_LOGIN_USER')// ログインユーザー情報を削除
      }
    })
  },
  computed: {
    ...mapGetters(['login_user'])
  }
}
</script>

<style scoped>
.mdl-layout__header-row {
  padding: 0 16px;
}
i {
  padding-right: 16px
}
.link {
  color:white;
}
.log {
  text-decoration:underline;
  text-decoration-color:white;
  color: white;
}

.title {
  margin-left: 15%;
}
.user-name {
  margin: 0 0 0 auto;
}
</style>
