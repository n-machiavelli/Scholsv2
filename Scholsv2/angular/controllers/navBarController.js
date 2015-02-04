(function () {
    'use strict';

    angular
        .module('app')
        .controller('navBarController', navBarController);

    navBarController.$inject = ['ngAuthSettings', 'authService','$location'];

    /* @ngInject */
    function navBarController(ngAuthSettings, authService,$location) {
        /* jshint validthis: true */
        var vm = this;

        vm.activate = activate;
        vm.logOut = logOut;
        vm.title = 'navBarController';
        vm.message = "";
        vm.featuredScholarships = [];
        
        activate();
        function logOut() {
            authService.logOut();
            $location.path('/');
        }
        function activate() {
            
            vm.authentication = authService.authentication;
            vm.isAuthorized = authService.authentication.isAuth;//Find out why using vm.isAuthorized in index.html didnt work
            var promise = authService.getFeaturedScholarships();
            promise.then(function (data) {
                vm.featuredScholarships = data;
                console.log(vm.featuredScholarships);
            }, function (reason) {
                console.log(reason);
                vm.message = "Unable to connect to the database. Please confirm connectivity and then refresh.";
                vm.errorFlag = true;
            }, function (update) {
                console.log("got notification" + update);
            });
            console.log(vm);
        }
    }
})();