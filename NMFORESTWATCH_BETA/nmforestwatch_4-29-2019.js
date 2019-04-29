var viz = {"opacity":1,"bands":["nd"],"min":0.10244220979511738,"max":0.4868767995387316,"palette":["beb261","8ffff9","1cd810"]},
    nmco = ee.FeatureCollection("users/oneill505/fe_2007_35_county"),
    places = ee.FeatureCollection("users/oneill505/tl_2015_35_place"),
    usfs = ee.FeatureCollection("users/oneill505/USFSNMt"),
    L8 = ee.ImageCollection("LANDSAT/LC08/C01/T1_RT"),
    NM = ee.FeatureCollection("users/oneill505/states"),
    viz2 = {"opacity":0.76,"bands":["nd"],"min":0.10244220979511738,"max":0.4868767995387316,"palette":["beb261","8ffff9","1cd810"]},
    fbc = ee.FeatureCollection("users/oneill505/forest_by_countyshx"),
    fbm = ee.FeatureCollection("users/oneill505/muniforest"),
    NM18 = ee.Image("users/oneill505/NM18"),
    viz3 = {"opacity":1,"bands":["nd"],"min":-0.029664606675505637,"max":0.2514786020666361,"palette":["beb261","8ffff9","1cd810"]},
    NM17T1 = ee.Image("users/oneill505/NM17T1"),
    viz4 = {"opacity":1,"bands":["nd"],"min":0.06,"max":0.2,"palette":["beb261","8ffff9","1cd810"]},
    NM16T1 = ee.Image("users/oneill505/NM16T1"),
    NM15T1 = ee.Image("users/oneill505/NM15T1"),
    NM14T1 = ee.Image("users/oneill505/NM14T1"),
    NM13T1 = ee.Image("users/oneill505/NM13T1");
    
    //overall layout.
var viz3 = {"opacity":0.76,"bands":["NDVI"],"min":0.10244220979511738,"max":0.4868767995387316,"palette":["beb261","8ffff9","1cd810"]};
// Create a map panel.
var mapPanel = ui.Map();

// UNIX time in milliseconds.
var timeField = 'system:time_start';

// Mask clouds in Landsat 8 imagery.
var maskClouds = function(image) {
  var clouds = ee.Algorithms.Landsat.simpleCloudScore(image).select(['cloud']);
  return image.updateMask(clouds.lt(10));
};

// Use this function to add variables for NDVI, time and a constant
// to Landsat 8 imagery.
var addVariables = function(image) {
  // Compute time in fractional years since the epoch.
  var date = ee.Date(image.get(timeField));
  var years = date.difference(ee.Date('1970-01-01'), 'year');
  // Return the image with the added bands.
  return image
    // Add an NDVI band.
    .addBands(image.normalizedDifference(['B5', 'B4']).rename('NDVI')).float()
    // Add a time band.
    .addBands(ee.Image(years).rename('t').float())
    // Add a constant band.
    .addBands(ee.Image.constant(1));
};

//Filter Images to New Mexico Region of Interest(ROI)

var filtered = L8.filterBounds(NM)

// Add Variables to ROI imagery and  use median reducer to  process median values from NDVI Band 
var with_ndvi = filtered
  .map(maskClouds)
  .map(addVariables);
var median = with_ndvi.median();
var image = ee.Image(filtered.first());

var forestreducer = image.reduceRegions({
  collection: image,
  reducer: ee.Reducer.mean(),
  scale: 150,
});


/*
 * Panel setup
 */

// Create a panel to hold title, intro text, chart and legend components.
var inspectorPanel = ui.Panel({style: {width: '20%', position: 'top-left'}});

// Create an intro panel with labels.
var intro = ui.Panel([
  ui.Label({
    value: 'NMFORESTWATCH',
    style: {fontSize: '30px', fontWeight: 'bold'}
  }),
  ui.Label('Choose a date and select a location to see NDVI linear trend')
]);
inspectorPanel.add(intro);


ui.root.clear();
ui.root.add(ui.SplitPanel(inspectorPanel, mapPanel));


/*
 *  ***DATE SLIDER*** 
 */
 
 
var start = ee.Image(with_ndvi.first()).date().get('year').format();
var now = Date.now();
var end = ee.Date(now).format();
// Run this function on a change of the dateSlider.
var rangeStart='2010-01-01'
var rangeEnd='2020-01-01'
var showMosaic = 
  function(range) {
  rangeEnd = range.end()
  rangeStart = range.start()
  var filtered = L8.filterBounds(NM)
.map(maskClouds)
.map(addVariables);
  
  var mosaic = ee.Algorithms.Landsat.simpleComposite({
    collection: with_ndvi.filterDate(range.start(), range.end())
  
  });
 
// Asynchronously compute the name of the composite.  Display it.
  range.start().get('year').evaluate(
    function(name) {
    
    
    var layers = ui.Map.Layer ()
    if(name == 2013){
     layers = (NM13T1);
    } else if (name == 2014) {
     layers = (NM14T1)
    } else if (name == 2015) {
     layers = (NM15T1);
    } else if (name == 2016) {
     layers = (NM16T1)
    } else if (name == 2017) {
     layers = (NM17T1)
    } else if (name == 2018) {
     layers = (NM18)
    }  else if (name == 2019) {
     layers = (NM18)
    }
   var layer = ui.Map.Layer (layers, viz4, name + ' composite');
     
    
    print(layer)
    mapPanel.layers().set(0, layer);
  });
};

// Asynchronously compute the date range and show the slider.

var dateRange = ee.DateRange(start, end).evaluate(
  function(range) {

var dateSlider = ui.DateSlider({
    start: range['dates'][0],
    end: range['dates'][1],
    value: null,
    period: 365,
    onChange: showMosaic,
    style: {stretch: 'horizontal'}
  
  });  
inspectorPanel.add(dateSlider.setValue(now));




  


/*
 * Visualization and styling
 */

// Constants used to visualize the data on the map.
var NDVI_STYLE = {
  min: -1,
  mid: 0,
  max: 0,
  palette: ["beb261","8ffff9","1cd810"]
};
var NDVI_VIS_MAX_VALUE = 1;
var NDVI_VIS_NONLINEARITY = 4;
var FOREST_STYLE = {color: 'green', fillColor: '00000000'};
var HIGHLIGHT_STYLE = {color: 'red', fillColor: '00000000'};

// // Apply a non-linear stretch for visualization.
function colorStretch(image) {
  return image.divide(NDVI_VIS_MAX_VALUE)
      .pow(1 / NDVI_VIS_NONLINEARITY);
}

// Inverts the nonlinear stretch  to the NDVI data for
// visualization to display in the legend.

function undoColorStretch(val) {
  return Math.pow(val, NDVI_VIS_NONLINEARITY) * NDVI_VIS_MAX_VALUE;
}



// Configure map controls and map scale

mapPanel.style().set({cursor: 'crosshair'});
mapPanel.setCenter(-106, 34, 7);

// Addforest vector layers to the map.

mapPanel.addLayer(usfs.style(FOREST_STYLE));

/*
 * LAYER SELECTION DROP DOWN
 */
// Define some constants for vector layer selection.
var FBC = 'Forest_by_County';
var FBM = 'Forest_by_Municipality';
var FRT = 'Forest_by_District';


// Create a layer selector that dictates which layer is visible on the map.
var select = ui.Select({
  items: [FBC, FBM, FRT],
  value: FRT,
  onChange: redrawForest,
});
inspectorPanel.add(ui.Label('Select Forest Area')).add(select);

// Create a function to render a map layer configured by the user inputs.
function redrawForest() {
  mapPanel.layers().reset[0];
  var layer = select.getValue();
  imageF;
  if (layer == FRT) {
    imageF = (usfs);
  } else if (layer == FBC) {
    imageF = fbc;
  } else if (layer == FBM) {
    imageF = fbm;
  } 
    mapPanel.layers().set(1, ui.Map.Layer(imageF.style(FOREST_STYLE), {}, layer));
print (imageF)
return (imageF)

}
var imageF = redrawForest(imageF)
print(imageF)


/*
 * The chart panel in the bottom-right
 */

// A list of points the user has clicked on, as [lon,lat] tuples.
var selectedPoints = [];

// Returns the list of forest the user has selected.
function getSelectedForests() {
  return imageF.filterBounds(ee.Geometry.MultiPoint(selectedPoints));
}

// Makes scatter chart of the given FeatureCollection of forests by name.
function makeResultsBarChart(forests) {
  print(rangeStart.format('Y'))
  var newstart=rangeStart.format('Y-01-01')
  var newend=rangeStart.advance(1,'year').format('Y-01-01')
  print(newend)
  
  
  var filtered = L8.filterBounds(NM).filterDate(newstart,newend);
  var image = ee.Image(filtered.first());
  var with_ndvi = filtered
  .map(maskClouds)
  .map(addVariables);


  var chart = ui.Chart.image.series({
  imageCollection: with_ndvi.select('NDVI'),
  region: imageF.filterBounds(ee.Geometry.MultiPoint(selectedPoints)),
  reducer: ee.Reducer.median(),
  scale: 500,
  
 
}).setOptions({title: 'forest health index', 
            
            trendlines: {0: {
        color: '006600'
      }},
      lineWidth: 2,
      pointSize: 1,
    
    curveType: 'linear',
    dataOpacity: .5});
     
    
  return chart;
}



// Makes a table of the given FeatureCollection of forests by name.
function makeResultsTable(imageF) {
  var table = ui.Chart.feature.byFeature(imageF, 'FORESTNAME', 'NAMELSAD');
  table.setChartType('Table');
  table.setOptions({allowHtml: true, pageSize: 5});
  table.style().set({stretch: 'both'});
  return table;
}

// Updates the map overlay using the currently-selected forest.
function updateOverlay() {
  var overlay = getSelectedForests().style(HIGHLIGHT_STYLE);
  mapPanel.layers().set(2, ui.Map.Layer(overlay));
}

// Updates the chart using the currently-selected charting function,
function updateChart() {
  var chartBuilder = chartTypeToggleButton.value;
  var chart = chartBuilder(getSelectedForests());
  resultsPanel.clear().add(chart).add(buttonPanel);
}

// Clears the set of selected points and resets the overlay and results
// panel to their default state.
function clearResults() {
  selectedPoints = [];
  mapPanel.layers().remove(mapPanel.layers().get(2));
  var instructionsLabel = ui.Label('Select regions to view annual NDVI trend');
  resultsPanel.widgets().reset([instructionsLabel]);
}

// Register a click handler for the map that adds the clicked point to the
// list and updates the map overlay and chart accordingly.
function handleMapClick(location) {
  selectedPoints.push([location.lon, location.lat]);
  updateOverlay();
  updateChart();
}
mapPanel.onClick(handleMapClick);

// A button widget that toggles between states.

function ToggleButton(states, onClick) {
  var index = 0;
  var button = ui.Button(states[index].label);
  button.value = states[index].value;
  button.onClick(function() {
    index = ++index % states.length;
    button.setLabel(states[index].label);
    button.value = states[index].value;
    onClick();
  });
  return button;
}

// Chart type toggle button: the button text is the opposite of the current state
var chartTypeToggleButton = ToggleButton(
    [
      {
        label: 'Display attributes',
        value: makeResultsBarChart,
      },
      {
        label: 'Display results as chart',
        value: makeResultsTable,
      }
    ],
    updateChart);

// A panel containing the two buttons 
var buttonPanel = ui.Panel(
    [ui.Button('Clear results', clearResults), chartTypeToggleButton],
    ui.Panel.Layout.Flow('horizontal'), {margin: '0 0 0 auto', width: '500px'});

var resultsPanel = ui.Panel({style: {position: 'bottom-right'}});
mapPanel.add(resultsPanel);
clearResults();


// Create an opacity slider and display it. 
var opacityLabel = ui.Label({
    value: 'Layer Opacity',
    style: {fontSize: '15px'}
  });
opacityLabel.style().set('color', 'black');
opacityLabel.style().set('fontWeight', 'bold');
opacityLabel.style().set({
  fontSize: '17px',
  padding: '10px'
});
inspectorPanel.add(opacityLabel)

var opacitySlider = ui.Slider({
    min: 0,
  max: 1,
  value: 1,
  step: 0.01,
  style: {stretch: 'horizontal'}
});
opacitySlider.onSlide(function(value) {
  mapPanel.layers().forEach(function(element, index) {
    element.setOpacity(value);
  });
});

var viewPanel =
    ui.Panel([opacitySlider], ui.Panel.Layout.Flow('horizontal'));
inspectorPanel.add(viewPanel);


/*
 * The legend panel 
 */

// A color bar widget. Makes a horizontal color bar to display the given
// color palette.
function ColorBar(palette) {
  return ui.Thumbnail({
    image: ee.Image.pixelLonLat().select(0),
    params: {
      bbox: [0, 0, 1, 0],
      dimensions: '100x10',
      format: 'png',
      min: 0,
      max: 1,
      palette: palette,
    },
    style: {stretch: 'horizontal', margin: '0px 8px'},
  });
}

// // Returns labeled legend, with a color bar and three labels representing NDVI -1 0 1

function makeLegend() {
  var labelPanel = ui.Panel(
      [
        ui.Label(-1),
        ui.Label(
            Math.round(undoColorStretch(0)),
            {margin: '4px 8px', textAlign: 'center', stretch: 'horizontal'}),
        ui.Label(Math.round(undoColorStretch(1)), {margin: '4px 8px'})
      ],
      ui.Panel.Layout.flow('horizontal'));
  return ui.Panel([ColorBar(NDVI_STYLE.palette), labelPanel]);
}

// // Styling for the legend title.
var LEGEND_TITLE_STYLE = {
  fontSize: '20px',
  fontWeight: 'bold',
  stretch: 'horizontal',
  textAlign: 'center',
  margin: '4px',
};

// // Styling for the legend footnotes.
var LEGEND_FOOTNOTE_STYLE = {
  fontSize: '10px',
  stretch: 'horizontal',
  textAlign: 'center',
  margin: '4px',
};

// // Assemble the legend panel

var LegendAss = (ui.Panel(
    [
      ui.Label('NDVI Reflectance', LEGEND_TITLE_STYLE), makeLegend(),
      ui.Label(
          '(Green indicates healthier plants)', LEGEND_FOOTNOTE_STYLE),
      ui.Label(
          '', LEGEND_FOOTNOTE_STYLE),
      ui.Label('Data Courtesy USGS', LEGEND_FOOTNOTE_STYLE)
    ],
    ui.Panel.Layout.flow('vertical'),
    {width: {stretch: 'horizontal'}}));


inspectorPanel.add(LegendAss);


});
