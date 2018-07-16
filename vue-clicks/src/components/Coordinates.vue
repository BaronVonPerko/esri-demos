<template>
    <div class="half">
        <h1>Coordinates Clicked</h1>

        <ul>
            <li v-for="item in coordinates" v-bind:key="item.lat + item.long">
                {{item.lat}} | {{item.long}}
            </li>
        </ul>
    </div>
</template>

<script>
export default {
  data() {
    return {
      coordinates: []
    };
  },
  mounted() {
    this.$root.$on("mapClicked", data => this.coordinates.push(data));
  }
};
</script>
