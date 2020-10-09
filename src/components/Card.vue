<template>
<li>
  <div class="gif mdl-card mdl-shadow--2dp">
    <div class="mdl-card__title mdl-card--expand">
      <img :src="gif.images.fixed_height.url" alt="" @click="expand" style="cursor: pointer;" />
    </div>
    <div class="mdl-card__actions">
      <p class="gif-title">{{gif.title}}</p>
      <button v-if="this.$router.currentRoute.name === 'search' && $store.state.login_user" class="material-icons favorite" style="margin-left:40%; cursor: pointer;"
       @click="favorite">star</button>
       <span>{{warnMessage}}</span>
       <button v-if="this.$router.currentRoute.name === 'favorites'" class="material-icons" style="margin-left:40%; cursor: pointer;"
       @click='unfavorite' id="clear">clear</button>
       <span id="delete-msg" v-if="this.$router.currentRoute.name === 'favorites'"></span>
    </div>
  </div>
  </li>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      isFavorite: false,
      warnMessage: ''
    }
  },
  props: {
    gif: Object
  },
  computed: {
    ...mapGetters(['favoritePageSum', 'currentPage'])
  },
  methods: {
    favorite () {
      if (confirm('お気に入り登録しますか？')) {
        this.$store.dispatch('FAVORITE', this.gif)
      }
    },
    unfavorite () {
      if (confirm('お気に入りから削除しますか？')) {
        this.$store.dispatch('DELETE', this.gif)
        if (this.favoritePageSum < this.currentPage) {
          // 削除した結果、ページ数が減り、現在のページが無くなる場合は前のページに戻るようにする
          this.$store.dispatch('BACK_PAGE')
        }
      }
    },
    expand () {
      this.$store.dispatch('DISEXPAND')
      this.$store.dispatch('EXPAND', this.gif)
      this.$emit('expand')
    }
  }
}
</script>
<style>
.gif {
  margin: 0 auto;
  width: 60%;
  display: flex;
  justify-content:space-between;
  margin-bottom: 60px;
}
.gif.mdl-card {
  width: 256px;
  height: 340px;
}
.gif> .mdl-card__actions {
  height: 300px;
  padding-bottom: 200px;
  background: rgba(0, 0, 0, 0.2);
}
.filename {
  color: #fff;
  font-size: 14px;
  font-weight: 500;
}
.favorite {
  color:olive;
}
#clear {
  color: red;
}
#delete-msg {
  font-size: 11px;
}
.gif-title {
  text-align: center;
  color: blueviolet;
  font-family: fantasy;
}
</style>
