//loading the 'login' angularJS module
var calculator = angular.module('calculator', []);
// defining the login controller
calculator.controller('calculator', function($scope, $http) {
	$scope.submit = function() {
		$http({
			method : "POST",
			url : '/calculate',
			data : {
				"firstOperand" : $scope.firstOperand,
				"secondOperand" : $scope.secondOperand,
				"operation" : $scope.operation,
			}
		}).success(function(data) {

			$scope.result = data.result;

		}).error(function(error) {
			alert("error");
		});
	};
})
