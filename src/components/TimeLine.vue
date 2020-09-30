<template>
  <main class="mdl-layout__content">
    <div class="page-content"><br>
      <input-form></input-form>
      <card v-for="gif in gifs" :gif="gif" :key="gif.index"></card>
    </div>
  </main>
</template>

<script>
import InputForm from './InputForm'
import Card from './Card'
import { mapGetters } from 'vuex'

export default {
  components: {
    InputForm,
    Card
  },
  computed: {
    ...mapGetters(['gifs'])
  }
}
</script>

<style>
  main {
    width: 100%;
    margin: 0 auto;
  }
  .page-content {
    display: flex;
    flex-direction: column;
  }
</style>
