var usfsnm = ee.FeatureCollection("users/oneill505/USFSNM"),
    nmcounty = ee.FeatureCollection("users/oneill505/fe_2007_35_county"),
    muni = ee.FeatureCollection("users/oneill505/tl_2015_35_place"),
    L8 = ee.ImageCollection("LANDSAT/LC8_L1T_TOA"),
    NM = /* color: #d63000 */ee.Geometry({
      "type": "GeometryCollection",
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -109.09635377269097,
                37.01279452169551
              ],
              [
                -109.12931275706597,
                31.22376979419876
              ],
              [
                -108.10758424144097,
                31.233164277806193
              ],
              [
                -108.10758424144097,
                31.701694309067012
              ],
              [
                -106.23990846019097,
                31.701694309067012
              ],
              [
                -106.23990846019097,
                31.963043887687917
              ],
              [
                -102.92203736644097,
                31.9444006199804
              ],
              [
                -102.93302369456597,
                37.047876800141054
              ]
            ]
          ],
          "geodesic": true,
          "evenOdd": true
        },
        {
          "type": "Point",
          "coordinates": [
            -105.59660601159698,
            35.67773878407592
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -105.61857866784698,
            35.83821451579798
          ]
        }
      ],
      "coordinates": []
    }),
    roi = /* color: #98ff00 */ee.Geometry.Point([-106.42694818517333, 35.13268784362166]);
// This field contains UNIX time in milliseconds.
var timeField = 'system:time_start';

// Use this function to mask clouds in Landsat 8 imagery. (See https://landsat.usgs.gov/collectionqualityband)
	var maskClouds = function(image) {
	var quality = image.select('BQA');
	var cloud01 = quality.eq(61440);
	var cloud02 = quality.eq(53248);
	var cloud03 = quality.eq(28672);
	var mask = cloud01.or(cloud02).or(cloud03).not();return image.updateMask(mask);};

// Use this function to add variables for NDVI, time and a constant// to Landsat 8 imagery.
	var addVariables = function(image) {

// Compute time in fractional years since the epoch.
	var date = ee.Date(image.get(timeField));
	var years = date.difference(ee.Date('1970-01-01'), 'year');
	
// Return the image with the added bands
  return image
// Add an NDVI band.    
	.addBands(image.normalizedDifference(['B5', 'B4']).rename('NDVI')).float()
	
// Add a time band.    
	.addBands(ee.Image(years).rename('t').float())
// Add a constant band.    
	.addBands(ee.Image.constant(1));};
// Remove clouds, add variables and filter to the area of interest.
	var filteredLandsat = L8 
	.filterBounds(roi)  
	.map(maskClouds)  
	.map(addVariables);
	
// Plot a time series of NDVI at a single location.
	var l8Chart = ui.Chart.image.series(filteredLandsat.select('NDVI'), roi)    
	.setChartType('ScatterChart')    
	.setOptions({
		title: 'Landsat 8 NDVI time series at ROI',
		trendlines: {0: {
		color: 'CC0000'
		}},
		lineWidth: 1,pointSize: 3,    });
		print(l8Chart)
