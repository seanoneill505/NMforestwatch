var fc = ee.FeatureCollection('ft:1fRY18cjsHzDgGiJiS2nnpUU3v9JPDc2HNaR7Xk8')
    .filter(ee.Filter.or(
         ee.Filter.eq('Name', 'New Mexico')));

function addNDVI(image) {
  var ndvi = image.normalizedDifference(['B5', 'B4']);
  return image.addBands(ndvi);
}


var filtered = L8.filterDate('2018-01-01', '2019-01-01').filterBounds(fc);
  
var image = ee.Image(filtered.first());
var with_ndvi = filtered.map(addNDVI);

// Reduce the collection by taking the median.
var median = with_ndvi.median();

// Clip to the output image to the New Mexico.
var clipped = median.clipToCollection(fc);

Map.addLayer(clipped,viz, 'NDVI');

Export.image.toCloudStorage({
  image: clipped.toFloat(),
  description: 'clip17',
  bucket: 'nmforestwatch',
  scale: 30,
  region: fc,
  fileFormat: 'GeoTIFF',
  maxPixels: 1e9,
  
});
