var projection = ol.proj.get('EPSG:3857');

var Layer_Stamen_terrain = new ol.layer.Group({
    layers: [
        new ol.layer.Tile({
            source: new ol.source.Stamen({layer: 'terrain'})
        })
    ]
});

var block_color = [0,255,0,.50]
var block_line_color = [0,100,0,1]
var county_color = [124,12,25,.10]
var county_line_color = [130,230,25,.40]
var Vallecito_line_color = [500,250,25,.60]
var Lake_color = [555,30,30,.50]
var froad_color = [204,0,0,.75]
var lake2_color = [51,255,51,.75]
var lake3_color = [204,0,0,.75]
var lake4_color = [0,0,255,.75]
var lake5_color = [204,0,0,.75]
var lake6_color = [255,0,127,.75]

var froad_style = new ol.style.Style({
		stroke: new ol.style.Stroke({
	  color: froad_color,
	  width: 5
	}),
});

var Lake_style = new ol.style.Style({
    fill: new ol.style.Fill({
      color: Vallecito_line_color
    }),
    stroke: new ol.style.Stroke({
      color: Lake_color,
      width: 1
    })
  });

var lake2_style = new ol.style.Style({
	fill: new ol.style.Fill({
	  color: Vallecito_line_color
	}), 
		stroke: new ol.style.Stroke({
	  color: lake2_color,
	  width: 2
	}),
});

var lake3_style = new ol.style.Style({
	fill: new ol.style.Fill({
	  color: Vallecito_line_color
	}), 
		stroke: new ol.style.Stroke({
	  color: lake3_color,
	  width: 2
	}),
});

var lake4_style = new ol.style.Style({
	fill: new ol.style.Fill({
	  color: Vallecito_line_color
	}), 
		stroke: new ol.style.Stroke({
	  color: lake4_color,
	  width: 2
	}),
});

var lake5_style = new ol.style.Style({
	fill: new ol.style.Fill({
	  color: Vallecito_line_color
	}), 
		stroke: new ol.style.Stroke({
	  color: lake5_color,
	  width: 2
	}),
});

var lake6_style = new ol.style.Style({
	fill: new ol.style.Fill({
	  color: Vallecito_line_color
	}), 
		stroke: new ol.style.Stroke({
	  color: lake6_color,
	  width: 2
	}),
});





var county_style = new ol.style.Style({
	fill: new ol.style.Fill({
	  color: county_color
	}),
	stroke: new ol.style.Stroke({
	  color: county_line_color,
	  width: 2
	}),
});

var block_style = new ol.style.Style({
	fill: new ol.style.Fill({
	  color: block_color
	}),
	stroke: new ol.style.Stroke({
	  color: block_line_color,
	  width: 1
	}),
});




var classroomCoord = [-107.22,37.51]
var officeCoord = [-106.624899,35.084506]
var thirtymileCoord = [-107.2891604,37.7462422]

var classroomPoint = new ol.geom.Point(ol.proj.fromLonLat(classroomCoord, projection));
var officePoint = new ol.geom.Point(ol.proj.fromLonLat(officeCoord, projection));
var thirtymilePoint = new ol.geom.Point(ol.proj.fromLonLat(thirtymileCoord, projection));

var classroomFeature = new ol.Feature({
	geometry: classroomPoint
})

var officeFeature = new ol.Feature({
	geometry:officePoint
})
var thirtymileFeature = new ol.Feature({
	geometry: thirtymilePoint
})

var valleFeature = new ol.Feature({
	geometry: new ol.geom.Polygon([[
	[-107.5822707,37.376218],
	[-107.5790737,37.385417 ],
	[-107.5607227, 37.403716],
	[-107.5433707, 37.436194],
	[-107.5354017, 37.422261],
	[-107.5363987, 37.409105],
	[-107.5334937, 37.400082],
	[-107.5535947, 37.379655],
	[-107.5700747, 37.371957],
		]]).transform('EPSG:4326', projection), 
	name:'Vallecito',
	style: [block_style]

		
});

var riogFeature = new ol.Feature({
	geometry: new ol.geom.Polygon([[
	[-107.3462757,37.760179],
	[-107.3408147,37.756557 ],
	[-107.3368127, 37.751696],
	[-107.3278797, 37.743476],
	[-107.3076537, 37.732169],
	[-107.2841767, 37.72203],
	[-107.2679237, 37.72179],
	[-107.2818177, 37.716995],
	[-107.3450207, 37.745195],
		]]).transform('EPSG:4326', projection), 
	name:'Rio Grande Reservoir'
});

var willFeature = new ol.Feature({
	geometry: new ol.geom.Polygon([[
	[-107.2257587,37.503022],
	[-107.2302757,37.50955 ],
	[-107.2275187, 37.517652],
	[-107.2230987, 37.521771],
	[-107.2194727, 37.519303],
	[-107.2161787, 37.522545],
	[-107.2190543, 37.51772],
	[-107.2233997, 37.502741],
	
		]]).transform('EPSG:4326', projection), 
	name:'Willaims Creek Reservoir'
});

var platFeature = new ol.Feature({
	geometry: new ol.geom.Polygon([[
	[-106.5831017,37.335957],
	[-106.5831017,37.345096 ],
	[-106.5541827, 37.35122],
	[-106.5523697, 37.358981],
	[-106.5495477, 37.355604],
	[-106.5468657, 37.349591],
	[-106.5558657, 37.339986],
	[-106.5774627, 37.330492],
	
		]]).transform('EPSG:4326', projection), 
	name:'Willaims Creek Reservoir'
});


var meadowsFeature = new ol.Feature({
	geometry: new ol.geom.Polygon([[
	[-106.8134887,37.534523],
	[-106.8098517,37.540444 ],
	[-106.8034357, 37.542213],
	[-106.8004527, 37.538044],
	[-106.8090467, 37.530761],
	
	
		]]).transform('EPSG:4326', projection), 
	name:'Willaims Creek Reservoir'
});

			
		
	

var basemap_tiled = new ol.layer.Tile({
	source: new ol.source.TileWMS({
	url: 'https://basemap.nationalmap.gov/arcgis/services/USGSTopo/MapServer/WmsServer?',
	  params: {
		LAYERS: 0,
		FORMAT: 'image/png',
		TRANSPARENT: true
	  },
	  attributions: [
	    new ol.Attribution({
		  html: 'Data provided by the <a href="http://basemap.nationalmap.gov">National Map</a>.'
		})
	  ]
	})
})

var Coloradowms = new ol.layer.Tile({
	source: new ol.source.TileWMS({
		attributions: new ol.Attribution({
			html: 'USGS_EROS_Ortho_1Foot'
		}),
		params: {'LAYERS':'0'},
		url: 'https://isse.cr.usgs.gov/arcgis/services/Orthoimagery/USGS_EROS_Ortho_1Foot/ImageServer/WMSServer',
		serverType: 'geoserver',
		projection: projection
	})
})

var Coloradoeco = new ol.layer.Tile({
	source: new ol.source.TileWMS({
		attributions: new ol.Attribution({
			html: '2'
		}),
		params: {'LAYERS':'2'},
		url: 'https://services.nationalmap.gov/arcgis/services/transportation/MapServer/WmsServer?',
		serverType: 'geoserver',
		projection: projection,
		format: new ol.format.KML({
			extractStyles:true
		})
	}),
	style: block_line_color
})
var Coloradotforestroads = new ol.layer.Tile({
	source: new ol.source.TileWMS({
		attributions: new ol.Attribution({
			html: '4'
		}),
		params: {'LAYERS':'4'},
		url: 'https://services.nationalmap.gov/arcgis/services/transportation/MapServer/WmsServer?',
		serverType: 'geoserver',
		projection: projection,
		format: new ol.format.KML({
			extractStyles:true
		})
	}),
	style: froad_style
})

var Coloradotfrnumbers = new ol.layer.Tile({
	source: new ol.source.TileWMS({
		attributions: new ol.Attribution({
			html: '12'
		}),
		params: {'LAYERS':'12'},
		url: 'https://services.nationalmap.gov/arcgis/services/transportation/MapServer/WmsServer?',
		serverType: 'geoserver',
		projection: projection,
		format: new ol.format.KML({
			extractStyles:false
		})
	}),
	style: froad_style
})

var Coloradoroads = new ol.layer.Tile({
	source: new ol.source.TileWMS({
		attributions: new ol.Attribution({
			html: '7'
		}),
		params: {'LAYERS':'7'},
		url: 'https://services.nationalmap.gov/arcgis/services/transportation/MapServer/WmsServer?',
		serverType: 'geoserver',
		projection: projection
		
	}),
})



var states_single = new ol.layer.Image({
	source: new ol.source.ImageWMS({
		attributions: new ol.Attribution({
			html: 'State Boundary Restructured - USGS, National Atlas Release 5-14-12'
		}),
		params: {'LAYERS':'global:statep010'},
		url: 'http://mapper.internetmapping.net:8081/geoserver/global/wms?',
		serverType: 'geoserver'
	})
})



var colohighways = new ol.layer.Vector({
	source: new ol.source.Vector({
		url: 'https://data.colorado.gov/api/geospatial/trm9-dm4m?method=export&format=KML',
		style: Lake_style,
		projection: projection,
		format: new ol.format.KML({
			extractStyles:false
		})
	})
	
})
var colomunicipal = new ol.layer.Vector({
	source: new ol.source.Vector({
		url: 'https://data.colorado.gov/api/geospatial/u943-ics6?method=export&format=KML',
		projection: projection,
		format: new ol.format.KML({
			extractStyles:true
		})
	})
	
})

var colocounties = new ol.layer.Vector({
	source: new ol.source.Vector({
		url: 'https://data.colorado.gov/api/geospatial/67vn-ijga?method=export&format=KML',
		projection: projection,
		format: new ol.format.KML({
			extractStyles:false
		})
	}),
	style: county_style
})

var local_geoms = new ol.layer.Vector({
	source: new ol.source.Vector({
		features: [valleFeature],
		projection: projection,
		
	}),
	style: Lake_style
})

var Plat_geom = new ol.layer.Vector({
	source: new ol.source.Vector({
		features: [platFeature],
		projection: projection,
		
	}),
	style: lake2_style
})

var rio_geom = new ol.layer.Vector({
	source: new ol.source.Vector({
		features: [riogFeature],
		projection: projection,
		
	}),
	style: lake3_style
})

var will_geom = new ol.layer.Vector({
	source: new ol.source.Vector({
		features: [willFeature],
		projection: projection,
		
	}),
	style: lake4_style
})

var meadows_geom = new ol.layer.Vector({
	source: new ol.source.Vector({
		features: [meadowsFeature],
		projection: projection,
		
	}),
	style: lake6_style
})



var map = new ol.Map({
  target: 'map_canvas',
  layers: [ Layer_Stamen_terrain,colomunicipal, colocounties, Coloradoeco, Coloradoroads, Coloradotforestroads, Coloradotfrnumbers, local_geoms, Plat_geom, rio_geom, will_geom, meadows_geom],
  view: new ol.View({
    center: ol.proj.fromLonLat([-107.22,37.51]), 
    zoom: 10
	
  })
});


