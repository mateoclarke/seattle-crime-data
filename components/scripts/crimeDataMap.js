// Lat Long for CenturyLink Field
var centuryLinkCoords = [47.595206, -122.331639];

function CrimeDataMap(attributes){

	// *****
	// our Leaflet Map
	var map = L.map('map', {
		center: centuryLinkCoords,
		zoom: 13,
		scrollWheelZoom: false
	})

	//  add tile Layer from Mapquest
	L.tileLayer(
		// Satelite Tile
		// 'http://otile1.mqcdn.com/tiles/1.0.0/sat/{z}/{x}/{y}.jpg'

		// Plain (ugly) Mapquest Tiles
		// 'http://otile1.mqcdn.com/tiles/1.0.0/map/{z}/{x}/{y}.jpg'

		// Open Street Map Tile
	    // 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'

	    // Mapbox Streets-Satellite
	    'http://api.tiles.mapbox.com/v4/mapbox.streets-satellite/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWF0ZW9jb2RlcyIsImEiOiJUZVVZSVBvIn0.PkZleldXk_6KCuoGhx6-CA'

	).addTo(map);

	// *****
	// Create a one mile circle centered on CLF
	function DrawOneMileCircle(meters){

		L.circle(centuryLinkCoords, meters, {color: "red", fillColor: "#f03"})
		    .bindPopup("My radius is " + meters + " meters!").addTo(map);

	}
	// Draw the Circle
	var metersInAMile = 1609.34;
	var circle = new DrawOneMileCircle(metersInAMile);

	// 
	// Bring in Crime Data
	function AddCrimeDataMarkers(){
		var markerLayer = L.featureLayer()
	}

	// 
	


	
}



var map = new CrimeDataMap('map');
