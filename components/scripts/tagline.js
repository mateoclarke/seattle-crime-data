var $ = require('jquery');


var tagline = 'Playing with crime data in Seattle';

(function taglineFill (item){
	return $('.tagline').prepend(item);
})(tagline);



