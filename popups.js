define([], () => {
    // ----------  SOCIAL INFORMATIONAL DATASETS ----------
    const padusPopupTemplate = {
        title: "Protected Area: {Loc_Nm}",
        content: "This is a protected area managed by {Loc_Mang}."
    };

    // ----------  COGONGRASS DATASETS ----------
    const iNatPopupTemplate = {
        title: "Cogongrass Occurrence",
        content: "Reported by {user_name} on {fixed_date}",
        fieldInfos: [{
            fieldName: "fixed_date",
            format: {
                dateFormat: "short-date"
            }
        }]
    };
    
    const eddmapsPopupTemplate = {
        title: "Cogongrass Occurrence",
        content: "Reported by {reporter} on {ObsDate}",
        fieldInfos: [{
            fieldName: "ObsDate",
            format: {
                dateFormat: "short-date"
            }
        }]
    };

    const survey123CogongrassPopupTemplate = {
        title: "Cogongrass Survey",
        content: "Reported by {reporter_name} on {date_time}",
        fieldInfos: [{
            fieldName: "date_time",
            format: {
                dateFormat: "short-date"
            }
        }]
    };

    return {
        addPopups: (view) => {
            view.when(() => {
                view.map.layers.forEach(layer => {
                    console.log(`Checking layer: ${layer.title}`);
                    if (layer.title === "PADUS") {
                        layer.popupTemplate = padusPopupTemplate;
                        console.log(`Applied PADUS popup template to layer: ${layer.title}`);
                    } else if (layer.title === "iNaturalist Cogongrass") {
                        layer.popupTemplate = iNatPopupTemplate;
                        console.log(`Applied iNaturalist Cogongrass popup template to layer: ${layer.title}`);
                    } else if (layer.title === "EDDmapS Cogongrass") {
                        layer.popupTemplate = eddmapsPopupTemplate;
                        console.log(`Applied EDDmapS Cogongrass popup template to layer: ${layer.title}`);
                    } else if (layer.title === "survey123 Cogongrass") {
                        layer.popupTemplate = survey123CogongrassPopupTemplate;
                        console.log(`Applied survey123 Cogongrass popup template to layer: ${layer.title}`);
                    }
                });
            }).catch(err => {
                console.error("Error loading layers: ", err);
        });
    }
    };

});