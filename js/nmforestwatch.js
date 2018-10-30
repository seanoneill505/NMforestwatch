var projection = ol.proj.get('EPSG:3857');

var Layer_Stamen_terrain = new ol.layer.Group({
    layers: [
        new ol.layer.Tile({
            source: new ol.source.Stamen({layer: 'terrain'})
        })
    ]
});
		
	


var states_single = new ol.layer.Image({
	source: new ol.source.ImageWMS({
		attributions: new ol.Attribution({
			html: 'states'
		}),
		params: {'LAYERS':'topp:states'},
		url: 'http://129.24.65.163:8080/geoserver/topp/wms?SERVICE=WMS&',
		serverType: 'geoserver'
	})
})






var map = new ol.Map({
  target: 'map_canvas',
  layers: [ Layer_Stamen_terrain, states_single, ],
  view: new ol.View({
    center: ol.proj.fromLonLat([-106,34.51]), 
    zoom: 7.5
	
  })
});
