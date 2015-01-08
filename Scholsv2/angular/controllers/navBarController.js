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

        
        activate();
        function logOut() {
            authService.logOut();
            $location.path('/Home/Ng');
        }
        function activate() {
            
            vm.authentication = authService.authentication;
            vm.isAuthorized = authService.authentication.isAuth;//Find out why using vm.isAuthorized in index.html didnt work
            console.log(vm);
        }
    }
})();