/* filepath: /c:/Users/torre/GISProgramming/cogongrass_occurrence/main.js */

require([
    "esri/config",
    "esri/Map",
    "esri/views/MapView",
    "esri/widgets/Locate",
    "esri/widgets/Search"
], (esriConfig, Map, MapView, Locate, Search) => {
    esriConfig.apiKey = "AAPTxy8BH1VEsoebNVZXo8HurDKwg_xacEwEedlXdUDyJ7P-7Qbg6QwjB-VtI5cUmAZMi_mWKOS0Vo0J49DRO-0J1pP0__52Rw9RjcLIXbVib3NGIPqd05v5bJLJV72gKKaZ9YkXNs7vzI0H2rf2ZDaRG0YJIXAI9DX-3IngC9SL_rzfc3EVbzlgr9obb-jV-Uwz063O_Kvrm2St2D_Eay2k0CwVj5Jd4vRShs708LiyuLs.AT1_UdS3K7WT";

    const map = new Map({
        basemap: "topo"
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

    // Add locate widget to the top left corner of the view
    view.ui.add(locateBtn, {
        position: "top-left",
        index: 0
    });

    // Add search widget to the top right corner of the view
    view.ui.add(searchWidget, {
        position: "top-left",
        index: 1
    });

    // Load layers
    require(["./layers"], (layers) => {
        layers.addLayers(map);
    });

    // Load popups
    require(["./popups"], (popups) => {
        popups.addPopups(view);
    });
});