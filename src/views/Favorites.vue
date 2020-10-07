<template>

  <main class="mdl-layout__content">
    <div class="page-content">
      <br><br>
      <ul>
        <card v-for="gif in favorites" :gif="gif" :key="gif.cid"></card>
      </ul>
    </div>
    <p id="msg" v-if="favorites.length === 0">Search画面でお気に入り登録しよう！</p>
  </main>
</template>
<script>
import Card from '../components/Card'
import { mapGetters } from 'vuex'
export default {
  components: {
    Card
  },
  created () {
    this.$store.dispatch('CLEAN_FAVORITE_GIFS')
    this.$store.dispatch('FETCH_GIFS')
    console.log('created() FECTH_GIFS')
  },
  computed: {
    ...mapGetters(['favorites'])
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
</style>
