/* filepath: /c:/Users/torre/GISProgramming/cogongrass_occurrence/scripts.js */
require([
    "esri/config",
    "esri/Map",
    "esri/views/MapView",
    "esri/widgets/Locate",
    "esri/widgets/Search",
    "esri/layers/FeatureLayer"
  ], (esriConfig, Map, MapView, Locate, Search, FeatureLayer) => {
    esriConfig.apiKey = "AAPTxy8BH1VEsoebNVZXo8HurDKwg_xacEwEedlXdUDyJ7P-7Qbg6QwjB-VtI5cUmAZMi_mWKOS0Vo0J49DRO-0J1pP0__52Rw9RjcLIXbVib3NGIPqd05v5bJLJV72gKKaZ9YkXNs7vzI0H2rf2ZDaRG0YJIXAI9DX-3IngC9SL_rzfc3EVbzlgr9obb-jV-Uwz063O_Kvrm2St2D_Eay2k0CwVj5Jd4vRShs708LiyuLs.AT1_UdS3K7WT";
  
    const map = new Map({
      basemap: "satellite"
    });
  
    const view = new MapView({
      container: "viewDiv", // Reference to the DOM node that will contain the view
      map: map, // References the map object
      center: [-86.873290, 30.787528], // Coordinates for Blackwater River State Forest, FL
      zoom: 11
    });
  });