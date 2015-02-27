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
	function drawOneMileCircle(meters){

		L.circle(centuryLinkCoords, meters, {color: "red", fillColor: "#f03"})
		    .bindPopup("My radius is " + meters + " meters!").addTo(map);

	}
	// Draw the Circle
	var metersInAMile = 1609.34;
	var circle = new drawOneMileCircle(metersInAMile);

	// Plot Crime Data with Leaflet Markers
	function plotCrimeDataOnMap(data){
		for (var i = data.length - 1; i >= 0; i--) {
			var marker = L.marker([data[i].latitude, data[i].longitude])
							.bindPopup(data[i].event_clearance_subgroup)
							.addTo(map);
		};
	}

	// Count & Update Total Crime Incidents in Request
	function countTotalCrimes(data){
		var countCrimes = data.length;
		$('span#crime-count').text(countCrimes + " ");
		countCrimeTypes(data);
	}

	// Sort Object by converting to array
	function sortProperties(obj)
	{
	  // convert object into array
	    var sortable=[];
	    for(var key in obj)
	        if(obj.hasOwnProperty(key))
	            sortable.push([key, obj[key]]); // each item is an array in format [key, value]

	    // sort items by value
	    sortable.sort(function(a, b)
	    {
	      return b[1]-a[1]; // compare numbers
	    });
	    return sortable; // array in format [ [ key1, val1 ], [ key2, val2 ], ... ]
	}

	// Count Substance Related Crimes
	function countCrimeTypes(data){
		window.crimeCount = {};
		for (var i = data.length - 1; i >= 0; i--) {
		    crimeCount[data[i].event_clearance_subgroup] = (crimeCount[data[i].event_clearance_subgroup] || 0) + 1;
		}

		var sortedCrimeCount = sortProperties(crimeCount);

    	for (var i = 0; i < sortedCrimeCount.length; i++){
		    if (sortedCrimeCount[i][1] > 1) {
		        
		    	$('.data-display').append("<p class='incident-type-count-"+((i%2))+"'>"+sortedCrimeCount[i][0].toLowerCase()+": <span class='crime-count-type'>"+ sortedCrimeCount[i][1]+"</span></p>");
		    }
    	}
	}

	// AJAX Request of Data
	function ajaxDataRequest(url){
		console.log('GET', url);

		$.ajax({
			method: 'GET',
			url: url,
		}).done(function(data, status) {
			// window.socrataData = data;
			console.log('done with call:', status, data);
			plotCrimeDataOnMap(data);
			countTotalCrimes(data);
		}).fail(function(xhr, status, err) {
			console.error('fail', status, err);
		});
	}

	// 
	// Bring in Crime Data
	function requestAndPlotCrimeData(date){
		// Set Up Request URL for Crime
		var datasetUrl = "https://data.seattle.gov/resource/3k2p-39jp.json";
		var whereInCircleParam = "?$where=within_circle(incident_location, "+centuryLinkCoords[0]+", "+ centuryLinkCoords[1]+", "+metersInAMile+")";
		var dateRangeParam = " and event_clearance_date>'"+date+"'";
		var crimeDataWithMileRadiusAndDateParams = datasetUrl + whereInCircleParam + dateRangeParam;
		var url = crimeDataWithMileRadiusAndDateParams;
		// Make AJAX Call passing in URL
		ajaxDataRequest(url);
	}

	var dateStart = "2015-02-26T00:00:00";
	requestAndPlotCrimeData(dateStart);
	
}



var map = new CrimeDataMap('map');
