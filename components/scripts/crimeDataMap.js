// Lat Long for CenturyLink Field
var centuryLinkCoords = [47.595206, -122.331639];

function CrimeDataMap(attributes){

	// *****
	// our Leaflet Map
	var map = L.map('map', {
		center: centuryLinkCoords,
		zoom: 14,
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

	// Set up Marker Layer
	var markers = new L.layerGroup();

	// *****
	// Create a one mile circle centered on CenturyLink
	function drawOneMileCircle(meters){

		L.circle(centuryLinkCoords, meters, {color: "red", fillColor: "#FFEEBE"})
		    .bindPopup("My radius is " + meters + " meters!").addTo(map);

	}
	// Draw the Circle
	var metersInAMile = 1609.34;
	var circle = new drawOneMileCircle(metersInAMile);

	// Plot Crime Data with Leaflet Markers
	function plotCrimeDataOnMap(data){
		for (var i = data.length - 1; i >= 0; i--) {
			var marker = L.marker([data[i].latitude, data[i].longitude])
						.bindPopup(data[i].event_clearance_subgroup);
			markers.addLayer(marker);
		};
		map.addLayer(markers);
	}

	// Count & Update Total Crime Incidents in Request
	function countTotalCrimes(data){
		var countCrimes = data.length;
		$('span#crime-count').text(countCrimes + " ");
		countCrimeTypes(data);
	}

	// Sort Object by converting to array
	function sortProperties(obj){
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

	// Count Crimes by Type
	function countCrimeTypes(data){
		var crimeCount = {};
		for (var i = data.length - 1; i >= 0; i--) {
		    crimeCount[data[i].event_clearance_subgroup] = (crimeCount[data[i].event_clearance_subgroup] || 0) + 1;
		}

		// Use sortProperties function 
		var sortedCrimeCount = sortProperties(crimeCount);
		$('.data-list').html("");
		// Add crime types to data list, first clearing data
    	for (var i = 0; i < sortedCrimeCount.length; i++){
		    if (sortedCrimeCount[i][1] > 1) {
		    	$('.data-list').append("<p class='incident-type-count-"+((i%2))+"'>"+sortedCrimeCount[i][0].toLowerCase()+": <span class='crime-count-type'>"+ sortedCrimeCount[i][1]+"</span></p>");
		    }
    	}
	}

	// AJAX Request of Data
	function ajaxDataRequest(url){
		console.log('GET', url);

		// Clear existing markers before new data request
		markers.clearLayers();

		$.ajax({
			method: 'GET',
			url: url,
		}).done(function(data, status) {
			// window.socrataData = data;
			console.log('done with call:', status, data);
			console.log(data.length + " Records fetched.");
			plotCrimeDataOnMap(data);
			countTotalCrimes(data);
		}).fail(function(xhr, status, err) {
			console.error('fail', status, err);
		});
	}

	// 
	// Bring in Crime Data with start and end times
	function requestAndPlotCrimeData(beginDay, endDay, semanticDay){
		// Set Up Request URL for Crime
		var datasetUrl = "https://data.seattle.gov/resource/3k2p-39jp.json";
		// SoQL param for 1 mile radius
		var whereInCircleParam = "?$where=within_circle(incident_location, "+centuryLinkCoords[0]+", "+ centuryLinkCoords[1]+", "+metersInAMile+")";
		// date range SoQL param
		var dateRangeParam = " and event_clearance_date>'"+beginDay+"'" + " and event_clearance_date<'"+endDay+"'";
		// FULL Concat URL
		var url = datasetUrl + whereInCircleParam + dateRangeParam;
		console.log('Starting Time: ' + beginDay);
		console.log('Ending Time: ' + endDay);
		// Make AJAX Call passing in URL
		ajaxDataRequest(url);
		// Update data panel day in title
		$('#crime-date-view').text(semanticDay);
	}

	function requestDataForYesterday(){
		// Using Moment js library to create start and end dates for Today
		var yesterday = moment().subtract(1, 'days');
		var yesterdayStart = yesterday.startOf('day').toISOString();
		var yesterdayEnd = yesterday.endOf('day').toISOString();
		requestAndPlotCrimeData(yesterdayStart, yesterdayEnd, "Yesterday");
	}

	// Requests new Data for Yesteday
	$('button#trigger-yesterday').click(requestDataForYesterday);	

	// Requests New Data for Today
	$('button#trigger-today').click(function(){
		// Using Moment js library to create start and end dates for Today
		var todayStart = moment().startOf('day').toISOString();
		var todayEnd = moment().endOf('day').toISOString();
		requestAndPlotCrimeData(todayStart, todayEnd, "Today");
	});

	// Requests New Data for Last Sounders Home Game
	$('button#trigger-sounders').click(function(){
		var lastSoundersGame = moment("2014 11 30", "YYYY MM DD");
		console.log(lastSoundersGame);
		var soundersStart = lastSoundersGame.startOf('day').toISOString();
		var soundersEnd = lastSoundersGame.endOf('day').toISOString();
		requestAndPlotCrimeData(soundersStart, soundersEnd, "Sounders Game on " + lastSoundersGame.calendar());
	});	

	// Requests New Data for Last Seahawks Home Game
	$('button#trigger-seahawks').click(function(){
		var lastSeahawksGame = moment("2015 01 18", "YYYY MM DD");
		var seahawksStart = lastSeahawksGame.startOf('day').toISOString();
		var seahawksEnd = lastSeahawksGame.endOf('day').toISOString();
		requestAndPlotCrimeData(seahawksStart, seahawksEnd, "Seahawks Game on " + lastSeahawksGame.calendar());
	});

	// Default display is Yesterday
	requestDataForYesterday();
	
}


var map = new CrimeDataMap('map');

