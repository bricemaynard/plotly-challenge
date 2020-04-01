function getPlot(id) {
    // json file
    d3.json("data/samples.json").then((data)=> {
        console.log(data)
  
        var wash = data.metadata.map(d => d.wash)
        console.log(`Washing Freq: ${wash}`)
        
        // filter by id
        var samples = data.samples.filter(s => s.id.toString() == id)[0];
        
        console.log(samples);
  
        // Top 10
        var samplevalues = samples.sample_values.slice(0, 10).reverse();
  
        var OTU_top = (samples.otu_ids.slice(0, 10)).reverse();
        
        var OTU_id = OTU_top.map(d => "OTU " + d)
  
         console.log(`OTU IDS: ${OTU_id}`)
  
        var labels = samples.otu_labels.slice(0, 10);
  
         console.log(`Sample Values: ${samplevalues}`)
         console.log(`Id Values: ${OTU_top}`)

        // trace variable for plot
        var trace = {
            x: samplevalues,
            y: OTU_id,
            text: labels,
            marker: {
              color: 'rgb(120, 150, 170)'},
            type:"bar",
            orientation: "h",
        };
  
        var data = [trace];
  
        // layout variable for plots layout
        var layout = {
            title: "Top 10 OTU",
            yaxis:{
                tickmode:"linear",
            },
            margin: {
                l: 100,
                r: 100,
                t: 100,
                b: 30
            }
        };
  
        // create bar plot
        Plotly.newPlot("bar", data, layout);
  
        console.log(`ID: ${samples.otu_ids}`)
      
        var trace1 = {
            x: samples.otu_ids,
            y: samples.sample_values,
            mode: "markers",
            marker: {
                size: samples.sample_values,
                color: samples.otu_ids
            },
            text: samples.otu_labels
  
        };
  
        // bubble plot layout
        var layout_b = {
            xaxis:{title: "OTU ID"},
            height: 600,
            width: 1000
        };
  
        var data1 = [trace1];
  
        // create bubble plot
        Plotly.newPlot("bubble", data1, layout_b); 

    });
}
  
  // function to get  necessary data
  function getInfo(id) {
    // read the json file to get data
    d3.json("data/samples.json").then((data)=> {
        
        // metadata info for demographic panel
        var metadata = data.metadata;
  
        console.log(metadata)
  
        // metadata by id
        var result = metadata.filter(meta => meta.id.toString() == id)[0];
  
        var demographicInfo = d3.select("#sample-metadata");
        
        // clear demographic panel
        demographicInfo.html("");
  
        // get demographic data by id and append to panel
        Object.entries(result).forEach((key) => {   
                demographicInfo.append("h5").text(key[0].toUpperCase() + ": " + key[1] + "\n");    
        });
    });
  }
  
  // change event function
  function optionChanged(id) {
    getPlot(id);
    getInfo(id);
  }
  
  // data rendering functino
  function init() {
    // select dropdown menu 
    var dropdown = d3.select("#selDataset");
  
    // read data 
    d3.json("data/samples.json").then((data)=> {
        console.log(data)
  
        // get id data to the dropdwown menu
        data.names.forEach(function(name) {
            dropdown.append("option").text(name).property("value");
        });
  
        // call the functions to display the data and the plots to the page
        getPlot(data.names[0]);
        getInfo(data.names[0]);
    });
  }
  
  init();