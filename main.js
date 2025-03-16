/* filepath: /c:/Users/torre/GISProgramming/cogongrass_occurrence/main.js */

require([
    "esri/config",
    "esri/Map",
    "esri/views/MapView",
    "esri/widgets/Locate",
    "esri/widgets/Search",
    "esri/layers/FeatureLayer",
    "esri/layers/ImageryLayer",
    "esri/widgets/Legend",
    "esri/widgets/LayerList"
], (esriConfig, Map, MapView, Locate, Search, FeatureLayer, ImageryLayer, Legend, LayerList) => {
    esriConfig.apiKey = "AAPTxy8BH1VEsoebNVZXo8HurDKwg_xacEwEedlXdUDyJ7P-7Qbg6QwjB-VtI5cUmAZMi_mWKOS0Vo0J49DRO-0J1pP0__52Rw9RjcLIXbVib3NGIPqd05v5bJLJV72gKKaZ9YkXNs7vzI0H2rf2ZDaRG0YJIXAI9DX-3IngC9SL_rzfc3EVbzlgr9obb-jV-Uwz063O_Kvrm2St2D_Eay2k0CwVj5Jd4vRShs708LiyuLs.AT1_UdS3K7WT";

    const map = new Map({
        basemap: "topo-vector"
    });

    const view = new MapView({
        container: "viewDiv",
        map: map,
        center: [-86.873290, 30.787528], // Coords for Blackwater River State Forest, FL
        zoom: 11
    });

    const locateBtn = new Locate({
        view: view
    });

    const searchWidget = new Search({
        view: view
    });

    const legend = new Legend({
        view: view
    });

    const layerList = new LayerList({
        view: view
    });
    
    // Add map widgets
    view.ui.add(layerList, "top-right");
    view.ui.add(legend, "bottom-right");
    view.ui.add(locateBtn, "top-left", 0);
    view.ui.add(searchWidget, "top-left", 1);

    // Load layers
    require(["./layers.js"], (layers) => {
        layers.addLayers(map);
    });

    // Load popups
    require(["./popups.js"], (popups) => {
        popups.addPopups(view);
    });
});