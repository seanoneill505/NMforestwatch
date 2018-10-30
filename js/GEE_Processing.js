var muni = ee.FeatureCollection("users/oneill505/tl_2015_35_place"),
    L8 = ee.ImageCollection("LANDSAT/LC8_L1T_TOA"),
    NM = /* color: #d63000 */ee.Geometry.Polygon(
        [[[-109.09635377269097, 37.01279452169551],
          [-109.12931275706597, 31.22376979419876],
          [-108.10758424144097, 31.233164277806193],
          [-108.10758424144097, 31.701694309067012],
          [-106.23990846019097, 31.701694309067012],
          [-106.23990846019097, 31.963043887687917],
          [-102.92203736644097, 31.9444006199804],
          [-102.93302369456597, 37.047876800141054]]]),
    viz = {"opacity":1,"bands":["nd"],"min":0.10244220979511738,"max":0.4868767995387316,"palette":["beb261","8ffff9","1cd810"]},
    imageVisParam = {"opacity":1,"bands":["nd"],"min":-0.3950178027153015,"max":0.5896815657615662,"palette":["beadab","ff0707"]},
    imageVisParam2 = {"opacity":1,"bands":["nd"],"min":-0.2313025712966919,"max":0.5536771535873413,"palette":["bebebe","ff0303"]},
    usfsnmaz = ee.FeatureCollection("ft:1ISdC2MnQItTj5fBZGMpWed-45rI3dot3t_N2qPVd"),
    nmco = ee.FeatureCollection("ft:11dWiQkFMNxzP_xHfg98wz9paHoTjlsLRsVwSf0ZZ");

var rgb_vis = {min: 0, max: 0.3, bands: ['B4', 'B3', 'B2']};
function addNDVI(image) {
  var ndvi = image.normalizedDifference(['B5', 'B4']);
  return image.addBands(ndvi);
}
var filtered = L8.filterDate('2017-01-01', '2018-03-01')
  .filterBounds(NM);
  var image = ee.Image(filtered.first());
var with_ndvi = filtered.map(addNDVI);
var greenest = with_ndvi.qualityMosaic('nd');
// Map.addLayer(filtered.median(), rgb_vis, 'RGB (median)');
Map.addLayer(greenest, rgb_vis, 'RGB (greenest pixel)');
Map.addLayer(with_ndvi.median(), viz,'NDVI');
Map.addLayer(nmco);
Map.addLayer(usfsnmaz);

Export.image.toDrive({
  image: image,
  description: 'imageToDriveExample',
  scale: 30,
  maxPixels: 500000000, 
  region: usfsnmaz
});


var addArea = function(feature) {
  return feature.set({areaHa: feature.geometry().area().divide(100 * 100)});
};
var areaAdded = usfsnmaz.map(addArea);
print('First feature: ', areaAdded.first());

// var chart = ui.Chart.image.series(with_ndvi.select('nd'), NM);
// print(chart);
//var ndvi = image.normalizedDifference(['B5', 'B4']).rename('NDVI');
// Create a chart.
var usfsnmaz2 = image.reduceRegions({
  collection: with_ndvi,
  reducer: ee.Reducer.mean(),
  scale: 30,
});
print(ee.Feature(usfsnmaz2.first()).select(image.bandNames()));
var chart = ui.Chart.image.series({
  imageCollection: with_ndvi.select('nd'),
  region: usfsnmaz2,
  reducer: ee.Reducer.mean(),
    scale: 30
}).setOptions({title: 'NDVI over time'});

// Display the chart in the console.
print(chart);
