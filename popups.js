/*define([], () => {
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
ldName: "date_time",
            format: {
                dateFormat: "short-date"
            }
        }]
    };*/


define([], () => {
    return {
        addPopups: function(view, combinedLayer) {

            // Define the popup template
            const popupTemplate = {
                title: "Cogongrass Observation by {reporter}",
                content: `
                <b>Reported by:</b> {reporter}<br>
                <b>Date:</b> {date}<br>
                <b>Latitude:</b> {latitude}<br>
                <b>Longitude:</b> {longitude}<br>
                <b>Infestation status:</b> {infestation}<br>
                <b>Comment:</b> {comment}<br>
                <b><a href="{url}" target="_blank">{url}</a><br>
                    <span>
                        <img src="{image}" style="max-width: 100%; height: auto;" onerror="this.style.display='none'">
                        <span style="display: none;">No image available</span>
                    </span>`, 
                fieldInfos: [
                    {
                        fieldName: "date",
                        format: {
                            dateFormat: "short-date"
                        }
                    }]

            };

            // Assign the popup template to the combined layer
            combinedLayer.popupTemplate = popupTemplate;

            // Add the combined layer to the view
            view.map.add(combinedLayer);
        }
    };
});