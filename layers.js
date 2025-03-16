define(["esri/layers/FeatureLayer"], (FeatureLayer) => {
    
    // ---------- ADD SOCIAL INFORMATIONAL DATASETS ----------
    const padusLayer = new FeatureLayer({
        url: "https://services.arcgis.com/v01gqwM5QqNysAAi/arcgis/rest/services/Manager_Name_PADUS/FeatureServer"
    });

    /*const wuiLayer = new FeatureLayer({
        url: "https://services.arcgis.com/v01gqwM5QqNysAAi/arcgis/rest/services/WUI/FeatureServer"
    });

    // ---------- ADD COGONGRASS DATASETS ----------

    const inatCogongrassLayer = new FeatureLayer({
        url: "https://services.arcgis.com/v01gqwM5QqNysAAi/arcgis/rest/services/iNaturalist_Cogongrass/FeatureServer"
    });

    const eddmapsCogongrassLayer = new FeatureLayer({
        url: "https://services.arcgis.com/v01gqwM5QqNysAAi/arcgis/rest/services/EDDMapS_Cogongrass/FeatureServer"
    });*/

    // Create feature layer of Survey123 results

    return {
        addLayers: (map) => {
            map.add(padusLayer);
            //map.add(wuiLayer);
            //map.add(inatCogongrassLayer);
            //map.add(eddmapsCogongrassLayer);
        }
    };
});