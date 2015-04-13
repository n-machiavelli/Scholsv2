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
        vm.spinnerdisplayevents = "hideme";
        vm.spinnerdisplaynews = "hideme";
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
            vm.spinnerdisplayevents = "showme";
            var promise = authService.getXmlEvents();
            promise.then(function (data) {
                //console.log(data);
                data = data.replace(/(?:\\[rn])+/g, "");
                var data2 = data.substring(1, data.length - 1);
                data2 = data2.replace(/\\"/g, '"');
                vm.events = data2;
                vm.spinnerdisplayevents = "hideme";
            }, function (reason) {
                $log.error(reason);
                vm.message = "Unable to connect to the ISU Events. Please confirm connectivity and then refresh.";
                vm.errorFlag = true;
                vm.spinnerdisplayevents = "hideme";
            }, function (update) {
                $log.log("got notification" + update);
                vm.spinnerdisplayevents = "hideme";
            });
            vm.spinnerdisplaynews = "showme";
            var promise = authService.getXmlNews();
            promise.then(function (data) {
                data = data.replace(/(?:\\[rn])+/g, "");
                var data2 = data.substring(1, data.length - 1);
                data2 = data2.replace(/\\"/g, '"');
                vm.news = data2;
                vm.spinnerdisplaynews = "hideme";
            }, function (reason) {
                $log.error(reason);
                vm.message = "Unable to connect to the ISU News. Please confirm connectivity and then refresh.";
                vm.errorFlag = true;
                vm.spinnerdisplaynews = "hideme";
            }, function (update) {
                $log.log("got notification" + update);
                vm.spinnerdisplaynews = "hideme";
            });

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