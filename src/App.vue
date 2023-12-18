<template>
  <div id="app">
    <ImageEditor />
  </div>
</template>

<script>
import ImageEditor from './components/ImageEditor.vue'
export default {
  name: 'App',
  components: { ImageEditor },
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  background-color: #313133;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: 60px;
}
</style>
