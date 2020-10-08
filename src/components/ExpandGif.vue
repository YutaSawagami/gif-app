<template>
    <div id="modal-content">
        <img id="gif" :src="expandGif[0].images.downsized.url" alt="" /><br><br>
        <p class="info"><strong>TITLE:</strong>&nbsp;{{expandGif[0].title}} </p>
        <p class="info" v-if="expandGif[0].username && expandGif.length"><strong>USER NAME:</strong>&nbsp;{{expandGif[0].username}} </p>
        <p class="info"><strong>UPLOADED DATE:</strong> &nbsp;{{expandGif[0].import_datetime | dateFormatter}}</p>
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
  },
  filters: {
    dateFormatter: function (date) {
      let year = date.substr(0, 4)
      let month = date.substr(5, 2)
      let day = date.substr(8, 2)
      return year + '/' + month + '/' + day
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
    background:white;
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
.info {
  text-align: left;
  padding-left: 160px;
  font-family: 'Courier New', Courier, monospace;
}
</style>
