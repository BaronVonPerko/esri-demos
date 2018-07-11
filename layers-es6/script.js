require([
        "esri/Map",
        "esri/views/SceneView",
        "esri/layers/TileLayer",
        "dojo/dom",
        "dojo/on",
        "dojo/domReady!"
    ],
    function(
        Map, SceneView, TileLayer, dom, on
    ) {

        /*****************************************************************
         * Create two TileLayer instances. One pointing to a
         * cached map service depicting U.S. male population and the other
         * pointing to a layer of roads and highways.
         *****************************************************************/
        var transportationLayer = new TileLayer({
            url: "https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Transportation/MapServer",
            // This property can be used to uniquely identify the layer
            id: "streets",
            visible: false
        });

        var housingLayer = new TileLayer({
            url: "https://tiles.arcgis.com/tiles/nGt4QxSblgDfeJn9/arcgis/rest/services/New_York_Housing_Density/MapServer",
            id: "ny-housing",
            opacity: 0.9
        });

        /*****************************************************************
         * Layers may be added to the map in the map's constructor
         *****************************************************************/
        var map = new Map({
            basemap: "oceans",
            layers: [housingLayer]
        });

        /*****************************************************************
         * Or they may be added to the map using map.add()
         *****************************************************************/
        map.add(transportationLayer);

        var view = new SceneView({
            container: "viewDiv",
            map: map
        });

        /*****************************************************************
         * The map handles the layers' data while the view and layer views
         * take care of renderering the layers
         *****************************************************************/
        view.on("layerview-create", function(event) {
            if (event.layer.id === "ny-housing") {
                // Explore the properties of the population layer's layer view here
                console.log("LayerView for male population created!", event.layerView);
            }
            if (event.layer.id === "streets") {
                // Explore the properties of the transportation layer's layer view here
                // Explore the properties of the transportation layer's layer view here
                console.log("LayerView for streets created!", event.layerView);
            }
        });

        /*****************************************************************
         * Layers are promises that resolve when loaded, or when all their
         * properties may be accessed. Once the population layer has loaded,
         * the view will animate to it's initial extent.
         *****************************************************************/
        view.when(function() {
            housingLayer.when(function() {
                view.goTo(housingLayer.fullExtent);
            });
        });

        var streetsLayerToggle = dom.byId("streetsLayer");

        /*****************************************************************
         * The visible property on the layer can be used to toggle the
         * layer's visibility in the view. When the visibility is turned off
         * the layer is still part of the map, which means you can access
         * its properties and perform analysis even though it isn't visible.
         *******************************************************************/
        on(streetsLayerToggle, "change", function() {
            transportationLayer.visible = streetsLayerToggle.checked;
        });
    });
