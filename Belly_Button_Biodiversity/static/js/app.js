
init();

// ================================
function init() {
    // Reference dropdown menu and store in variable called 'selector'
    var selector = d3.select('#selDataset');
    
    // Fetch the JSON data
    d3.json('samples.json').then(data => {
        // Create variable to hold all the names
        var sampleNames = data.names;
        //console.log(data);

        // Modify the selector for each name
        sampleNames.forEach(sample => {
            selector
                // Add 'option' tag
                .append('option')
                // Text displayed on user interface
                .text(sample)
                // Add 'value' attribute to each tag and assign 'sample' to it
                .property('value',sample);
        });

        // Pick first name to be the default data for our graphs
        var firstSample = sampleNames[0];
                
        buildCharts(firstSample);
        buildMetadata(firstSample);
        buildGauge(firstSample);
    });
};

function optionChanged(newSample) {
    buildCharts(newSample);
    buildMetadata(newSample);
    buildGauge(newSample);
}

// Function to make the gauge chart
function buildGauge(blah) {
    d3.json('samples.json').then(data => {
        var metadata = data.metadata;
        var resultArray = metadata.filter(sampleObj => sampleObj.id == blah);
        var result = resultArray[0];
        var washFreq = result.wfreq;
        console.log("GAUGE washFreq:", washFreq);
        var data = [
            {
            domain: { x: [0, 1], y: [0, 1]},
            value: washFreq,
            title: { text: "Hand Wash Freq", font: { size: 24 } },
            type: "indicator",
            mode: "gauge+number+delta",
            delta: { reference: 9, increasing: {color: "RebeccaPurple"} },
            gauge: { 
                axis: { range: [null, 9], tickwidth: 1, tickcolor: "darkblue" }, 
                bar: { color: "darkblue" },
                bgcolor: "white",
                borderwidth: 2,
                bordercolor: "gray",
                steps: [
                    { range: [0, 1], color: "#33cca6"},
                    { range: [1, 2], color: "#33cccc" },
                    { range: [2, 3], color: "#33a6cc" },
                    { range: [3, 4], color: "#3380cc" },
                    { range: [4, 5], color: "#3359cc" },
                    { range: [5, 6], color: "#3333cc" },
                    { range: [6, 7], color: "#5933cc" },
                    { range: [7, 8], color: "#8033cc" },
                    { range: [8, 9], color: "#a633cc" } 
                        ],
                }
            }
        ];

        var layout = { 
            width: 465, 
            height: 400, 
            margin: { t: 25, r: 25, l: 25, b: 25 },
            paper_bgcolor: "black",
            font: {
                color: "darkblue",
                family: "Arial"
                }
        };
        Plotly.newPlot("gauge", data, layout);
    });
}

// Create function to populate 'Demographic Info' table
// Can build this function before creating optionChanged function
function buildMetadata(sample) {
    // Fetch the JSON data
    d3.json('samples.json').then(data => {
        // Create variable to hold all the metadata
        var metadata = data.metadata;
        console.log("metadata:", metadata);
        
        
        // DON'T UNDERSTAND WHAT'S HAPPENING IN RESULTARRAY
        var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
        
                
        // Specify the object that we want and place into variable 'result'
        // NOT FULLY SURE ON THIS ONE
        var result = resultArray[0];
        console.log("Result:", result);
        
        
        // Reference location to put metadata and place into variable 'panel'
        var panel = d3.select('#sample-metadata');
        // First empty out any data in that location
        panel.html('');

        // Go through each key:value pair, and add the text to the 'Demographic Info' table
        // 'result' is our parameter
        Object.entries(result).forEach(([key, value]) => {
            panel.append('h6').text(`${key.toUpperCase()}: ${value}`);
        });
    });
};

// Create function that will build the graphs
// While creating this function, will need to create function optionChanged first!
function buildCharts(blah) {
    // Fetch JSON data
    d3.json('samples.json').then(data => {
        // 'samples' w/in samples.json contains the data we want to make the graphs, so place that into a variable called 'samples'
        var samples = data.samples;
        console.log("samples:", samples);      
        // Within 'samples' from samples.json, find the id that matches the user input in drop down menu
        // ANSWER THIS: how does it know what the id is?  The parameter?  Where does the parameter factor in?
        var resultArray = samples.filter(sampleObj => sampleObj.id == blah);
        //console.log("resultArray:", resultArray);       
        // Pull that specific samples object out and place into a variable called 'result'
        var result = resultArray[0];
        //console.log("result:", result);
        
        // Variables to hold the various data for our charts
        var otu_ids = result.otu_ids;
        //console.log("otu_ids", otu_ids);
        var otu_labels = result.otu_labels;
        //console.log("otu_labels:", otu_labels);
        var sample_values = result.sample_values;
        //console.log("sample_values:", sample_values);

        

        // Want bar chart of top 10, highest on top
        // Need to slice and reverse
        var otu_ids_sliced = otu_ids.slice(0, 10).reverse();
        //console.log("SLICED IDS:", otu_ids_sliced);
        var otu_labels_sliced = otu_labels.slice(0, 10).reverse();
        //console.log("Sliced Labels:", otu_labels_sliced);
        var sample_values_sliced = sample_values.slice(0, 10).reverse();
        //console.log("Values Sliced:", sample_values_sliced);
        

        // BAR CHART
        var barData = [
            {
                x: sample_values_sliced,
                //y: otu_ids_sliced.map(object => object.otu_ids),
                //y: parseInt(otu_ids_sliced),
                //ylabel: otu_ids_sliced,
                // hover text
                text: otu_labels_sliced,
                name: "Bacteria Name",
                type: "bar",
                orientation: "h"
            }
        ];

        var barLayout = {
            title: "BAR TITLE"
            
        };
        Plotly.newPlot("bar", barData, barLayout);

        // BUBBLE CHART
        var bubbleLayout = {
            title: 'Bacteria Cultures Per Sample',
            margin: {t: 0 },
            hovermode: 'closest',
            xaxis: { title: 'OTU ID'},
            margin: { t: 30}
        };
        var bubbleData = [
            {
                x: otu_ids,
                y: sample_values,
                text: otu_labels,
                mode: 'markers',
                marker: {
                    size: sample_values,
                    color: otu_ids,
                    colorscale: 'Earth'
                }
            }
        ];
        Plotly.newPlot('bubble',bubbleData,bubbleLayout);
    });
}

