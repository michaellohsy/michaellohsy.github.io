angular.module('nowcast')

.controller('NowcastController', ['neaapi', function(neaapi){
  var self = this;

    neaapi.nowcast().get(function(data){
      self.data = data;

      var forecasts = self.getWeatherForecast();
      for(var i=0; i<forecasts.length; i++) {
        forecasts[i]._forecast = neaapi.getForecastDescription(forecasts[i]._forecast);
      }

    });

    self.getTitle = function () {
      if(self.data) {
        return self.data.channel.title;
      }
    }
    
    self.getForecastDate = function() {
      if(self.data) {
        var json = self.data.channel.item.forecastIssue;
        return json._date + " " + json._time;
      }
    }
    
    self.getValidTime = function() {
      if(self.data) {
        return self.data.channel.item.validTime;
      }
    }
    
    self.getWeatherForecast = function() {
      if(self.data) {
        return self.data.channel.item.weatherForecast.area;
      }
    };

    self.getCentralWeatherForecast = function() {
      if(self.data) {
        for(var i=0; i<self.data.channel.item.weatherForecast.area.length; i++) {
          var area = self.data.channel.item.weatherForecast.area[i];
          if(area._name == "City") {
            return area._forecast;
          }
        }
      }
    }

}]);
