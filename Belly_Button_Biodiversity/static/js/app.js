
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
    });
};

function optionChanged(newSample) {
    buildCharts(newSample);
    buildMetadata(newSample);
}

// Create function to populate 'Demographic Info' table
// Can build this function before creating optionChanged function
function buildMetadata(sample) {
    // Fetch the JSON data
    d3.json('samples.json').then(data => {
        // Create variable to hold all the metadata
        var metadata = data.metadata;
        
        
        // DON'T UNDERSTAND WHAT'S HAPPENING IN RESULTARRAY
        var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
        
                
        // Specify the object that we want and place into variable 'result'
        // NOT FULLY SURE ON THIS ONE
        var result = resultArray[0];
        
        
        // Reference location to put metadata and place into variable 'panel'
        var panel = d3.select('#sample-metadata');
        // First empty out any data in that location
        panel.html('');

        // Go through each key:value pair, and add the text to the 'Demographic Info' table
        // 'result' is our parameter
        Object.entries(result).forEach(([key, value]) => {
            panel.append('h6').text(`${key.toUpperCase()}: ${value}`);
        });

        // buildGauge(result.wfreq);
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
        console.log("buildCharts resultArray:", resultArray);
        
        // Pull that specific samples object out and place into a variable called 'result'
        var result = resultArray[0];
        console.log("result:", result);
        
        
        //error somewhere here!!!

        var otu_ids = result.otu_ids;
        //console.log("otu_ids", otu_ids);
        var otu_labels = result.otu_labels;
        //console.log("otu_labels:", otu_labels);
        var sample_values = result.sample_values;
        //console.log("sample_values:", sample_values);

        // var bubbleLayout = {
        //     title: 'Vactera Cultures Per Sample',
        //     margin: {t: 0 },
        //     hovermode: 'closest',
        //     xaxis: { title: 'OTU ID'},
        //     margin: { t: 30}
        // };
        // var bubbleData = [
        //     {
        //         x: otu_ids,
        //         y: sample_values,
        //         text: otu_labels,
        //         mode: 'markers',
        //         marker: {
        //             size: sample_values,
        //             color: otu_ids,
        //             colorscale: 'Earth'
        //         }
        //     }
        // ];

        // Plotly.newPlot('bubble',bubbleData,bubbleLayout);
    });
}

