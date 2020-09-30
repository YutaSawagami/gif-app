<template>
  <div class="mdl-textfield mdl-js-textfield">
    <input placeholder="キーワードを入力してね" @change="CHANGE_KEYWORD($event.target.value)" class="mdl-textfield__input" type="text" id="sample1">
    <button @click="SEARCH" class="material-icons">search</button>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import { CHANGE_KEYWORD, SEARCH } from '../../src/vuex/mutation-types'
export default {
  methods: {
    ...mapActions([CHANGE_KEYWORD, SEARCH])
  }
}
</script>

<style media="screen">
  .mdl-textfield {
    padding: 0;
    background-color: white;
    margin: 30px auto;
    width: 30%;
    display: flex;
    margin-bottom: 60px;
  }
</style>
