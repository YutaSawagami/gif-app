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
    <p id="page-sum" v-if="favorites.length !== 0">
      <button @click="backPage" class="page-arrow">&nbsp; &lt; &nbsp;</button>
      &nbsp;&nbsp;{{currentPage}} of {{favoritePageSum}}&nbsp;&nbsp;
      <button @click="nextPage" class="page-arrow">&nbsp; &gt; &nbsp;</button>
    </p>
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
  created () {
    if (!this.$store.state.login_user) {
      this.$router.push({ name: 'search' })
    } else {
      this.$store.dispatch('DISEXPAND')
      this.$store.dispatch('CLEAN_FAVORITE_GIFS')
      this.$store.dispatch('FETCH_GIFS')
    }
  },
  computed: {
    ...mapGetters(['favorites', 'expandGif', 'isExpand', 'favoritePageSum', 'currentPage'])
  },
  methods: {
    backPage () {
      if (this.$store.state.currentPage > 1) {
        this.$store.dispatch('BACK_PAGE')
      }
    },
    nextPage () {
      if (this.favoritePageSum === this.$store.state.currentPage) {
      } else {
        this.$store.dispatch('NEXT_PAGE')
      }
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
  #page-sum {
    text-align: center;
    font-size: 20px;
  }
  .page-arrow {
    font-size: 15px;
    color:aliceblue;
    background-color: rgb(63,81,181);
    cursor: pointer;
    border-radius:30px;
  }
</style>
