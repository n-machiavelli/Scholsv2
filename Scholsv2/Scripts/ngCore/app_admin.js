var app = angular.module('app',
    ['ngRoute', 'LocalStorageModule', 'ngSanitize', 'angularFileUpload', 'ui.bootstrap']);


app.config(function ($routeProvider, $locationProvider, $logProvider) {
    $logProvider.debugEnabled(true);



    $routeProvider.when("/", {
        controller: "administrationController",
        controllerAs: "vm",
        templateUrl: "../ngViews/administration.html"
    });


    $routeProvider.otherwise({redirectTo: "/"});
    //$locationProvider.html5Mode(true);
});

var serviceBase = "../";        // see below comment'http://localhost:2382/';
app.constant('ngAuthSettings', {
    serviceBase: serviceBase,
    serviceBaseApi: "../api/" //changed from serviceBase + "api/" to use relative to make consistent when run on iwss server
});

app.config(function ($httpProvider) {
    $httpProvider.interceptors.push('authInterceptorService');
});


app.run(['authService','$log', function (authService,$log) {
    authService.fillAuthData();
}]);

