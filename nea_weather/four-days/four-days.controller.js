angular.module('fourDays')

.controller('FourDaysController', ['neaapi', function (neaapi) {
    var self = this;
    
    neaapi.fourDays().get(function(data){
      self.data = data;
    });

    self.getTitle = function () {
      if(self.data) {
        return self.data.channel.item.title;
      }
    }
    
    self.getForecastDate = function() {
      if(self.data) {
        var json = self.data.channel.item.forecastIssue;
        return json._date + " " + json._time;
      }
    }
    
    self.getDays = function() {
      if(self.data) {
        var days = self.data.channel.item.weatherForecast.day;
        return days;
      }
    }
    
    self.getForecastDescriptions = function() { 
      if(self.data) {
        var forecastDescriptions = self.data.channel.item.weatherForecast.forecast;
        return forecastDescriptions;
      }
    }
    
    self.getForecastsIcons = function () {
      if(self.data) {
        var forecasts = self.data.channel.item.weatherForecast.icon;
        return forecasts;
      }
    }
    
    self.getTemperatures = function () {
      if(self.data) {
        var temperatures = self.data.channel.item.weatherForecast.temperature;
        return temperatures.map(function(item) {
          return item._low + "° C - " + item._high + "° C";
        });
      }
    }
    
    self.getRelativeHumidities = function() {
      if(self.data) {
        var humidity = self.data.channel.item.weatherForecast.relativeHumidity;
        return humidity.map(function(item) {
          return item._low + "% - " + item._high + "%";
        });
      }
    }
    
    self.getWindInformation = function() {
      if(self.data) {
        var wind = self.data.channel.item.weatherForecast.wind;
        return wind.map(function(item) {
          return "Direction: " + item._direction + ", Speed: " + item._speed;
        });
      }
    }

}]);