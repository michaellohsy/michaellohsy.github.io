angular.module('psi')

.controller("PsiController", ['neaapi', function (neaapi) {
    var self = this;
    
    self.abbrs = {"NRS" : "National Reporting Stations",
                  "rNO" : "North Region", 
                  "rSO" : "South Region",
                  "rCE" : "Central Region",
                  "rWE" : "West Region",
                  "rEA" : "East Region"};

    self.pollutants = ["NPSI", "NO2_1HR_MAX", "PM10_24HR", "PM25_24HR", "SO2_24HR", "CO_8HR_MAX", 
        "O3_8HR_MAX", "NPSI_CO", "NPSI_O3", "NPSI_PM10", "NPSI_PM25", "NPSI_SO2"];

    self.psi_bands = [{"threshold": 50, "descriptor": "Good"},
                  {"threshold": 100, "descriptor": "Moderate"},
                  {"threshold": 200, "descriptor": "Unhealthy"},
                  {"threshold": 300, "descriptor": "Very unhealthy"},
                  {"threshold": 10000, "descriptor": "Hazardous"}];

    neaapi.psi().get(function(data){
      self.data = data;
    });

    self.getTitle = function () {
      if(self.data) {
        return self.data.channel.title;
      }
    }

    self.getSource = function() {
      if(self.data) {
        return self.data.channel.source;
      }
    }
    
    self.getRegions = function() {
      if(self.data) {
        return self.data.channel.item.region;
      }
    }

    self.getPollutantReading = function (readings, pollutant) {
      for(var i=0; i<readings.length; i++) {
        var item = readings[i];
        if(item._type == pollutant) {
          return item._value;
        }
      }
    }

    self.getPSIDescriptor = function (psi) {
      if(self.data) {
        for(var i=0; i<self.psi_bands.length; i++) {
          var current_band = self.psi_bands[i];
          if(psi <= current_band.threshold) {
            return current_band.descriptor;
          }
        }
      }
      return "";
    }

    self.getDate = function(str) {
      var s = str.slice(0,4) + "-" + str.slice(4,6) + "-" + str.slice(6,8) + " " + str.slice(8,10) + ":" + str.slice(10,12) + ":" + str.slice(12,14);
      return s;
    }

    self.getNPSI = function() {
      if(self.data) {
        var regions = self.data.channel.item.region;
        for(var i=0;i<regions.length;i++) {
          if(regions[i].id = "NRS") {
            var arr = regions[i].record.reading;
            for(var j=0; j<arr.length; j++) {
              var item = arr[j];
              if(item._type == this.pollutants[0]) {
                return item._value;
              }
            }
          }
        }
      }
    }

}]);
