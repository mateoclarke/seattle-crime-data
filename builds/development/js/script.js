(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
function CrimeDataMap(attributes){
	
	// Lat Long for CenturyLink Field
	var centuryLinkCoords = [47.595206, -122.331639];

	// our Leaflet Map
	var map = L.map('map', {
		center: centuryLinkCoords,
		zoom: 14,
		scrollWheelZoom: false
	})

	//  add tile Layer from Mapquest
	L.tileLayer(
	    // Mapbox Streets-Satellite
	    'http://api.tiles.mapbox.com/v4/mapbox.streets-satellite/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWF0ZW9jb2RlcyIsImEiOiJUZVVZSVBvIn0.PkZleldXk_6KCuoGhx6-CA'

		// Satelite Tile
		// 'http://otile1.mqcdn.com/tiles/1.0.0/sat/{z}/{x}/{y}.jpg'

		// Plain (ugly) Mapquest Tiles
		// 'http://otile1.mqcdn.com/tiles/1.0.0/map/{z}/{x}/{y}.jpg'

		// Open Street Map Tile
	    // 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
	).addTo(map);

	// Set up Marker Layer
	var markers = new L.layerGroup();

	// Creates a one mile circle centered on CenturyLink
	function drawOneMileCircle(meters){

		L.circle(centuryLinkCoords, meters, {color: "red", fillColor: "#FFEEBE"})
		    .bindPopup("My radius is " + meters + " meters!").addTo(map);

	}
	// Draw the Circle
	var metersInAMile = 1609.34;
	var circle = new drawOneMileCircle(metersInAMile);

	// Create variables for special marker icons
	// Colors for markers
	var red = '#d53e4f';
	var orange = '#f46d43';
	var ltOrange = '#fdae61';
	var yellow = '#fee08b';
	var ltYellow = '#ffffbf';
	var ltGreen = '#e6f598';
	var green = '#abdda4';
	var teal =	'#66c2a5';
	var blue =  '#3F84FF';

	var boozeIcon = L.MakiMarkers.icon({
	    icon: "alcohol-shop",
	    color: green,
	    size: "l"
	});	

	var traffic = L.MakiMarkers.icon({
	    icon: "bus",
	    color: blue,
	    size: "l"
	});

	var car = L.MakiMarkers.icon({
	    icon: "car",
	    color: orange,
	    size: "l"
	});

	var parking = L.MakiMarkers.icon({
	    icon: "parking",
	    color: blue,
	    size: "l"
	});

	var narcotics = L.MakiMarkers.icon({
	    icon: "pharmacy",
	    color: green,
	    size: "l"
	});

	var theft = L.MakiMarkers.icon({
	    icon: "shop",
	    color: ltOrange,
	    size: "l"
	});

	var hazards = L.MakiMarkers.icon({
	    icon: "danger",
	    color: orange,
	    size: "l"
	});

	var suspicious = L.MakiMarkers.icon({
	    icon: "pitch",
	    color: ltYellow,
	    size: "l"
	});

	var disturb = L.MakiMarkers.icon({
	    icon: "school",
	    color: yellow,
	    size: "l"
	});

	var assault = L.MakiMarkers.icon({
	    icon: "police",
	    color: red,
	    size: "l"
	});

	var property = L.MakiMarkers.icon({
	    icon: "commercial",
	    color: ltOrange,
	    size: "l"
	});

	var mental = L.MakiMarkers.icon({
	    icon: "hospital",
	    color: green,
	    size: "l"
	});

	// Plot Crime Data with Leaflet Markers
	function plotCrimeDataOnMap(data){
		for (var i = data.length - 1; i >= 0; i--) {
			if (data[i].event_clearance_subgroup == "LIQUOR VIOLATIONS"){
				var marker = L.marker([data[i].latitude, data[i].longitude], 
							{icon: boozeIcon})
							.bindPopup(data[i].event_clearance_subgroup);
				markers.addLayer(marker);
			} else if (data[i].event_clearance_subgroup == "TRAFFIC RELATED CALLS"){
				var marker = L.marker([data[i].latitude, data[i].longitude], 
							{icon: traffic})
							.bindPopup(data[i].event_clearance_subgroup);
				markers.addLayer(marker);
			} else if (data[i].event_clearance_subgroup == "CAR PROWL"){
				var marker = L.marker([data[i].latitude, data[i].longitude], 
							{icon: car})
							.bindPopup(data[i].event_clearance_subgroup);
				markers.addLayer(marker);
			} else if (data[i].event_clearance_subgroup == "PARKING VIOLATIONS"){
				var marker = L.marker([data[i].latitude, data[i].longitude], 
							{icon: parking})
							.bindPopup(data[i].event_clearance_subgroup);
				markers.addLayer(marker);
			} else if (data[i].event_clearance_subgroup == "NARCOTICS COMPLAINTS"){
				var marker = L.marker([data[i].latitude, data[i].longitude], 
							{icon: narcotics})
							.bindPopup(data[i].event_clearance_subgroup);
				markers.addLayer(marker);
			}  else if (data[i].event_clearance_subgroup == "HAZARDS"){
				var marker = L.marker([data[i].latitude, data[i].longitude], 
							{icon: hazards})
							.bindPopup(data[i].event_clearance_subgroup);
				markers.addLayer(marker);
			}  else if (data[i].event_clearance_subgroup == "SUSPICIOUS CIRCUMSTANCES"){
				var marker = L.marker([data[i].latitude, data[i].longitude], 
							{icon: suspicious})
							.bindPopup(data[i].event_clearance_subgroup);
				markers.addLayer(marker);
			}  else if (data[i].event_clearance_subgroup == "COMMERCIAL BURGLARIES" ||
						data[i].event_clearance_subgroup == "ROBBERY" ||
						data[i].event_clearance_subgroup == "AUTO THEFTS" ||
						data[i].event_clearance_subgroup == "BURGLARY ALARMS (FALSE)" ||
						data[i].event_clearance_subgroup == "THEFT" ){
				var marker = L.marker([data[i].latitude, data[i].longitude], 
							{icon: theft})
							.bindPopup(data[i].event_clearance_subgroup);
				markers.addLayer(marker);
			}   else if (data[i].event_clearance_subgroup == "ASSAULTS" || 
						data[i].event_clearance_subgroup == "WARRANT CALLS" ||
						data[i].event_clearance_subgroup == "CASUALTIES" ){
				var marker = L.marker([data[i].latitude, data[i].longitude], 
							{icon: assault})
							.bindPopup(data[i].event_clearance_subgroup);
				markers.addLayer(marker);
			} 	else if (data[i].event_clearance_subgroup == "MENTAL CALL"){
				var marker = L.marker([data[i].latitude, data[i].longitude], 
							{icon: mental})
							.bindPopup(data[i].event_clearance_subgroup);
				markers.addLayer(marker);
			} 	else if (data[i].event_clearance_subgroup == "DISTURBANCES" ||
						data[i].event_clearance_subgroup == "TRESPASS"||
						data[i].event_clearance_subgroup == "MISCELLANEOUS MISDEMEANORS"||
						data[i].event_clearance_subgroup == "NUISANCE, MISCHIEF COMPLAINTS" ){
				var marker = L.marker([data[i].latitude, data[i].longitude], 
							{icon: disturb})
							.bindPopup(data[i].event_clearance_subgroup);
				markers.addLayer(marker);
			} 	else if (data[i].event_clearance_subgroup == "PROPERTY DAMAGE" ||
						data[i].event_clearance_subgroup == "PROPERTY - MISSING, FOUND" ){
				var marker = L.marker([data[i].latitude, data[i].longitude], 
							{icon: disturb})
							.bindPopup(data[i].event_clearance_subgroup);
				markers.addLayer(marker);
			} else {
				var marker = L.marker([data[i].latitude, data[i].longitude])
							.bindPopup(data[i].event_clearance_subgroup);
				markers.addLayer(marker);
			}
		};
		map.addLayer(markers);
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

	// Count & Update Total Crime Incidents in Request
	function countTotalCrimes(data){
		var countCrimes = data.length;
		$('span.crime-count').text(countCrimes + " ");
		countCrimeTypes(data);
	}


	// Count & Display Crimes by Type
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
		    if (sortedCrimeCount[i][1]) {
		    	$('.data-list').append("<p class='incident-type-count-"+((i%2))+"'>"+sortedCrimeCount[i][0].toLowerCase()+": <span class='crime-count-type'>"+ sortedCrimeCount[i][1]+"</span></p>");
		    }
    	}
    	console.log(sortedCrimeCount);
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
		$('.crime-date-view').text(semanticDay);
	}

	//default display is Yesterday
	function requestDataForYesterday(){
		// Using Moment js library to create start and end dates for Today
		var yesterday = moment().subtract(1, 'days');
		var yesterdayStart = yesterday.startOf('day').toISOString();
		var yesterdayEnd = yesterday.endOf('day').toISOString();
		requestAndPlotCrimeData(yesterdayStart, yesterdayEnd, "Yesterday");
	};
	requestDataForYesterday();

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
}


var map = new CrimeDataMap('map');


},{}]},{},[1])