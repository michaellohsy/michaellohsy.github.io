/**
 * Directives that are not view-specific
 */
angular
    .module('core.neaapi')
    .directive('theDateNow', ['$filter', function ($filter) {
        return function (scope, element, attrs) {
            var dateFormat = 'EEEE, MMM d';
            element.html($filter('date')(new Date(), dateFormat));
        }
    }])
    .directive('activeMenu', ['currentActive', function (currentActive) {
        var menuElements = [];
        var firstTime = true;

        function setActive(element, menuId) { //nested function that adds the css class
            if (currentActive.getActiveMenuId() === menuId) {
                element.addClass('active');
                element.removeClass('inactive')
            }
            else {
                element.removeClass('active');
                element.addClass('inactive');
            }
        }

        return function (scope, element, attrs) {
            var menuId = attrs["activeMenu"];
            menuElements.push({id: menuId, node: element});

            if (firstTime) {
                scope.$watch(currentActive.getActiveMenuId, function (newValue, oldValue) {
                    for (var i = 0; i < menuElements.length; i++) {
                        var menuElement = menuElements[i];
                        setActive(menuElement.node, menuElement.id);
                    }
                });
                firstTime = false;
            }
        }
    }])
    .directive('activeViewItem', ['currentActive', function (currentActive) {
        return function (scope, element, attrs) {
            currentActive.setActiveMenuId(attrs["activeViewItem"]);
            console.log("link function 1 executing" + " active menu is: " + currentActive.getActiveMenuId()); //tracing link fn
        }
    }])
    .directive('hourlyIcon', ['timeUtils', function (timeUtils) {
        var hourMap = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
        var baseHtml = "<i id=\"icoClock\" class=\"wi wi-time-" + hourMap[timeUtils.getHour()] + "\"></i>";
        return function (scope, element, attrs) {
            console.log('testing link fn ' + baseHtml);
            element.html(baseHtml);
        }
    }])
    .directive('assignWeatherIcon', ['neaapi', 'weatherToIcon', function (neaapi, weatherToIcon) {
        var groupedWeatherPatterns = weatherToIcon.getWeatherPatternGroups();
        var iconMatrix = weatherToIcon.getIconsMatrix();
        var prependHtml = "<i class=\"weatherIconsOnly wi ";
        var appendHtml = "\"></i>";

        return ({
            link: function (scope, element, attrs) {
                neaapi.today().get(function (data) {
                    scope.data = data;  //may not really be necessary to bind to scope
                    console.log(scope.data.channel.main.forecast);
                    console.log(scope.data.channel.main.wxmain);
                    var index = -1;
                    for (var i = 0; i < groupedWeatherPatterns.length; i++) {
                        if (groupedWeatherPatterns[i].indexOf(scope.data.channel.main.wxmain) > -1) {
                            index = i;
                            break;
                        }
                    }
                    if (i != -1)
                        element.html(prependHtml + iconMatrix[i] + appendHtml);
                });
            },
            restrict: "A"
        });
    }])
    //Can possibly combine this directive with the one above and separate based on logic.
    //The only difference lies in whether there's an extra directive attribute or not.
    //lazy to merge these for now. Will clean up code next time xD
    .directive('assignWeatherIconWithInput', ['weatherToIcon', function (weatherToIcon) {
        var groups = weatherToIcon.getWeatherPatternGroups();
        var icons = weatherToIcon.getIconsMatrix();
        var prependHtml = "<i class=\"mWeatherIcon wi ";
        var appendHtml = "\"></i>";

        return ({
            link: function (scope, element, attrs) {
                console.log("testing eval expression: " + attrs["theCode"]);
                var neaIconCode = attrs["theCode"];
                var index = -1;
                for (var i = 0; i < groups.length; i++) {
                    if (groups[i].indexOf(neaIconCode) > -1) {
                        index = i;
                        break;
                    }
                }
                if (i != -1)
                    element.html(prependHtml + icons[i] + appendHtml);
            },
            restrict: "AE"
        });
    }]);
