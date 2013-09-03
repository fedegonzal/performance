
define(['angular', 'services'], function (angular) {
	'use strict';

	return angular.module('myApp.controllers', ['myApp.services'])

		.controller('MainCtrl', function($scope, $navigate) {
	        $scope.$navigate = $navigate;
    	});

});
