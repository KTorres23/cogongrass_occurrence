/* filepath: /c:/Users/torre/GISProgramming/cogongrass_occurrence/main.js */

require([
    "esri/config",
    "esri/Map",
    "esri/views/MapView",
    "esri/widgets/Locate",
    "esri/widgets/Search",
    "esri/layers/FeatureLayer",
    "esri/widgets/Legend",
    "esri/rest/support/Query",
    "esri/widgets/LayerList"
], (esriConfig, Map, MapView, Locate, Search, FeatureLayer, Query, Legend, LayerList) => {
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
    view.ui.add(locateBtn, "top-left");
    view.ui.add(searchWidget, "top-left");

    // Load layers
    require(["./layers.js"], (layers) => {
        const [wuiLayer, padusLayer, eddmapsCogongrassLayer, inatCogongrassLayer, survey123CogongrassLayer] = layers.getLayers();
        map.addMany([wuiLayer, padusLayer, eddmapsCogongrassLayer, inatCogongrassLayer, survey123CogongrassLayer]);

        // Handle the search form submission
        document.getElementById("searchForm").addEventListener("submit", function(event) {
            event.preventDefault();
            const searchTerm = document.getElementById("searchInput").value;
            searchLayers(searchTerm);
        });

        function searchLayers(searchTerm) {
            const query = new Query();
            query.where = `user_name LIKE '%${searchTerm}%' OR reporter LIKE '%${searchTerm}%' OR reporter_name LIKE '%${searchTerm}%'`;
            query.returnGeometry = true;
            query.outFields = ["*"];

            const promises = [eddmapsCogongrassLayer, inatCogongrassLayer, survey123CogongrassLayer].map(layer => layer.queryFeatures(query));

            Promise.all(promises).then(results => {
                const features = results.flatMap(result => result.features);
                displayResults(features);
            });
        }

        function displayResults(features) {
            const resultsDiv = document.getElementById("searchResults");
            resultsDiv.innerHTML = "";
            features.forEach(feature => {
                const attributes = feature.attributes;
                const resultItem = document.createElement("div");
                resultItem.classList.add("result-item");
                resultItem.textContent = JSON.stringify(attributes, null, 2);
                resultsDiv.appendChild(resultItem);
            });
        }
    });

    // Load popups
    require(["./popups.js"], (popups) => {
        popups.addPopups(view);
    });

    // Resizing functionality
    const resizer = document.getElementById('resizer');
    const sidebar = document.getElementById('sidebar');
    const viewDiv = document.getElementById('viewDiv');

    let isResizing = false;

    resizer.addEventListener('mousedown', (e) => {
        isResizing = true;
        document.addEventListener('mousemove', resize);
        document.addEventListener('mouseup', stopResize);
    });

    function resize(e) {
        if (isResizing) {
            const newWidth = e.clientX;
            sidebar.style.width = `${newWidth}px`;
            viewDiv.style.width = `calc(100% - ${newWidth + 10}px)`;
            view.resize();
        }
    }

    function stopResize() {
        isResizing = false;
        document.removeEventListener('mousemove', resize);
        document.removeEventListener('mouseup', stopResize);
    }
});