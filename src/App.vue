<template>
  <div id="app">
    <vue-header></vue-header>
    <br><br>
    <router-view/>
  </div>
</template>

<script>
import VueHeader from './components/Header'
export default {
  components: {
    VueHeader
  }
}
</script>
