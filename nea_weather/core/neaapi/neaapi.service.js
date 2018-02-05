angular.module('core.neaapi')

    .service('neaapi', ['$http', '$resource', function ($http, $resource) {

        var url = "http://api.nea.gov.sg/api/WebAPI/?dataset=";
        var key = "&keyref=781CF461BB6606ADC49D8386041BBFD2708A29DB3A0C910C";

        var nowcastURL = url + "2hr_nowcast" + key;
        var todayURL = url + "24hrs_forecast" + key;
        var fourDaysURL = url + "4days_outlook" + key;
        var heavyRainURL = url + "heavy_rain_warning" + key;
        var psiURL = url + "psi_update" + key;
        var pm25URL = url + "pm2.5_update" + key;

        var forecastDescriptionMap = {
            "BR": "Mist",
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
            "PC": "Partly Cloudy (Day)",
            "PN": "Partly Cloudy (Night)",
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

        var xml_to_json = function (xml) {
            var x2js = new X2JS();
            var json = x2js.xml_str2json(xml);
            return json;
        }

        var getResource = function (url) {
            return $resource(url, {}, {
                get: {
                    method: 'GET',
                    transformResponse: function (data, headers) {
                        var x2js = new X2JS();
                        var json = x2js.xml_str2json(data);
                        return json;
                    }
                }
            });
        };

        this.nowcast = function () {
            return getResource(nowcastURL);
        };

        this.today = function () {
            return getResource(todayURL);
        };

        this.fourDays = function () {
            return getResource(fourDaysURL);
        };

        this.heavyRain = function () {
            return getResource(heavyRainURL);
        };

        this.psi = function () {
            return getResource(psiURL);
        };

        this.pm25 = function () {
            return getResource(pm25URL);
        };

        this.getForecastDescription = function (abbreviation) {
            return forecastDescriptionMap[abbreviation];
        }

    }])
    //prototype - not in use yet
    .service('generalPurposeDictionary', [function () {
        var kvp = {};
        return {
            setKVP: function (key, value) {
                kvp[key] = value;   //provided it's a string key
            },
            getValueFromKey: function (key) {
                return kvp[key];
            }
        }
    }])
    .service('timeUtils', [function () {
        var time = new Date();
        return {
            getHour: function (fmt24hrs) {
                fmt24hrs = fmt24hrs || 0;
                var hour = time.getHours();
                if (fmt24hrs)
                    return hour;
                else
                    return hour > 12 ? hour - 12 : hour;
            },
            getAmPm: function () {
                if (time.getHours() >= 12)
                    return "PM";
                else
                    return "AM";
            }
        }
    }])
    .service('currentActive', [function () {
        var activeMenuId = "";
        return {
            setActiveMenuId: function (menuId) {
                activeMenuId = menuId;
            },
            getActiveMenuId: function () {
                return activeMenuId;
            }
        }
    }])
    .service('weatherToIcon', [function () {
        var groupedWeatherPatterns = [
            "BR,FG,HZ,LH",                  //mist, haze kind
            "HG,HT,TL",                     //thundery rains
            "HR,HS,DR,LR,LS,RA,PS,SH",      //showery rains
            "FA,FN,FW",                     //generally fair
            "CL,OC",                        //cloudy
            "PC,PN",                        //partly cloudy
            "SK,SR,WR,WS",                  //windy rain
            "SN,SS",                        //snowy type weather - who are we kidding
            "SU",                           //sunny
            "SW,WF,WC"                      //windy
        ];

        var iconMatrix = [
            "wi-smog",
            "wi-thunderstorm",
            "wi-rain",
            "wi-day-sunny-overcast",
            "wi-cloudy",
            "wi-cloud",
            "wi-rain-wind",
            "wi-snow",
            "wi-day-sunny",
            "wi-strong-wind"
        ];

        return {
            getWeatherPatternGroups: function () {
                return groupedWeatherPatterns;
            },
            getIconsMatrix: function () {
                return iconMatrix;
            },
            //The following length functions are wrappers around the length properties of the arrays.
            //Use these functions when .length fails for weird some reason. Currently no need.
            patternArrayLength: function () {
                return groupedWeatherPatterns.length;
            },
            iconArrayLength: function () {
                return iconMatrix.length;
            }
        }
    }]);

