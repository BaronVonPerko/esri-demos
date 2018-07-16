<template>
  <div id="app">
    <Coordinates></Coordinates>
    <Map></Map>
  </div>
</template>

<script>

import Coordinates from './components/Coordinates';
import Map from './components/Map';

export default {
  name: 'app',
  components: {
    Coordinates,
    Map
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: flex;
  color: #2c3e50;
  margin-top: 60px;
  min-height: 600px;
}
.half {
  width: 50%;
}
</style>
