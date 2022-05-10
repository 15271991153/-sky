<template>
  <div id="app">
    <Navbar>
     <template>
       <router-view></router-view>
     </template>
   </Navbar>
  </div>
</template>
<script>
// @ is an alias to /src
import Navbar from '@/components/Navbar/index.vue'
export default {
  name: 'Home',
  components: {
    Navbar
  }
}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin:0px;
  padding: 0px;
  width: 100%;
  height: 100%;
}
</style>
