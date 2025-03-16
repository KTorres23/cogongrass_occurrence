define([], () => {
    const padusPopupTemplate = {
        title: "Protected Area: {NAME}",
        content: "This is a protected area managed by {MANAGER}."
    };

    /*
    const wuiPopupTemplate = {
        title: "WUI Area: {NAME}",
        content: "This area is part of the Wildland Urban Interface."
    };

    const cogongrassPopupTemplate = {
        title: "Cogongrass Occurrence",
        content: "Reported by {REPORTER} on {DATE}."
    };
    */

    return {
        addPopups: (view) => {
            view.map.layers.forEach(layer => {
                //if (layer.title === "PADUS") {
                    layer.popupTemplate = padusPopupTemplate;
                //} else if (layer.title === "WUI") {
                    // layer.popupTemplate = wuiPopupTemplate;
                // } else if (layer.title.includes("Cogongrass")) {
                    // layer.popupTemplate = cogongrassPopupTemplate;
                // }
            });
        }
    };
});