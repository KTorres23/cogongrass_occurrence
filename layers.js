define(["esri/layers/FeatureLayer"], (FeatureLayer) => {
    
    // ---------- ADD SOCIAL INFORMATIONAL DATASETS ----------
    const padusLayer = new FeatureLayer({
        url: "https://services.arcgis.com/v01gqwM5QqNysAAi/arcgis/rest/services/Manager_Name_PADUS/FeatureServer"
    });

    const wuiLayer = new ImageryLayer({
        url: "https://tiledimageservices.arcgis.com/P3ePLMYs2RVChkJx/arcgis/rest/services/Global_WUI_5/ImageServer"
    });


    
    // ---------- ADD COGONGRASS DATASETS ----------
    const inatCogongrassLayer = new FeatureLayer({
        url: "https://services.arcgis.com/LBbVDC0hKPAnLRpO/arcgis/rest/services/iNaturalist_Cogongrass_Observations/FeatureServer"
    });

    const eddmapsCogongrassLayer = new FeatureLayer({
        url: "https://services.arcgis.com/LBbVDC0hKPAnLRpO/arcgis/rest/services/EDDmapS_Cogongrass_Observations/FeatureServer"
    });

    const survey123CogongrassLayer = new FeatureLayer({
        url: "https://services.arcgis.com/LBbVDC0hKPAnLRpO/arcgis/rest/services/survey123_3f14c6513de74675844472a86bbee17f_results/FeatureServer"
    });

    return {
        addLayers: (map) => {
            map.add(padusLayer);
            map.add(wuiLayer);
            map.add(inatCogongrassLayer);
            map.add(eddmapsCogongrassLayer);
            map.add(survey123CogongrassLayer);
        }
    };
});