(function () {
    'use strict';

    angular
        .module('app')
        .service('administrationService', administrationService);

    administrationService.$inject = ['$http', '$q', 'ngAuthSettings'];

    /* @ngInject */

    function administrationService($http, $q, ngAuthSettings) {
        var serviceBaseApi = ngAuthSettings.serviceBaseApi;
        this.getApplications = function getApplications(vm) { //title,department,college,schoolYear,major,undergradGPA,gradGPA,highschoolGPA,keyword) {
            var deferred=$q.defer();            
            var request = $http({
                method: 'POST',
                url: serviceBaseApi + "applications"
            /*    data: {
                title: vm.title,
                department: vm.department,
                college: vm.college,
            }
            */
                //,headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            });
            /* Check whether the HTTP Request is Successfull or not. */
            request.success(function (data) {
                //message='Scholarships retrieved';
               console.log("Applications retrieved via service");
               console.log(data);
               deferred.resolve(data);
            })
                .error(function(error){
                    console.log(error);
                    deferred.reject(error);
                });
            return deferred.promise;            
        };

        return this;
    }
})();