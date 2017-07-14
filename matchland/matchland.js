angular.module('matchlandApp', [])
.filter('mlfilter', function() {
  return function(arr, s1, s2, s3, s4) {	
  	if(arr){
  		filtered = [];
	  	for(var i=0; i<arr.length; i++) {  			
  			if(s1 && /^1/.test(arr[i].stage)) {
	  			filtered.push(arr[i]);
  			}
  			if(s2 && /^2/.test(arr[i].stage)) {
	  			filtered.push(arr[i]);
  			}
  			if(s3 && /^3/.test(arr[i].stage)) {
	  			filtered.push(arr[i]);
  			}
  			if(s4 && /^4/.test(arr[i].stage)) {
	  			filtered.push(arr[i]);
  			}
  		}
  		return filtered;
  	} else {
  		return arr;
  	}
  };
})
.controller('MatchlandController', function MatchlandController($scope, $http) {
	
	$scope.sortType     = 'stage'; // set the default sort type
	$scope.sortReverse  = false;  // set the default sort order

  	// for the checkboxes
	$scope.s1 = true;
	$scope.s2 = true;
	$scope.s3 = true;
	$scope.s4 = true;
			
	$http.get('matchland.json').then(function(res){
		$scope.json = res.data;
		
		// this doesnt work. not sure why, probably something to do with scopes.
		// i know its an async call but why $scope works?
		this.json = res.data;
    });
});


