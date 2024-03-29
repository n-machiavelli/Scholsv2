﻿var app = angular.module('app',
    ['ngRoute', 'LocalStorageModule', 'ngSanitize', 'angularFileUpload', 'ui.bootstrap']);


app.config(function ($routeProvider, $locationProvider, $logProvider) {
    $logProvider.debugEnabled(true);


    $routeProvider.when("/", {
        controller: "searchController",
        controllerAs: "vm",
        templateUrl: "views/search.html"
    });

    $routeProvider.when("/search", {
        controller: "searchController",
        controllerAs: "vm",
        templateUrl: "views/search.html"
    });
    $routeProvider.when("/searchcollege/:collegecode/:collegename", {
        controller: "searchController",
        controllerAs: "vm",
        templateUrl: "views/searchresults.html"
    });
    $routeProvider.when("/favorites/:favorites", {
        controller: "searchController",
        controllerAs: "vm",
        templateUrl: "views/searchresults.html"
    });
    $routeProvider.when("/login", {
        controller: "loginController",
        controllerAs: "vm",
        templateUrl: "views/login.html"
    });
    $routeProvider.when("/profile", {
        controller: "profileController",
        controllerAs: "vm",
        templateUrl: "views/profile.html"
    });
    $routeProvider.when("/scholarship/:fund_acct/:schlrshp_num", {
        controller: "scholarshipController",
        controllerAs: "vm",
        templateUrl: "views/scholarship.html"
    });


    $routeProvider.when("/register", {
        controller: "registerController",
        controllerAs: "vm",
        templateUrl: "views/register.html"
    });

    $routeProvider.when("/administration", {
        controller: "administrationController",
        controllerAs: "vm",
        templateUrl: "views/administration.html"
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


app.run(['authService', function (authService) {
    authService.fillAuthData();
}]);

