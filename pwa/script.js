require([
    "esri/widgets/Track",
    "esri/views/MapView",
    "esri/Map",
    "esri/Graphic",
    "esri/geometry/Point",
    "esri/widgets/Sketch/SketchViewModel",
    "esri/layers/GraphicsLayer",
    "dojo/domReady!"
], (Track, MapView, Map, Graphic, Point, SketchViewModel, GraphicsLayer) => {

    const graphicsLayer = new GraphicsLayer();

    let map = new Map({
        basemap: "satellite",
        layers: [graphicsLayer],
    });

    let view = new MapView({
        map,
        container: "viewDiv"
    });

    let sketch = new SketchViewModel({
        view,
        layer: graphicsLayer
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
        useHeadingEnabled: false,
    });
    view.ui.add(track, "top-left");

    // The sample will start tracking your location
    // once the view becomes ready
    view.when(() => {
        track.start();
    });

    track.on('track', event => {
        let point = new Point({
            longitude: event.position.coords.longitude,
            latitude: event.position.coords.latitude,
        });

        let pointGraphic = new Graphic({
            geometry: point,
            symbol: {
                type: "simple-marker", // autocasts as new SimpleMarkerSymbol()
                color: [226, 119, 40],
                outline: { // autocasts as new SimpleLineSymbol()
                    color: [255, 255, 255],
                    width: 2
                }
            },
        });

        view.graphics.add(pointGraphic);
    });
});