<template>

  <main class="mdl-layout__content">
    <div class="page-content">
      <br><br>
       <expand-gif  v-if="this.isExpand" class="modal" @disexpand="disexpand"></expand-gif>
      <ul>
        <card v-for="gif in favorites" :gif="gif" :key="gif.cid" @expand="expand"></card>
      </ul>
    </div>
    <p id="msg" v-if="favorites.length === 0">Search画面でお気に入り登録しよう！</p>
  </main>
</template>
<script>
import ExpandGif from '../components/ExpandGif'
import Card from '../components/Card'
import { mapGetters } from 'vuex'
export default {
  components: {
    Card,
    ExpandGif
  },
  data () {
    return {
      // isExpand: false
    }
  },
  created () {
    if (!this.$store.state.login_user) {
      this.$router.push({ name: 'search' })
    } else {
      this.$store.dispatch('DISEXPAND')
      this.$store.dispatch('CLEAN_FAVORITE_GIFS')
      this.$store.dispatch('FETCH_GIFS')
      console.log('created() FECTH_GIFS')
    }
  },
  computed: {
    ...mapGetters(['favorites', 'expandGif', 'isExpand'])
  },
  methods: {
    expand () {
      console.log('expand emit')
      // this.isExpand = true
    },
    disexpand () {
      // this.isExpand = false
    }
  }
}
</script>
<style scoped>
#msg {
    margin-top: 200px;
    margin-left:250px;
    font-size: 50px;
    font-family:fantasy;
}
ul li {
    float: left;
    margin-right: 40px;
     list-style: none;
  }
.modal {
    visibility: visible;
    opacity: 1;
    position: fixed;
    top: 10%;
    left: 25%;
    display: block;
  }
</style>
