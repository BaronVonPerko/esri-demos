require([
    "esri/views/MapView",
    "esri/Map",
    "esri/widgets/Sketch/SketchViewModel",
    "esri/Graphic",
    "esri/layers/GraphicsLayer",
    "esri/geometry/geometryEngine",
    "dojo/domReady!"
], function (
    MapView, Map,
    SketchViewModel, Graphic, GraphicsLayer,
    GeometryEngine
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
        center: [15, 65],
    });

    var sketch = new SketchViewModel({
        view: view,
        layer: graphicsLayer
    });

    view.when(() => {
        sketch.create('polygon');
    });

    sketch.on('create-complete', event => {
        let symbol = sketch.graphic.symbol;
        symbol.color = [0,0,0,0.3];

        graphicsLayer.graphics.items.forEach(existingGraphic => {
            let disjoint = GeometryEngine.disjoint(event.geometry, existingGraphic.geometry);
            if (!disjoint) {
                symbol.color = [255,0,0, 0.5];
            }
        });

        graphicsLayer.add(new Graphic({
            geometry: event.geometry,
            symbol
        }));
    });

    view.on('click', () => {
        sketch.create('polygon');
    });

});