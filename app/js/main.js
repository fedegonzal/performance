var appConf = {};
    appConf.remote = "http://www.smartgob.com/services/ushuaia-movil/";
    appConf.partials = "app/partials/";
    appConf.debug = true;


appConf.log = function( msg ) {
    if (appConf.debug) console.log( msg );
}

// Application Constructor
appConf.initialize = function() {
    this.bindEvents();
}
    
// Bind any events that are required on startup. Common events are:
// 'load', 'deviceready', 'offline', and 'online'.
appConf.bindEvents = function() {
    document.addEventListener('load', this.onLoad, false);
    document.addEventListener('deviceready', this.onDeviceReady, false);
    window.addEventListener("orientationchange", orientationChange, true);
}

appConf.onLoad = function() {
}
   
// deviceready Event Handler
appConf.onDeviceReady = function() {
}







angular.module('myApp', ['ajoslin.mobile-navigate'])
.config(function($routeProvider) {
        $routeProvider.when("/page1", {
            templateUrl: appConf.partials + "page1.html"
        }).when("/telefonos", {
            templateUrl: appConf.remote + "telefonos.html"
        }).when("/cuando-llega", {
            templateUrl: appConf.partials + "cuando-llega/cuando-llega-parada.html"
        }).when("/", {
            templateUrl: appConf.partials + "home.html"
        }).otherwise({
            redirectTo: "/"
        });
})
.run(function($route, $http, $templateCache) {
  angular.forEach($route.routes, function(r) {
    if (r.templateUrl) { 
      $http.get(r.templateUrl, {cache: $templateCache});
    }
  });
})
.controller('MainCtrl', function($scope, $navigate) {
  $scope.$navigate = $navigate;
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
    } else {
      elm.bind('click', function() {
        scope.$apply(attrs.ngTap);
      });
    }
  };
});






/*
    // Aceptaremos CORS
    app.config( function( $httpProvider ) {
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
    });

    app.config(function ($compileProvider){
        $compileProvider.urlSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel):/);
    });
*/




/* ----------------------------- */

function paradasController($scope, $http) {

    $scope.consultar = function() {
        $scope.espera = 'Consultando...';
        var url = "http://www.smartgob.com/services/ushuaia-movil/cuando-llega.php?nro="+$scope.parada;
        
        $http.get(url)
        
        .success(function(data){
          if (data.Response.Estado.Valor === "OK") {
            if (data.Response.Movil.tiempo > 0) {
              $scope.espera = "Linea " + data.Response.Movil.linea + " (" + data.Response.Movil.ramal + ") " + data.Response.Movil.tiempo + " min";
            }
            else {
              $scope.espera = "Linea " + data.Response.Movil.linea + " (" + data.Response.Movil.ramal + ") " + data.Response.Movil.tiempo;
            }
          }
          else {
            $scope.espera = data.Response.Estado.Valor;
          }
        })
        
        .error(function(error){
            $scope.espera = 'error';
        });
    };
    
}
