define(['angular', 'app'], function(angular, app) {
	'use strict';

	return app

	.config(['$routeProvider', function($routeProvider) {

		$routeProvider.when("/page1", {
			templateUrl: appConf.partials + "page1.html"
		});

		$routeProvider.when("/telefonos", {
			templateUrl: appConf.remote + "telefonos.html"
		});

		$routeProvider.when("/cuando-llega", {
			templateUrl: appConf.partials + "cuando-llega/cuando-llega-parada.html",
			controller: appConf.controllers + "cuando-llega"
		});

		$routeProvider.when("/", {
			templateUrl: appConf.partials + "home.html"
		});

		$routeProvider.otherwise({
			redirectTo: "/"
		});

	}])


    .run(function($route, $http, $templateCache) {
        angular.forEach($route.routes, function(r) {
            if (r.templateUrl) { 
                $http.get(r.templateUrl, {cache: $templateCache});
            }
        });
    })
    

    .directive('ngTap', function() {
        var isTouchDevice = !!("ontouchstart" in window);
        return function(scope, elm, attrs) {
            if (isTouchDevice) {
                var tapping = false;
                elm.bind('touchstart', function() { tapping = true; });
                elm.bind('touchmove', function() { tapping = false; });
                elm.bind('touchend', function() { 
                    tapping && scope.$apply(attrs.ngTap);
                });
            } 
            else {
                elm.bind('click', function() {
                    scope.$apply(attrs.ngTap);
                });
            }
        };
    }); // ngTap



}); // define

