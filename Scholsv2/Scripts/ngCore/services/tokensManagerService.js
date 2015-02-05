(function () {
    'use strict';

    angular
        .module('app')
        .service('tokensManagerService', tokensManagerService);

    tokensManagerService.$inject = ['$log', '$http'];

    /* @ngInject */
    function tokensManagerService($log, $http) {
        var service = {
            getTokens: getTokens,
            getAllTokens: getAllTokens,
            deleteToken: deleteToken
        };

        return service;

        ///////////////

        function getTokens(applicationid) {
            return $http.post(serviceBase + 'apptokens/list/' + applicationid).then(function (results) {
                return results;
            });
        }

        function getAllTokens() {
            return $http.post(serviceBase + 'apptokens/list').then(function (results) {
                return results;
            });
        }

        function deleteToken(token) {
            var newToken = angular.copy(token);
            newToken.IPaddress = newToken.ipaddress; // somehow this is lowercase and jackson needs it as uppercase
            delete newToken.ipaddress;

            $log.log(newToken);
            return $http.post(serviceBase + 'apptokens/revoke', newToken).then(function (results) {
                return results;
            });
        }
    }
})();