(function () {
    'use strict';

    angular
        .module('app')
        .service('administrationService', administrationService);

    administrationService.$inject = ['$http', '$q', 'ngAuthSettings'];

    /* @ngInject */

    function administrationService($http, $q, ngAuthSettings) {
        var serviceBaseApi = ngAuthSettings.serviceBaseApi;
        this.getScholarshipNames = function getScholarshipNames(vm) { //title,department,college,schoolYear,major,undergradGPA,gradGPA,highschoolGPA,keyword) {
            var deferred = $q.defer();
            var request = $http({
                method: 'POST',
                url: serviceBaseApi + "distinctscholarships"
            });
            /* Check whether the HTTP Request is Successfull or not. */
            request.success(function (data) {
                console.log("Scholarship Names retrieved via service");
                console.log(data);
                deferred.resolve(data);
            })
                .error(function (error) {
                    console.log(error);
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
        this.filterApplications = function filterApplications(fund_acct) { //title,department,college,schoolYear,major,undergradGPA,gradGPA,highschoolGPA,keyword) {
            var deferred = $q.defer();
            var request = $http({
                method: 'GET',
                url: serviceBaseApi + "filteredapplications?f=" + fund_acct
            });
            /* Check whether the HTTP Request is Successfull or not. */
            request.success(function (data) {
                console.log("Applications retrieved via service");
                console.log(data);
                deferred.resolve(data);
            })
                .error(function (error) {
                    console.log(error);
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
                console.log("Application data retrieved via service");
                console.log(data);
                deferred.resolve(data);
            })
                .error(function (error) {
                    console.log(error);
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
                console.log("Application data saved via service");
                console.log(data);
                deferred.resolve(data);
            })
                .error(function (error) {
                    console.log(error);
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
                console.log("Excel document generated via service");
                console.log(data);
                deferred.resolve(data);
            })
                .error(function (error) {
                    console.log(error);
                    deferred.reject(error);
                });
            return deferred.promise;
        };
        return this;
    }
})();