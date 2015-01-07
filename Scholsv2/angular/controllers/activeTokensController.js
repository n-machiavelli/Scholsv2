(function () {
    'use strict';

    angular
        .module('app')
        .controller('activeTokensController', activeTokensController);

    activeTokensController.$inject = ['tokensManagerService'];

    /* @ngInject */
    function activeTokensController() {
        /* jshint validthis: true */
        var vm = this;

        vm.activate = activate;
        vm.title = 'activeTokensController';

        vm.tokens = [];
        vm.deleteTokens = deleteTokens;

        activate();

        ////////////////

        function activate() {

        }

        function deleteTokens(tokenId) {
            tokensManagerService.deleteTokens(tokenId).then(function (results) {
                vm.tokens = tokensManagerService.getTokens(); // update tokens after delete
            }, function (error) {
                alert(error.data.message);
            });
        }
    }
})();