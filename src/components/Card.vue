<template>
  <div class="gif mdl-card mdl-shadow--2dp">
    <div class="mdl-card__title mdl-card--expand">
      <img :src="gif.images.fixed_height.url" alt="" />
    </div>
    <div class="mdl-card__actions">
      <!--<span class="filename">{{gif.slug}}</span>-->
      <button v-if="this.$router.currentRoute.name === 'search' " class="material-icons favorite" style="margin-left:40%"
       @click="favorite">star</button>
       <button v-if="this.$router.currentRoute.name === 'favorites'" class="material-icons" style="margin-left:40%"
       @click.ctrl='unfavorite' id="clear">clear</button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isFavorite: false
    }
  },
  props: {
    gif: Object
  },
  methods: {
    favorite () {
      this.isFavorite = !this.isFavorite
      this.$store.dispatch('FAVORITE', this.gif)
    },
    unfavorite () {
      this.$store.dispatch('DELETE', this.gif)
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
  height: 300px;
}
.gif> .mdl-card__actions {
  height: 50px;
  padding: 16px;
  background: rgba(0, 0, 0, 0.2);
}
.filename {
  color: #fff;
  font-size: 14px;
  font-weight: 500;
}
.favorite {
  color:orange;
}
#clear {
  color: red;
}
</style>
