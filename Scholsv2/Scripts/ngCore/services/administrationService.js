(function () {
    'use strict';

    angular
        .module('app')
        .service('administrationService', administrationService);

    administrationService.$inject = ['$http', '$q', 'ngAuthSettings','$log'];

    /* @ngInject */

    function administrationService($http, $q, ngAuthSettings,$log) {
        var serviceBaseApi = ngAuthSettings.serviceBaseApi;
        this.getScholarshipNames = function getScholarshipNames(vm) { //title,department,college,schoolYear,major,undergradGPA,gradGPA,highschoolGPA,keyword) {
            var deferred = $q.defer();
            var request = $http({
                method: 'POST',
                url: serviceBaseApi + "distinctscholarships"
            });
            /* Check whether the HTTP Request is Successfull or not. */
            request.success(function (data) {
                $log.log("Scholarship Names retrieved via service");
                $log.log(data);
                deferred.resolve(data);
            })
                .error(function (error) {
                    $log.error(error);
                    deferred.reject(error);
                });
            return deferred.promise;
        };
        this.getApplications = function getApplications(vm) { //title,department,college,schoolYear,major,undergradGPA,gradGPA,highschoolGPA,keyword) {
            var deferred=$q.defer();            
            var request = $http({
                method: 'POST',
                url: serviceBaseApi + "applications"
            });
            /* Check whether the HTTP Request is Successfull or not. */
            request.success(function (data) {
                $log.log("Applications retrieved via service");
                $log.log(data);
               deferred.resolve(data);
            })
                .error(function(error){
                    $log.error(error);
                    deferred.reject(error);
                });
            return deferred.promise;            
        };
        this.filterApplications = function filterApplications(fund_acct) { //title,department,college,schoolYear,major,undergradGPA,gradGPA,highschoolGPA,keyword) {
            var deferred = $q.defer();
            var request = $http({
                method: 'GET',
                url: serviceBaseApi + "filteredapplications?f=" + fund_acct
            });
            /* Check whether the HTTP Request is Successfull or not. */
            request.success(function (data) {
                $log.log("Applications retrieved via service");
                $log.log(data);
                deferred.resolve(data);
            })
                .error(function (error) {
                    $log.error(error);
                    deferred.reject(error);
                });
            return deferred.promise;
        };

        this.getStatusData = function getStatusData(appId) { //title,department,college,schoolYear,major,undergradGPA,gradGPA,highschoolGPA,keyword) {
            var deferred = $q.defer();
            var request = $http({
                method: 'POST',
                url: serviceBaseApi + "applicationforid",
                data: {
                    id:appId
                }
            });
            /* Check whether the HTTP Request is Successfull or not. */
            request.success(function (data) {
                $log.log("Application data retrieved via service");
                $log.log(data);
                deferred.resolve(data);
            })
                .error(function (error) {
                    $log.error(error);
                    deferred.reject(error);
                });
            return deferred.promise;
        }; 

        this.saveAppStatus = function saveAppStatus(modalReturnObject) { //title,department,college,schoolYear,major,undergradGPA,gradGPA,highschoolGPA,keyword) {
            var deferred = $q.defer();
            var request = $http({
                method: 'POST',
                url: serviceBaseApi + "saveappstatus",
                data: {
                    id: modalReturnObject.id,
                    remark: modalReturnObject.remark,
                    status: modalReturnObject.status
                }
            });
            /* Check whether the HTTP Request is Successfull or not. */
            request.success(function (data) {
                $log.log("Application data saved via service");
                $log.log(data);
                deferred.resolve(data);
            })
                .error(function (error) {
                    $log.log(error);
                    deferred.reject(error);
                });
            return deferred.promise;
        };
        this.generateExcel = function generateExcel() { //title,department,college,schoolYear,major,undergradGPA,gradGPA,highschoolGPA,keyword) {
            var deferred = $q.defer();
            var request = $http({
                method: 'POST',
                url: serviceBaseApi + "generateexcel"
            });
            /* Check whether the HTTP Request is Successfull or not. */
            request.success(function (data) {
                $log.log("Excel document generated via service");
                $log.log(data);
                deferred.resolve(data);
            })
                .error(function (error) {
                    $log.error(error);
                    deferred.reject(error);
                });
            return deferred.promise;
        };
        return this;
    }
})();