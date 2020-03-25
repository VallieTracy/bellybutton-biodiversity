
init();

// ================================
function init() {
    // Reference dropdown menu and store in variable called 'selector'
    var selector = d3.select('#selDataset');
    
    // Fetch the JSON data
    d3.json('samples.json').then(data => {
        // Create variable to hold all the names
        var sampleNames = data.names;
        // console.log(data);

        // Modify the selector for each name
        sampleNames.forEach(sample => {
            selector
                // Add 'option' tag
                .append('option')
                // Text displayed on user interface
                .text(sample)
                // Add 'value' to each tag and assign 'sample' to it
                .property('value',sample);
        });

        // Pick first name to be the default data for our graphs
        var firstSample = sampleNames[0];
        
        //buildCharts(firstSample);
        buildMetadata(firstSample);
    });
};

// function optionChanged(newSample) {
//     buildCharts(newSample);
//     buildMetadata(newSample);
// }

// Create function to populate 'Demographic Info' table
function buildMetadata(sample) {
    // Fetch the JSON data
    d3.json('samples.json').then(data => {
        // Create variable to hold all the metadata
        var metadata = data.metadata;
        
        // DON'T UNDERSTAND WHAT'S HAPPENING IN RESULTARRAY
        var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
        console.log(`resultArray:`, resultArray);
        
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

// function buildCharts(samples) {
//     d3.json('samples.json').then(data => {
//         var samples = data.samples;
//         var resultArray = samples.filter(sampleObj => sampleObj.id == samples);
//         var result = resultArray[0];
//         console.log("RESULT:");
//         console.log(result);
//         console.log("resultArray:");
//         console.log(resultArray);
//         console.log(`SAMPLES:, ${samples}`);
//         //error somewhere here!!!

//         var otu_ids = result.otu_ids;
//         var otu_labels = result.otu_labels;
//         var sample_values = result.sample_values;

//         var bubbleLayout = {
//             title: 'Vactera Cultures Per Sample',
//             margin: {t: 0 },
//             hovermode: 'closest',
//             xaxis: { title: 'OTU ID'},
//             margin: { t: 30}
//         };
//         var bubbleData = [
//             {
//                 x: otu_ids,
//                 y: sample_values,
//                 text: otu_labels,
//                 mode: 'markers',
//                 marker: {
//                     size: sample_values,
//                     color: otu_ids,
//                     colorscale: 'Earth'
//                 }
//             }
//         ];

//         Plotly.newPlot('bubble',bubbleData,bubbleLayout);
//     });
// }

