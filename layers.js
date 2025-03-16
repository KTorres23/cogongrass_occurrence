define(["esri/layers/FeatureLayer"], (FeatureLayer) => {
    
    // ---------- ADD SOCIAL INFORMATIONAL DATASETS ----------
    const padusLayer = new FeatureLayer({
        url: "https://services.arcgis.com/v01gqwM5QqNysAAi/arcgis/rest/services/Manager_Name_PADUS/FeatureServer"
    });

    const wuiLayer = new FeatureLayer({
        url: "https://tiledimageservices.arcgis.com/P3ePLMYs2RVChkJx/arcgis/rest/services/Global_WUI_5/ImageServer"
    });


    
    // ---------- ADD COGONGRASS DATASETS ----------
    const inatCogongrassLayer = new FeatureLayer({
        url: "https://services.arcgis.com/LBbVDC0hKPAnLRpO/arcgis/rest/services/iNaturalist_Cogongrass_Observations/FeatureServer"
    });

    const eddmapsCogongrassLayer = new FeatureLayer({
        url: "https://services.arcgis.com/LBbVDC0hKPAnLRpO/arcgis/rest/services/EDDmapS_Cogongrass_Observations/FeatureServer"
    });

    // Create feature layer of Survey123 results

    return {
        addLayers: (map) => {
            map.add(padusLayer);
            map.add(wuiLayer);
            map.add(inatCogongrassLayer);
            map.add(eddmapsCogongrassLayer);
        }
    };
});