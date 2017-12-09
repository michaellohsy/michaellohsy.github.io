angular.module('nowcast')

.controller("TodayController", ['neaapi', function (neaapi) {
    var self = this;
    
    neaapi.today().get(function(data){
      self.data = data;

      var keys = Object.keys(self.data.channel);
      var timePeriods = keys.slice(3);

      for(timePeriod of timePeriods) {
		self.data.channel[timePeriod].wxnorth = neaapi.getForecastDescription(self.data.channel[timePeriod].wxnorth);
		self.data.channel[timePeriod].wxsouth = neaapi.getForecastDescription(self.data.channel[timePeriod].wxsouth);
		self.data.channel[timePeriod].wxeast = neaapi.getForecastDescription(self.data.channel[timePeriod].wxeast);
		self.data.channel[timePeriod].wxwest = neaapi.getForecastDescription(self.data.channel[timePeriod].wxwest);
		self.data.channel[timePeriod].wxcentral = neaapi.getForecastDescription(self.data.channel[timePeriod].wxcentral);
      }

    });

    self.getTitle = function () {
      if(self.data) {
        return self.data.channel.main.title;
      }
    }
    
    self.getForecastDate = function() {
      if(self.data) {
        var json = self.data.channel.main.forecastIssue;
        return json._date + " " + json._time;
      }
    }
    
    self.getValidTime = function() {
      if(self.data) {
        return self.data.channel.main.validTime;
      }
    }
    
    self.getTempLow = function() {
      if(self.data) {
        var temperature = self.data.channel.main.temperature;
        return temperature._low;
      }
    }
    
    self.getTempHigh = function() {
      if(self.data) {
        var temperature = self.data.channel.main.temperature;
        return temperature._high;
      }
    }
    
    self.getHumidityLow = function () {
      if(self.data) {
        return self.data.channel.main.relativeHumidity._low;
      }
    }
    
    self.getHumidityHigh = function () {
      if(self.data) {
        return self.data.channel.main.relativeHumidity._high;
      }
    }
    
    self.getWindDirection = function() {
      if(self.data) {
		var direction = self.data.channel.main.wind._direction;
		direction = direction.slice(0,1).toUpperCase() + direction.slice(1).toLowerCase();
        return direction;
      }
    }
    
    self.getWindSpeed = function() {
      if(self.data) {
        return self.data.channel.main.wind._speed;
      }
    }
    
    self.getMainForecast = function () {
      if(self.data) {
        return self.data.channel.main.wxmain;
      }
    }
    
    self.getMainForecastDescription = function () {
      if(self.data) {
        return self.data.channel.main.forecast;
      }
    }
    
    self.getMainForecastDescription = function () {
      if(self.data) {
        return self.data.channel.main.forecast;
      }
    }

    self.getForecastTimePeriodArea = function() {
      if(self.data) {
        var keys = Object.keys(self.data.channel);
        var timePeriods = keys.slice(3);
        var array = [];
        for(timePeriod of timePeriods) {
          var obj = self.data.channel[timePeriod];
          obj['time_of_day'] = timePeriod;
          array.push(obj);
        };
        return array;
      }
    }

}]);
