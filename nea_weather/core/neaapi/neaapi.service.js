angular.module('core.neaapi')

.service('neaapi', ['$http', '$resource', function($http, $resource) {

	var url = "http://api.nea.gov.sg/api/WebAPI/?dataset=";
	var key = "&keyref=781CF461BB6606ADC49D8386041BBFD2708A29DB3A0C910C";
	
	var nowcastURL = url + "2hr_nowcast" + key;
	var todayURL = url + "24hrs_forecast" + key;
	var fourDaysURL = url + "4days_outlook" + key;
	var heavyRainURL = url + "heavy_rain_warning" + key;
	var psiURL = url + "psi_update" + key;
	var pm25URL = url + "pm2.5_update" + key;
	
	var forecastDescriptionMap = {"BR": "Mist",
					"CL": "Cloudy",
					"DR": "Drizzle",
					"FA": "Fair (Day)",
					"FG": "Fog",
					"FN": "Fair (Night)",
					"FW": "Fair & Warm",
					"HG": "Heavy Thundery Showers with Gusty Winds",
					"HR": "Heavy Rain",
					"HS": "Heavy Showers",
					"HT": "Heavy Thundery Showers",
					"HZ": "Hazy",
					"LH": "Slightly Hazy",
					"LR": "Light Rain",
					"LS": "Light Showers",
					"OC": "Overcast",
					"PC": "Partly Cloud (Day)",
					"PN": "Partly Cloud (Night)",
					"PS": "Passing Showers",
					"RA": "Moderate Rain",
					"SH": "Showers",
					"SK": "Strong Winds, Showers",
					"SN": "Snow",
					"SR": "Strong Winds, Rain",
					"SS": "Snow Showers",
					"SU": "Sunny",
					"SW": "Strong Winds",
					"TL": "Thundery Showers",
					"WC": "Windy, Cloudy",
					"WD": "Windy",
					"WF": "Windy Fair",
					"WR": "Windy Rain",
					"WS": "Windy Showers"
				};

	var xml_to_json = function(xml) {
		var x2js = new X2JS();
		var json = x2js.xml_str2json(xml);
		return json;
	}
	
	var getResource = function(url) {
		return $resource(url, {}, {
			get: {
				method: 'GET',
				transformResponse: function(data, headers) {
					var x2js = new X2JS();
					var json = x2js.xml_str2json(data);
					return json; 
				}
			}
		});
	};

	this.nowcast = function() {		
		return getResource(nowcastURL);
	};

	this.today = function() {
		return getResource(todayURL);
	};

	this.fourDays = function() {
		return getResource(fourDaysURL);
	};

	this.heavyRain = function() {
		return getResource(heavyRainURL);
	};

	this.psi = function() {
		return getResource(psiURL);
	};

	this.pm25 = function() {
		return getResource(pm25URL);
	};

	this.getForecastDescription = function(abbreviation) {
		return forecastDescriptionMap[abbreviation];
	}

}]);
