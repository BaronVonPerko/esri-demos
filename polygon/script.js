require([
    "esri/views/MapView",
    "esri/Map",
    "esri/widgets/Sketch/SketchViewModel",
    "esri/Graphic",
    "esri/layers/GraphicsLayer",
    "esri/geometry/geometryEngine",
    "dojo/domReady!"
], (MapView, Map, SketchViewModel, Graphic, GraphicsLayer, GeometryEngine) => {

    const validSymbol = createSymbol(
        [0, 170, 255, 0.8], "solid", 2, [255, 255, 255]
    );

    const invalidSymbol = createSymbol(
        [255, 0, 0], "diagonal-cross", 4, [255, 0, 0]
    );

    // GraphicsLayer to hold graphics created via sketch view model
    const graphicsLayer = new GraphicsLayer();

    const map = new Map({
        basemap: "streets",
        layers: [graphicsLayer]
    });

    const view = new MapView({
        container: "viewDiv",
        map,
        zoom: 9,
        center: [15, 65],
    });

    let sketch = new SketchViewModel({
        view,
        layer: graphicsLayer
    });

    view.when(() => {
        sketch.create('polygon');
    });

    sketch.on('create-complete', event => {
        let graphic = new Graphic({
            geometry: event.geometry,
            symbol: validSymbol,
        });

        graphicsLayer.graphics.items.forEach(existingGraphic => {
            let disjoint = GeometryEngine.disjoint(event.geometry, existingGraphic.geometry);
            if (!disjoint) {
                graphic.symbol = invalidSymbol;
            }
        });

        graphicsLayer.add(graphic);
    });

    view.on('click', (event) => {
        let isUpdate = false;
        view.hitTest(event).then(response => {
            // console.log(response.results);
            if (response.results) {
                sketch.update(response.results[0].graphic);
                isUpdate = true;
            }
        });

        if(!isUpdate) sketch.create('polygon');
    });

    function createSymbol(color, style, width, outlineColor) {
        return {
            type: "simple-fill",
            style: style,
            color: color,
            outline: {
                color: outlineColor,
                width: width
            }
        }
    }


    sketch.on("update-init", updateInit);
    sketch.on("move-start", checkGraphicUpdate);
    sketch.on("move", checkGraphicUpdate);
    sketch.on("move-complete", checkGraphicUpdate);
    sketch.on("scale-start", checkGraphicUpdate);
    sketch.on("scale", checkGraphicUpdate);
    sketch.on("scale-complete", checkGraphicUpdate);
    sketch.on("rotate-start", checkGraphicUpdate);
    sketch.on("rotate", checkGraphicUpdate);
    sketch.on("rotate-complete", checkGraphicUpdate);
    sketch.on("reshape-start", checkGraphicUpdate);
    sketch.on("reshape", checkGraphicUpdate);
    sketch.on("reshape-complete", checkGraphicUpdate);

    let editObject = null;

    function updateInit(event) {
        editObject = event.graphic;
    }

    function checkGraphicUpdate(event) {
        editObject.geometry = event.geometry;
    }

});