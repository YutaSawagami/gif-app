<template>
  <main class="mdl-layout__content" >
    <div class="page-content" ><br>
      <input-form></input-form>
          <expand-gif  v-if="this.isExpand" class="modal" ></expand-gif>
      <ul style="" id="content">
      <card v-for="gif in gifs" :gif="gif" :key="gif.index" >
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
  computed: {
    ...mapGetters(['gifs', 'expandGif', 'isExpand'])
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
