var app = angular.module('app',
    ['ngRoute', 'LocalStorageModule', 'ngSanitize', 'angularFileUpload', 'ui.bootstrap', 'angularUtils.directives.dirPagination','ui.utils']);


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
    $routeProvider.when("/myapplications/:myapplications", {
        controller: "searchController",
        controllerAs: "vm",
        templateUrl: "ngViews/myapplications.html"
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
    $routeProvider.when("/profilesearch/:profilesearch", {
        controller: "searchController",
        controllerAs: "vm",
        templateUrl: "ngViews/searchresults.html"
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
    //TODO: eliminate below totally since it's moved to own server side
    $routeProvider.when("/administration", {
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

app.directive('numericOnly', function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attrs, modelCtrl) {

            modelCtrl.$parsers.push(function (inputValue) {
                var transformedInput = inputValue.replace(/[^\d.-]/g, '');

                if (transformedInput != inputValue) {
                    modelCtrl.$setViewValue(transformedInput);
                    modelCtrl.$render();
                }

                return transformedInput;
            });
        }
    };
});
app.run(['authService','$log', function (authService,$log) {
    authService.fillAuthData();
}]);

