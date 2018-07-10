require([
    "esri/widgets/Track",
    "esri/views/MapView",
    "esri/Map",
    "dojo/domReady!"
], (Track, MapView, Map) => {

    let map = new Map({
        basemap: "topo"
    });

    let view = new MapView({
        map,
        container: "viewDiv"
    });

    // Create an instance of the Track widget
    // and add it to the view's UI
    let track = new Track({
        view
    });
    view.ui.add(track, "top-left");

    // The sample will start tracking your location
    // once the view becomes ready
    view.when(() => {
        track.start();
    });
});