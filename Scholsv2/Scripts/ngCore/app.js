var app = angular.module('app',
    ['ngRoute', 'LocalStorageModule', 'ngSanitize', 'angularFileUpload', 'ui.bootstrap']);


app.config(function ($routeProvider, $locationProvider, $logProvider) {
    $logProvider.debugEnabled(true);


    $routeProvider.when("/", {
        controller: "searchController",
        controllerAs: "vm",
        templateUrl: "ngViews/search.html"
    });

    $routeProvider.when("/search", {
        controller: "searchController",
        controllerAs: "vm",
        templateUrl: "ngViews/search.html"
    });
    $routeProvider.when("/searchcollege/:collegecode/:collegename", {
        controller: "searchController",
        controllerAs: "vm",
        templateUrl: "ngViews/searchresults.html"
    });
    $routeProvider.when("/favorites/:favorites", {
        controller: "searchController",
        controllerAs: "vm",
        templateUrl: "ngViews/searchresults.html"
    });
    $routeProvider.when("/login", {
        controller: "loginController",
        controllerAs: "vm",
        templateUrl: "ngViews/login.html"
    });
    $routeProvider.when("/profile", {
        controller: "profileController",
        controllerAs: "vm",
        templateUrl: "ngViews/profile.html"
    });
    $routeProvider.when("/scholarship/:fund_acct/:schlrshp_num", {
        controller: "scholarshipController",
        controllerAs: "vm",
        templateUrl: "ngViews/scholarship.html"
    });


    $routeProvider.when("/register", {
        controller: "registerController",
        controllerAs: "vm",
        templateUrl: "ngViews/register.html"
    });

    $routeProvider.when("/administration", {
        controller: "administrationController",
        controllerAs: "vm",
        templateUrl: "ngViews/administration.html"
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

