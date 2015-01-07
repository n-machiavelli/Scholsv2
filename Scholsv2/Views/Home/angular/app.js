var app = angular.module('app',
    ['ngRoute', 'LocalStorageModule', 'ngSanitize', 'angularFileUpload']);


app.config(function ($routeProvider, $locationProvider, $logProvider) {
    $logProvider.debugEnabled(true);


    $routeProvider.when("/", {
        controller: "searchController",
        controllerAs: "vm",
        templateUrl: "angular/views/search.html"
    });

    $routeProvider.when("/search", {
        controller: "searchController",
        controllerAs: "vm",
        templateUrl: "views/search.html"
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
    $locationProvider.html5Mode(true);
});

//var serviceBase = 'http://localhost:26264/';
//var serviceBase = 'http://ngauthenticationapi.azurewebsites.net/';
var serviceBase = 'http://localhost:2382/';
app.constant('ngAuthSettings', {
    serviceBase: serviceBase,
    serviceBaseApi: serviceBase + "api/"
});

app.config(function ($httpProvider) {
    $httpProvider.interceptors.push('authInterceptorService');
});

app.run(['authService', function (authService) {
    authService.fillAuthData();
}]);
