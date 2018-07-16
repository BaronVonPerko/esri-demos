require([
    "esri/widgets/Track",
    "esri/views/MapView",
    "esri/Map",
    "dojo/domReady!"
], function(
    Track, MapView, Map
) {

    var map = new Map({
        basemap: "topo"
    });

    var view = new MapView({
        map: map,
        container: "viewDiv"
    });

    // Create an instance of the Track widget
    // and add it to the view's UI
    var track = new Track({
        view: view,
        geolocationOptions: {
            maximumAge: 0,
            timeout: 0,
            enableHighAccuracy: true
        }
    });
    view.ui.add(track, "top-left");

    // The sample will start tracking your location
    // once the view becomes ready
    view.when(function() {
        track.start();
    });
});