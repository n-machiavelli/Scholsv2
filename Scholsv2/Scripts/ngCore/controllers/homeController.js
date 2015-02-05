(function () {
    'use strict';

    angular
        .module('app')
        .controller('homeController', homeController);

    homeController.$inject = ['$log', 'appInfo', '$location', 'authService'];

    /* @ngInject */
    function homeController($log, appInfo, $location, authService) {
        /* jshint validthis: true */
        var vm = this;

        vm.activate = activate;
        vm.title = 'homeController';

        vm.clientId = appInfo.clientId;
        vm.redirectURI = $location.path();

        activate();

        ////////////////

        function activate() {
            vm.isAuthorized = authService.isAuthorized();
        }
    }
})();