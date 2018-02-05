angular.module('nowcast')

    .controller('NowcastController', ['neaapi', '$scope', 'filterFilter', function (neaapi, $scope, filterFilter) {
        var self = this;

        neaapi.nowcast().get(function (data) {
            self.data = data;

            self.allCandidates = self.data.channel.item.weatherForecast.area;
            self.paginate();

            var forecasts = self.getWeatherForecast();
            for (var i = 0; i < forecasts.length; i++) {
                forecasts[i]._forecast = neaapi.getForecastDescription(forecasts[i]._forecast);
            }

        });

        self.getTitle = function () {
            if (self.data) {
                return self.data.channel.title;
            }
        }

        self.getForecastDate = function () {
            if (self.data) {
                var json = self.data.channel.item.forecastIssue;
                return json._date + " " + json._time;
            }
        }

        self.getValidTime = function () {
            if (self.data) {
                return self.data.channel.item.validTime;
            }
        }

        self.getWeatherForecast = function () {
            if (self.data) {
                return self.data.channel.item.weatherForecast.area;
            }
        };

        self.getCentralWeatherForecast = function () {
            if (self.data) {
                for (var i = 0; i < self.data.channel.item.weatherForecast.area.length; i++) {
                    var area = self.data.channel.item.weatherForecast.area[i];
                    if (area._name == "City") {
                        return area._forecast;
                    }
                }
            }
        }

        /**
         * Bootstrap table pagination code
         */

        self.paginate = function () {
            if (self.data) {

                //following variables are required for data-binding in the template
                self.totalItems = self.allCandidates.length;
                self.currentPage = 1;
                self.itemsPerPage = 7;

                $scope.$watch('$ctrl.currentPage', function (newValue, oldValue) {
                    setPagingData();
                });

                $scope.$watch('$ctrl.searchKeyword', function (newValue, oldValue) {
                    if (newValue !== oldValue) {
                        setPagingData();
                    }
                });

                // no need to reset page number if number of filtered items are too little. The pagination will take care of it
                function setPagingData() {
                    self.filteredCandidates = filterFilter(self.allCandidates, self.searchKeyword);
                    self.totalItems = self.filteredCandidates.length;
                    var pagedData = self.filteredCandidates.slice((self.currentPage - 1) * self.itemsPerPage, self.currentPage * self.itemsPerPage);
                    self.aCandidates = pagedData;

                }

            }
        }
    }]);
