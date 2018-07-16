require([
    "esri/widgets/Track",
    "esri/views/MapView",
    "esri/Map",
    "dojo/domReady!"
], function (
    Track, MapView, Map
) {

    let map = new Map({
        basemap: "streets"
    });

    let view = new MapView({
        map,
        container: "viewDiv"
    });

    // Create an instance of the Track widget
    // and add it to the view's UI
    let track = new Track({
        view,
        geolocationOptions: {
            maximumAge: 0,
            timeout: 500,
            enableHighAccuracy: true
        },
    });
    view.ui.add(track, "top-left");

    // The sample will start tracking your location
    // once the view becomes ready
    view.when(function () {
        track.start();
    });
});