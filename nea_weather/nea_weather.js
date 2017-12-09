angular.module('NEAWeatherApp',['ngRoute'])

.config(function($routeProvider) {
	$routeProvider
	.when("/", {
    	template: "<h1>This is the main page</h1>"
    })
    .when('/nowcast', {
      	templateUrl: "nowcast.html",
      	controller: "nowcastController"
    })
    .when('/twentyfour', {
      	templateUrl: "twentyfour.html",
      	controller: "twentyfourController"
    })
    .otherwise({
        template : "<h1>None</h1><p>Nothing has been selected</p>"
    });;
})

.service('neaService', ['$http', function($http) {

	var url = "http://api.nea.gov.sg/api/WebAPI/?dataset=";
	var key = "&keyref=781CF461BB6606ADC49D8386041BBFD2708A29DB3A0C910C";
	
	var nowcastURL = url + "2hr_nowcast" + key;
	var twentyfourURL = url + "24hrs_forecast" + key;
	
	var xml_to_json = function(xml) {
		var x2js = new X2JS();
		var json = x2js.xml_str2json(xml);
		return json;
	}
	
	this.nowcast = function() {
		return $http.get(nowcastURL, {transformResponse: xml_to_json});
	};
	
	this.twentyfour = function() {
		return $http.get(twentyfourURL, {transformResponse: xml_to_json});
	};

}])

.controller('nowcastController', ['$scope', 'neaService', function($scope, neaService) {
	
	$scope.data;
	
	getData();
	
	function getData() {
		neaService.nowcast().then(function(data) {
			console.log(data);
			$scope.data = data.data;
		});
	}
	
	$scope.getTitle = function () {
		if($scope.data) {
			return $scope.data.channel.title;
		}
	}
	
	$scope.getForecastDate = function() {
		if($scope.data) {
			var json = $scope.data.channel.item.forecastIssue;
			return json._date + " " + json._time;
		}
	}
	
	$scope.getValidTime = function() {
		if($scope.data) {
			return $scope.data.channel.item.validTime;
		}
	}
	
	$scope.getWeatherForecast = function() {
		if($scope.data) {
			return $scope.data.channel.item.weatherForecast.area;
		}
	};
	
}])

.controller('twentyfourController', ['$scope', 'neaService', function($scope, neaService) {
	
	$scope.data;
	
	getData();
	
	function getData() {
		neaService.twentyfour().then(function(data) {
			console.log(data);
			$scope.data = data.data;
		});
	}
	
	$scope.getTitle = function () {
		if($scope.data) {
			return $scope.data.channel.main.title;
		}
	}
	
	$scope.getForecastDate = function() {
		if($scope.data) {
			var json = $scope.data.channel.main.forecastIssue;
			return json._date + " " + json._time;
		}
	}
	
	$scope.getValidTime = function() {
		if($scope.data) {
			return $scope.data.channel.main.validTime;
		}
	}
	
	$scope.getTempLow = function() {
		if($scope.data) {
			var temperature = $scope.data.channel.main.temperature;
			return temperature._low + " " + temperature._unit;
		}
	}
	
	$scope.getTempHigh = function() {
		if($scope.data) {
			var temperature = $scope.data.channel.main.temperature;
			return temperature._high + " " + temperature._unit;
		}
	}
	
	$scope.getHumidityLow = function () {
		if($scope.data) {
			return $scope.data.channel.main.relativeHumidity._low;
		}
	}
	
	$scope.getHumidityHigh = function () {
		if($scope.data) {
			return $scope.data.channel.main.relativeHumidity._high;
		}
	}
	
	$scope.getWindDirection = function() {
		if($scope.data) {
			return $scope.data.channel.main.wind._direction;
		}
	}
	
	$scope.getWindSpeed = function() {
		if($scope.data) {
			return $scope.data.channel.main.wind._speed;
		}
	}
	
	$scope.getMainForecast = function () {
		if($scope.data) {
			return $scope.data.channel.main.wxmain;
		}
	}
	
	$scope.getMainForecastDescription = function () {
		if($scope.data) {
			return $scope.data.channel.main.forecast;
		}
	}
	
	$scope.getMainForecastDescription = function () {
		if($scope.data) {
			return $scope.data.channel.main.forecast;
		}
	}
	
	function getTimePeriod(period){
		if($scope.data) {
			return $scope.data.channel[period].timePeriod;
		}
	}
	
	function getForecastByPeriodSection(period, section){
		if($scope.data) {
			return $scope.data.channel[period][section];
		}
	}
	
	$scope.getNightTimePeriod = function () {
		return getTimePeriod("night");
	}
	
	$scope.getForecastNightEast = function () {
		return getForecastByPeriodSection("night", "wxeast");
	}
	
	/*
	$scope.getTitle = function () {
		if($scope.nowcast) {
			return $scope.nowcast.data.channel.title;
		}
	}
	
	$scope.getForecastDate = function() {
		if($scope.nowcast) {
			var json = $scope.nowcast.data.channel.item.forecastIssue;
			return json._date + " " + json._time;
		}
	}
	
	$scope.getValidTime = function() {
		if($scope.nowcast) {
			return $scope.nowcast.data.channel.item.validTime;
		}
	}
	
	$scope.getWeatherForecast = function() {
		if($scope.nowcast) {
			return $scope.nowcast.data.channel.item.weatherForecast.area;
		}
	};
	*/
}]);

/*
.service('neaapi', ['$http', function($http) {

	//https://stackoverflow.com/questions/12505760/processing-http-response-in-service
	
	var xml_to_json = function(xml) {
		var x2js = new X2JS();
		var json = x2js.xml_str2json(xml);
		return json;
	}
	
	this.nowcast = function() {
		var url = "http://api.nea.gov.sg/api/WebAPI/?dataset=2hr_nowcast&keyref=781CF461BB6606ADC49D8386041BBFD2708A29DB3A0C910C";
		var promise = $http.get(url, {transformResponse: xml_to_json}).then(function(response) {
			return response.data;
		});
		return promise;
	};

}])

.controller('NEAWeatherController', function(neaapi) {
	var self = this;
  
	self.test = 'Hola!';
  
	neaapi.nowcast().then(function(data){
		console.log(data);
		self.title = data.channel.title;
		self.date = data.channel.item.forecastIssue._date
		self.time = data.channel.item.validTime
		self.nowcast = data.channel.item.weatherForecast.area
	});
  
});
*/


// .factory('neaapi', ['$http', function($http) {
// 
//  //  var xml_to_json = function(data) {
// //     var x2js = new X2JS();
// //     var json = x2js.xml2json(data);
// //   }
// //   
// //  //  var nowcast = {};
// // //   var url = "http://api.nea.gov.sg/api/WebAPI/?dataset=2hr_nowcast&keyref=781CF461BB6606ADC49D8386041BBFD2708A29DB3A0C910C";
// // // 		
// // //   $http.get(url, {transformResponse: xml_to_json}).then(function(response) {
// // //     nowcast = response;
// // //   });
// // 	
//   var nowcast = "its working!";
//   
//   var get_nowcast = function() {
//     return nowcast;
//   }
// //   
// //   return nowcast;
// 
// return {get: get_nowcast};
// 		
// }]);

// myApp.factory('neaapi', ['$http', function($http) {
// 
// 	var xml_to_json = function(data) {
// 		var x2js = new X2JS();
// 		var json = x2js.xml2json(data);
// 		return json;
// 	}
// 
// 	var nowcast = {};
// 	var url = "http://api.nea.gov.sg/api/WebAPI/?dataset=2hr_nowcast&keyref=781CF461BB6606ADC49D8386041BBFD2708A29DB3A0C910C";
// 		
// 	$http.get(url, {transformResponse: xml_to_json}).then(function(response) {
// 		nowcast = response;
// 	});
// 	
// 	return {
// 		nowcast: nowcast;
// 	};
//   
// });


