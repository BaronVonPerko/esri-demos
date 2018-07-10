require([
    "esri/views/MapView",
    "esri/Map",
    "esri/widgets/Sketch/SketchViewModel",
    "esri/Graphic",
    "esri/layers/GraphicsLayer",
    "dojo/domReady!"
], function(
    MapView, Map,
    SketchViewModel, Graphic, GraphicsLayer
) {

    // GraphicsLayer to hold graphics created via sketch view model
    const graphicsLayer = new GraphicsLayer();

    const map = new Map({
        basemap: "streets",
        layers: [graphicsLayer]
    });

    const view = new MapView({
        container: "viewDiv",
        map: map,
        zoom: 9,
        center: [15,65],
    });

    var sketch = new SketchViewModel({
        view: view,
        layer: graphicsLayer
    });

    view.when(function() {
        sketch.create('polygon');
    });

    sketch.on('create-complete', function(event) {
        console.log(event);
    });

});