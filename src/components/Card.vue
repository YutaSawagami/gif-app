<template>
<li>
  <div class="gif mdl-card mdl-shadow--2dp">
    <div class="mdl-card__title mdl-card--expand">
      <img :src="gif.images.fixed_height.url" alt="" @click="expand" />
    </div>
    <div class="mdl-card__actions">
      <!--<span class="filename">{{gif.slug}}</span>-->
      <p class="gif-title">{{gif.title}}</p>
      <button v-if="this.$router.currentRoute.name === 'search' " class="material-icons favorite" style="margin-left:40%"
       @click="favorite">star</button>
       <span>{{warnMessage}}</span>
       <button v-if="this.$router.currentRoute.name === 'favorites'" class="material-icons" style="margin-left:40%"
       @click.ctrl='unfavorite' id="clear">clear</button>
       <span id="delete-msg" v-if="this.$router.currentRoute.name === 'favorites'">(ctrl押しながら)</span>
    </div>
  </div>
  </li>
</template>

<script>
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
  methods: {
    favorite () {
      this.isFavorite = !this.isFavorite
      this.$store.dispatch('FAVORITE', this.gif)
    },
    unfavorite () {
      this.$store.dispatch('DELETE', this.gif)
    },
    expand () {
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
