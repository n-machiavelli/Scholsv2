(function () {
    'use strict';

    angular
        .module('app')
        .controller('clientTokensController', clientTokensController);

    clientTokensController.$inject = ['tokensManagerService', '$routeParams'];

    /* @ngInject */
    function clientTokensController(tokensManagerService, $routeParams) {
        /* jshint validthis: true */
        var vm = this;

        vm.activate = activate;
        vm.title = 'clientTokensController';

        vm.tokens = [];
        vm.applicationid=$routeParams.applicationid;
        vm.getTokens= getTokens(vm.applicationid);
        vm.deleteToken = deleteToken;

        activate();

        ////////////////

        function activate() {
            getTokens(vm.applicationid);
        }

        function getTokens(applicationid) {
            tokensManagerService.getTokens(applicationid).then(function (results) {
                vm.tokens = results.data;
                console.log(results.data);
            }, function (error) {
                console.log("getRefreshTokens error here");
            });
        }


        function deleteToken(token) {
            tokensManagerService.deleteToken(token).then(function (results) {
                vm.tokens = tokensManagerService.getTokens(); // update tokens after delete
            }, function (error) {
                alert(error.data.message);
            });
        }
    }
})();