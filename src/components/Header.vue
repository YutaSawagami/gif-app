<template>
  <div class="mdl-layout mdl-js-layout mdl-layout--fixed-header">
    <header class="mdl-layout__header">
      <div class="mdl-layout__header-row">
        <i class="material-icons">dehaze</i>
        <span class="mdl-layout-title">GIPHY-VUE</span>&nbsp;&nbsp;
        <router-link :to="{name: 'favorites'}" class="link"> FAVORITE GIFS</router-link>&nbsp;&nbsp;&nbsp;
        <router-link :to="{name: 'search'}"  class="link"> SEARCH GIFS</router-link>
  <!--  <p class="title" v-if="$router.currentRoute.name == 'search'">Search</p>
        <p class="title" v-else>Favorites</p> -->
      </div>
    </header>
  </div>
</template>
<script>
export default {
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

.title {
  margin-left: 15%;
}
</style>
