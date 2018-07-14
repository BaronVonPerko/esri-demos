<template>
    <div class="half">
        <div id="esriMap"></div>
    </div>
</template>

<script>
import * as esriLoader from "esri-loader";

export default {
  mounted() {
    esriLoader
      .loadModules(["esri/views/MapView", "esri/WebMap"])
      .then(([MapView, Map]) => {
        const map = new Map({
          basemap: "streets"
        });

        const view = new MapView({
          map,
          container: "esriMap",
          zoom: 4,
        });

        view.on('click', event => {
            let lat = event.mapPoint.latitude;
            let long = event.mapPoint.longitude;
        });
      });
  }
};
</script>


<style scoped>
#esriMap {
  width: 100%;
  height: 100%;
}
</style>

