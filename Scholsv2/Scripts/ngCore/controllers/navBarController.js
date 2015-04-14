(function () {
    'use strict';

    angular
        .module('app')
        .controller('navBarController', navBarController);

    navBarController.$inject = ['ngAuthSettings', 'authService','$location','$log','$modal'];

    /* @ngInject */
    function navBarController(ngAuthSettings, authService,$location,$log,$modal) {
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
            vm.authentication = authService.authentication;
            vm.isAuthorized = authService.authentication.isAuth;//Find out why using vm.isAuthorized in index.html didnt work
            
            var promise = authService.getXmlEvents();
            promise.then(function (data) {
                //console.log(data);
                data = data.replace(/(?:\\[rn])+/g, "");
                
                var data2 = data.substring(1, data.length - 1);
                data2 = data2.replace(/\\"/g, '"');
                vm.events = data2;
                //console.log("|" + data2 + "|");
                //console.log("|" + vm.events + "|");
                //console.log(data2 == vm.events);
            }, function (reason) {
                $log.error(reason);
                vm.message = "Unable to connect to the database. Please confirm connectivity and then refresh.";
                vm.errorFlag = true;
            }, function (update) {
                $log.log("got notification" + update);
            });
        }
        vm.loginModal = function () {
            var myModal = $modal.open({
                title: 'Login here...',
                templateUrl: '/ngViews/loginmodal.html',
                controller: "loginmodalController",
                controllerAs: "vm",
                size: "sm"
            });
            myModal.result.then(function (modalReturnObject) {
                $log.log(modalReturnObject);
                var promise = authService.login(modalReturnObject); 
                promise.then(function (authData) {
                    if (!(jQuery.isEmptyObject(authData))) {
                        $log.log(authData);
                        vm.authData = authData;
                        vm.spinnerdisplay = "hideme";
                        $location.path("/");
                    } else {
                        vm.msg = "Empty auth";//AuthFactory.message;
                        vm.spinnerdisplay = "hideme";
                        $log.error(vm.msg);
                    }
                }, function (reason) {
                    if (reason.error_description == undefined) {
                        vm.message = "Unable to access the system";
                    } else {
                        vm.message = "Failed : " + reason.error_description;
                    }
                    vm.spinnerdisplay = "hideme";
                    $log.error(vm.message);
                });
            }, function () {
                $log.log("Modal dismissed instead.");
            });
        }
    }
})();