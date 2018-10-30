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
