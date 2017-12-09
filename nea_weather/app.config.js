angular.module('neaWeatherApp')
.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {

  $locationProvider.hashPrefix('!');

	$routeProvider
	.when("/", {
        templateUrl: 'main.html'
    })
    .when('/nowcast', {
      	template: '<nowcast></nowcast>'
    })
    .when('/today', {
      	template: "<today></today>"
    })
    .when('/fourDays', {
        template: "<four-days></four-days>"
    })
    .when('/heavyRain', {
        template: "<heavy-rain></heavy-rain>"
    })
    .when('/psi', {
        template: "<psi></psi>"
    })
    .when('/pm25', {
        template: "<pm25></pm25>"
    })
    .otherwise({
        template : "<h1>None</h1><p>Nothing has been selected</p>"
    });
}]);
