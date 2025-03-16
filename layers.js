define(["esri/layers/FeatureLayer", 
    "esri/layers/ImageryTileLayer",
    "esri/renderers/SimpleRenderer",
    "esri/symbols/SimpleMarkerSymbol"],
    (FeatureLayer, ImageryTileLayer, SimpleRenderer, SimpleMarkerSymbol) => {
    
    // ---------- ADD SOCIAL INFORMATIONAL DATASETS ----------
    const padusLayer = new FeatureLayer({
        url: "https://services.arcgis.com/v01gqwM5QqNysAAi/arcgis/rest/services/Manager_Name_PADUS/FeatureServer",
        title: "PADUS",
        listMode: "hide"
    });

    const wuiLayer = new ImageryTileLayer({
        url: "https://tiledimageservices.arcgis.com/P3ePLMYs2RVChkJx/arcgis/rest/services/Global_WUI_5/ImageServer",
        title: "WUI"
    });

    // ---------- ADD COGONGRASS DATASETS ----------
    const inatCogongrassLayer = new FeatureLayer({
        url: "https://services.arcgis.com/LBbVDC0hKPAnLRpO/arcgis/rest/services/iNaturalist_Cogongrass_Observations/FeatureServer",
        title: "iNaturalist Cogongrass",
        renderer: new SimpleRenderer({
            symbol: new SimpleMarkerSymbol({
                color: "red",
                size: "8px",
                outline: {
                    color: "white",
                    width: 1
                }
            })
        })
    });

    const eddmapsCogongrassLayer = new FeatureLayer({
        url: "https://services.arcgis.com/LBbVDC0hKPAnLRpO/arcgis/rest/services/EDDmapS_Cogongrass_Observations/FeatureServer",
        title: "EDDmapS Cogongrass",
        renderer: new SimpleRenderer({
            symbol: new SimpleMarkerSymbol({
                color: "blue",
                size: "8px",
                outline: {
                    color: "white",
                    width: 1
                }
            })
        })
    });

    const survey123CogongrassLayer = new FeatureLayer({
        url: "https://services.arcgis.com/LBbVDC0hKPAnLRpO/arcgis/rest/services/survey123_3f14c6513de74675844472a86bbee17f_results/FeatureServer",
        title: "survey123 Cogongrass",
        renderer: new SimpleRenderer({
            symbol: new SimpleMarkerSymbol({
                color: "green",
                size: "8px",
                outline: {
                    color: "white",
                    width: 1
                }
            })
        })
    });

    return {
        addLayers: (map) => {
            map.add(wuiLayer);
            map.add(padusLayer);
            map.add(eddmapsCogongrassLayer);
            map.add(inatCogongrassLayer);
            map.add(survey123CogongrassLayer);
        }
    };
});