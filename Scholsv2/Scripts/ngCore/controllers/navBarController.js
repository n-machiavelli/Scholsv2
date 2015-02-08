(function () {
    'use strict';

    angular
        .module('app')
        .controller('navBarController', navBarController);

    navBarController.$inject = ['ngAuthSettings', 'authService','$location','$log'];

    /* @ngInject */
    function navBarController(ngAuthSettings, authService,$location,$log) {
        /* jshint validthis: true */
        var vm = this;

        vm.activate = activate;
        vm.logOut = logOut;
        vm.title = 'navBarController';
        vm.message = "";
        vm.featuredScholarships = [];
        vm.showFeatured = true;

        activate();
        function logOut() {
            authService.logOut();
            $location.path('/');
        }
        function activate() {
            var containsAdmin = $location.url().indexOf("administration");
            $log.log(containsAdmin); //if ($location.pathname)
            vm.showFeatured = (containsAdmin==-1);
            $log.log(vm.showFeatured);
            vm.authentication = authService.authentication;
            vm.isAuthorized = authService.authentication.isAuth;//Find out why using vm.isAuthorized in index.html didnt work
            var promise = authService.getFeaturedScholarships();
            promise.then(function (data) {
                vm.featuredScholarships = data;
                $log.log(vm.featuredScholarships);
            }, function (reason) {
                $log.error(reason);
                vm.message = "Unable to connect to the database. Please confirm connectivity and then refresh.";
                vm.errorFlag = true;
            }, function (update) {
                $log.log("got notification" + update);
            });
            //$log.log(vm);
        }
    }
})();