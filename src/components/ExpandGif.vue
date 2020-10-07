<template>
    <div id="modal-content">
        <img id="gif" :src="expandGif[0].images.downsized.url" alt="" />
        <p><a id="modal-close" class="button-link" @click="this.disexpand">CLOSE</a></p>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['expandGif'])
  },
  methods: {
    disexpand () {
      console.log('disexpand')
      this.$store.dispatch('DISEXPAND')
      this.$emit('disexpand')
    }
  }
}
</script>
<style scoped>
#gif {
    width: 50%;
    height: 50%;
}
#modal-content{
    width:50%;
    margin:1.5em auto 0;
    position: fixed;
    padding:10px 20px;
    border:2px solid #aaa;
    background:#fff;
    z-index:2;
    text-align:center;
}
.button-link{
    color:#00f;
    text-decoration:underline;
}
.button-link:hover{
    cursor:pointer;
    color:#f00;
}
</style>
