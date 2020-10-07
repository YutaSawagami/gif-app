<template>
  <main class="mdl-layout__content" >
    <div class="page-content" ><br>
      <input-form></input-form>
          <expand-gif  v-if="this.isExpand" class="modal" @disexpand="disexpand"></expand-gif>
      <ul style="" id="content">
      <card v-for="gif in gifs" :gif="gif" :key="gif.index" @expand="expand">
      </card>
      </ul>
      </div>
  </main>
</template>

<script>
import ExpandGif from './ExpandGif'
import InputForm from './InputForm'
import Card from './Card'
import { mapGetters } from 'vuex'

export default {
  components: {
    InputForm,
    Card,
    ExpandGif
  },
  data () {
    return {
      isExpand: false,
      isOpen: false
    }
  },
  methods: {
    expand () {
      console.log('expand emit')
      this.isExpand = true
    },
    disexpand () {
      this.isExpand = false
    }
  },
  computed: {
    ...mapGetters(['gifs', 'expandGif'])
  }
}
</script>

<style>
.lay {
  position: fixed;
}
  main {
    width: 100%;
    margin: 0 auto;
  }
  .sample :isExpand {
    background-color: black;
  }
  .page-content {
    display: flex;
    flex-direction: column;
  }

  ul li {
    float: left;
    margin-right: 40px;
     list-style: none;
  }

  .modal {
    visibility: visible;
    opacity: 1;
    position: fixed;
    top: 10%;
    left: 25%;
    display: block;
  }
</style>
