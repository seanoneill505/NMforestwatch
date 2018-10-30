var     usfs = ee.FeatureCollection("users/oneill505/USFSNM");
//Load and filter the Hansen data
var gfc2014 = ee.Image('UMD/hansen/global_forest_change_2015')
              .select(['treecover2000','loss','gain','lossyear']);
var cliped = gfc2014.clip(usfs);
// list for filter iteration
var years = ee.List.sequence(1, 14)

// turn your scale into a var in case you want to change it
var scale = 100

//add country districts as a feature collection
var distr = ee.FeatureCollection('ft:1om6iw8PGASn5qvLrD0nGFwb9hbCx1MyWWoBU7FuL', 'geometry');

//look at tree cover, find the area
var treeCover = gfc2014.select(['treecover2000']);
var areaCover = treeCover.multiply(ee.Image.pixelArea())
                .divide(10000).select([0],["areacover"])

// total loss area
var loss = gfc2014.select(['loss']);
var areaLoss = loss.gt(0).multiply(ee.Image.pixelArea())
               .divide(10000).select([0],["arealoss"]);

// total gain area
var gain = gfc2014.select(['gain'])
var areaGain = gain.gt(0).multiply(ee.Image.pixelArea())
               .divide(10000).select([0],["areagain"]);

// final image
var total = gfc2014.addBands(areaCover)
            .addBands(areaLoss)
            .addBands(areaGain)

Map.addLayer(total,{},"total")

// Map cover area per feature
var districtSums = areaCover.reduceRegions({
  collection: distr,
  reducer: ee.Reducer.sum(),
  scale: scale,
});


var addVar = function(feature) {

  // function to iterate over the sequence of years
  var addVarYear = function(year, feat) {
    // cast var
    year = ee.Number(year).toInt()
    feat = ee.Feature(feat)

    // actual year to write as property
    var actual_year = ee.Number(2000).add(year)

    // filter year:
    // 1st: get mask
    var filtered = total.select("lossyear").eq(year)
    // 2nd: apply mask
    filtered = total.updateMask(filtered)

    // reduce variables over the feature
    var reduc = filtered.reduceRegion({
      geometry: feature.geometry(),
      reducer: ee.Reducer.sum(),
      scale: scale
    })

    // get results
    var loss = ee.Number(reduc.get("arealoss"))
    var gain = ee.Number(reduc.get("areagain"))

    // set names
    var nameloss = ee.String("loss_").cat(actual_year)
    var namegain = ee.String("gain_").cat(actual_year)

    // alternative 1: set property only if change greater than 0
    var cond = loss.gt(0).or(gain.gt(0))
    return ee.Algorithms.If(cond, 
                            feat.set(nameloss, loss, namegain, gain),
                            feat)

    // alternative 2: always set property
    // set properties to the feature
    // return feat.set(nameloss, loss, namegain, gain)
  }

  // iterate over the sequence
  var newfeat = ee.Feature(years.iterate(addVarYear, feature))

  // return feature with new properties
  return newfeat
}

// Map over the FeatureCollection
var areas = districtSums.map(addVar);

Map.addLayer(areas, {}, "areas")
Map.addLayer(cliped, {}, "clip")
