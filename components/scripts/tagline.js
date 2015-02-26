var $, fill;

$ = req('jquery');

(fill = function(item) {
  return $('.tagline').append("" + item);
})('Playing with crime data in Seattle');

fill;
