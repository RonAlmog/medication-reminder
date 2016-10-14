'use strict';

angular.module('medicationReminderApp').controller('MainCtrl', function ($scope, $http, $window, $filter) {

    var start = moment().format('MM/DD/YYYY'),
        end = moment().add(1, 'day').format('MM/DD/YYYY');

    $scope.meds = [];
    $scope.dt = new Date();

    $scope.getData = function(){
    	start = moment($scope.dt).format('MM/DD/YYYY');
    	end = moment($scope.dt).add(1, 'day').format('MM/DD/YYYY');
	    $http.get('/api/medications?start=' + start + '&end=' + end).then(function (meds) {
	        $scope.meds = meds.data;
	    });	
    }
    
    $scope.init = function(){
    	$scope.getData();
    }

    $window.setInterval(function () {
        $scope.currentTime = moment().format('MMMM Do YYYY, h:mm:ss a');
        $scope.$apply();
    }, 1000);

    $scope.today = function() {
    	$scope.dt = new Date();
  	};
  	
  	$scope.today();

  	$scope.clear = function() {
	   $scope.dt = null;
	};

	$scope.options = {
	    minDate: new Date()
	};

	$scope.complete = function(id){
		$http.post('/api/medications/complete/' + id)
			.then(function (data) {
				$scope.getData();
    		});
	};

	$scope.$watch('dt', function() {
    	$scope.getData();
  	});

	$scope.daysfilter = function(input) {
		if(moment(input.time).startOf('day').format('DD/MM/YYYY') == moment($scope.dt).startOf('day').format('DD/MM/YYYY')){
	        return true;
	    } else {
	    	return false;
	    }
	}

	$scope.init();

});
