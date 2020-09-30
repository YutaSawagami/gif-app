<template>

  <main class="mdl-layout__content">
    <div class="page-content">
        <br><br>
      <card v-for="gif in favorites" :gif="gif" :key="gif.cid"></card>
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
</style>
