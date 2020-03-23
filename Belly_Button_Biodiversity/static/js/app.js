
init();

// ================================
function init() {
    var selector = d3.select('#selDataset');

    d3.json('samples.json').then(data => {
        var sampleNames = data.names;

        sampleNames.forEach(sample => {
            selector
                .append('option')
                .text(sample)
                .property('value',sample);
        });

        var firstSample = sampleNames[0];
        buildCharts(firstSample);
        buildMetadata(firstSample);
    });
};

function optionChanged(newSample) {
    buildCharts(newSample);
    buildMetadata(newSample);
}

function buildMetadata(sample) {
    d3.json('samples.json').then(data => {
        var metadata = data.metadata;

        var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
        var result = resultArray[0];
        var panel = d3.select('#sample-metadata');
        panel.html('');

        Object.entries(result).forEach(([key, value]) => {
            panel.append('h6').text(`${key.toUpperCase()}: ${value}`);
        });

        // buildGauge(reesult.wfreq);
    });
};

function buildCharts(samples) {
    d3.json('samples.json').then(data => {
        var samples = data.samples;
        var resultArray = samples.filter(sampleObj => sampleObj.id == samples);
        var result = resultArray[0];
        console.log("RESULT:");
        console.log(result);
        //error somewhere here!!!

        var otu_ids = result.otu_ids;
        var otu_labels = result.otu_labels;
        var sample_values = result.sample_values;

        var bubbleLayout = {
            title: 'Vactera Cultures Per Sample',
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