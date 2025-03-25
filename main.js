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
    "esri/widgets/LayerList",
    "esri/geometry/SpatialReference",
    "esri/widgets/Sketch",
    "esri/layers/GraphicsLayer"
], (esriConfig, Map, MapView, Locate, Search, FeatureLayer, Legend, Query, LayerList, SpatialReference, Sketch, GraphicsLayer) => {
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

    const legend = new Legend({
        view: view,
        container: document.createElement("div")
    });
    legend.container.classList.add("custom-legend");

    const layerList = new LayerList({
        view: view,
        container: document.createElement("div")
    });
    layerList.container.classList.add("custom-layerlist");

    // Add map widgets
    view.ui.add(layerList.container, "top-right");
    view.ui.add(legend.container, "bottom-right");
    view.ui.add(locateBtn, "top-left");

    // Graphics layer for sketching
    const graphicsLayer = new GraphicsLayer({ title: "Region of Interest" });
    map.add(graphicsLayer);

    // Sketch widget for selecting area of interest
    const sketch = new Sketch({
        view: view,
        layer: graphicsLayer,
        availableCreateTools: ["polygon", "rectangle"],
        creationMode: "update"
    });
    view.ui.add(sketch, "top-right");

    // Define the search widget before adding it to the view
    const searchWidget = new Search({
        view: view,
        includeDefaultSources: false,
        sources: []
    });
    view.ui.add(searchWidget, "top-left");

    // Load layers
    require(["./layers.js"], (layers) => {
        const [wuiLayer, padusLayer, eddmapsCogongrassLayer, inatCogongrassLayer, survey123CogongrassLayer] = layers.getLayers();

        // Define common fields for the combined layer
        const combinedFields = [
            { name: "ObjectID", alias: "ObjectID", type: "oid" },
            { name: "source", alias: "Source", type: "string" },
            { name: "reporter", alias: "Name of reporter", type: "string" },
            { name: "date", alias: "Date of observation", type: "date" }, // Set type to "date"
            { name: "url", alias: "Link to original dataset", type: "string" },
            { name: "latitude", alias: "Latitude", type: "string" },
            { name: "longitude", alias: "Longitude", type: "string" },
            { name: "comment", alias: "Comment", type: "string" },
            { name: "infestation", alias: "Infestation status", type: "string" },
            { name: "image", alias: "Image URL", type: "string" }
        ];

        // Combine features from the three layers into one
        const combinedLayer = new FeatureLayer({
            title: "Cogongrass Observations",
            source: [], // Empty source initially
            fields: combinedFields,
            objectIdField: "ObjectID",
            geometryType: "point",
            spatialReference: SpatialReference.WGS84, // Set spatial reference
            renderer: {
                type: "unique-value",
                field: "source",
                uniqueValueInfos: [
                    {
                        value: "EDDMapS",
                        symbol: {
                            type: "simple-marker",
                            color: "red",
                            size: "8px"
                        },
                        label: "EDDMapS"
                    },
                    {
                        value: "iNaturalist",
                        symbol: {
                            type: "simple-marker",
                            color: "blue",
                            size: "8px"
                        },
                        label: "iNaturalist"
                    },
                    {
                        value: "Survey123",
                        symbol: {
                            type: "simple-marker",
                            color: "green",
                            size: "8px"
                        },
                        label: "Survey123"
                    }
                ]
            }
        });

        // Function to map attributes to common fields
        function mapAttributes(attributes, source) {
            return {
                ObjectID: attributes.ObjectID || attributes.objectid,
                source: source,
                reporter: attributes.user_name || attributes.reporter || attributes.reporter_name,
                date: attributes.fixed_date || attributes.ObsDate || attributes.date_time,
                image: attributes.image_url,
                url: attributes.url,
                latitude: attributes.latitude || attributes.Latitude || attributes.please_enter_the_latitude_coord,
                longitude: attributes.longitude || attributes.Longitude || attributes.field_13,
                infestation: attributes.Status || attributes.infestation_status,
                comment: attributes.comments || attributes.description
            };
        }

        // Query features from each layer and add to the combined layer
        const query = new Query();
        query.where = "1=1";
        query.returnGeometry = true;
        query.outFields = ["*"];

        const promises = [
            eddmapsCogongrassLayer.queryFeatures(query).then(result => {
                result.features.forEach(feature => {
                    feature.attributes = mapAttributes(feature.attributes, "EDDMapS");
                });
                combinedLayer.applyEdits({ addFeatures: result.features });
            }),
            inatCogongrassLayer.queryFeatures(query).then(result => {
                result.features.forEach(feature => {
                    feature.attributes = mapAttributes(feature.attributes, "iNaturalist");
                });
                combinedLayer.applyEdits({ addFeatures: result.features });
            }),
            survey123CogongrassLayer.queryFeatures(query).then(result => {
                result.features.forEach(feature => {
                    feature.attributes = mapAttributes(feature.attributes, "Survey123");
                });
                combinedLayer.applyEdits({ addFeatures: result.features });
            })
        ];

        Promise.all(promises).then(() => {
            map.addMany([wuiLayer, padusLayer, combinedLayer]);

            // Add the search source after layers are loaded
            searchWidget.sources.push({
                layer: padusLayer,
                searchFields: ["Loc_Nm", "Loc_Mang"],
                displayField: "Loc_Nm",
                exactMatch: false,
                outFields: ["*"],
                name: "Protected Areas of the US",
                placeholder: "Search for US Protected Areas..."
            });
        });

        // Handle the search form submission
        document.getElementById("searchForm").addEventListener("submit", function(event) {
            event.preventDefault();
            const searchTerm = document.getElementById("searchInput").value;
            searchLayers(searchTerm);
        });

        function searchLayers(searchTerm) {
            const query = new Query();
            query.where = `reporter LIKE '%${searchTerm}%' OR ObjectID LIKE '%${searchTerm}%' OR date LIKE '%${searchTerm}%' OR comment LIKE '%${searchTerm}%'`;
            query.returnGeometry = true;
            query.outFields = ["*"];

            combinedLayer.queryFeatures(query).then(result => {
                displayResults(result.features);
            }).catch(error => {
                console.error("Error querying layers:", error);
            });
        }

        function displayResults(features) {
            const resultsDiv = document.getElementById("searchResults");
            resultsDiv.innerHTML = "";
            if (features.length > 0) {
                resultsDiv.style.display = "block"; // Show the results div
                features.forEach(feature => {
                    const attributes = feature.attributes;
                    const resultItem = document.createElement("div");
                    resultItem.classList.add("result-item");

                    // Create HTML content for the result item
                    const content = `
                        ID#${attributes.ObjectID} from  ${attributes.source}<br>
                        Reported by ${attributes.reporter} on ${new Date(attributes.date).toLocaleDateString()}<br>
                    `;

                    resultItem.innerHTML = content;
                    resultItem.addEventListener("click", () => {
                        view.goTo({
                            target: feature.geometry,
                            zoom: 15
                        });
                        view.popup.open({
                            features: [feature],
                            location: feature.geometry
                        });
                    });
                    resultsDiv.appendChild(resultItem);
                });
            } else {
                resultsDiv.style.display = "none"; // Hide the results div if no results
            }
        }

        // Function to summarize data and create Plotly chart
        function summarizeData(features) {
            const chartContainer = document.getElementById('chartContainer');
            if (features.length === 0) {
                chartContainer.style.display = 'none';
                return;
            }

            chartContainer.style.display = 'block';

            // Summarize data by source
            const sources = features.map(feature => feature.attributes.source);
            const sourceCounts = sources.reduce((acc, source) => {
                acc[source] = (acc[source] || 0) + 1;
                return acc;
            }, {});

            const source_data = [{
                labels: Object.keys(sourceCounts),
                values: Object.values(sourceCounts),
                type: 'pie'
            }];

            const source_layout = {
                title: 'Observations by Source',
                xaxis: { title: 'Source' },
                yaxis: { title: 'Count' },
                margin: { t: 30, l: 30, r: 30, b: 30 },
                height: 200,
                width: 200,
                showlegend: false
            };

            Plotly.newPlot('chartSourceDiv', source_data, source_layout);

            // Summarize data by year
            const years = features.map(feature => new Date(feature.attributes.date).getFullYear());
            const yearCounts = years.reduce((acc, year) => {
                acc[year] = (acc[year] || 0) + 1;
                return acc;
            }, {});

            const year_data = [{
                x: Object.keys(yearCounts),
                y: Object.values(yearCounts),
                type: 'bar'
            }];

            const year_layout = {
                title: 'Observations by Year',
                xaxis: { title: 'Year' },
                yaxis: { title: 'Count' },
                margin: { t: 30, l: 30, r: 30, b: 30 },
                height: 200,
                width: 200
            };

            Plotly.newPlot('chartYearsDiv', year_data, year_layout);
        }

        // Handle the sketch creation
        sketch.on("create", (event) => {
            if (event.state === "complete") {
                const geometry = event.graphic.geometry;
                const query = combinedLayer.createQuery();
                query.geometry = geometry;
                query.spatialRelationship = "intersects";
                query.returnGeometry = true;
                query.outFields = ["*"];

                combinedLayer.queryFeatures(query).then(result => {
                    displayResults(result.features);
                    summarizeData(result.features);
                }).catch(error => {
                    console.error("Error querying layers:", error);
                });
            }
        });

        // Load popups
        require(["./popups.js"], (popups) => {
            popups.addPopups(view, combinedLayer); // Pass the combined layer to addPopups
        });

        // Popup for PadUS
        const padusPopupTemplate = {
            title: "Protected Area: {Loc_Nm}",
            content: "This is a protected area managed by {Loc_Mang}."
        };
        padusLayer.popupTemplate = padusPopupTemplate;

    });

    // Add map widgets
    view.ui.add(layerList.container, "top-right");
    view.ui.add(legend.container, "bottom-right");
    view.ui.add(locateBtn, "top-left");
    view.ui.add(searchWidget, "top-left");

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
            viewDiv.style.width = `calc(100% - ${newWidth}px)`;
            view.resize();
        }
    }

    function stopResize() {
        isResizing = false;
        document.removeEventListener('mousemove', resize);
        document.removeEventListener('mouseup', stopResize);
    }

    // Ensure the map resizes when the window is resized
    window.addEventListener('resize', () => {
        view.resize();
    });
});