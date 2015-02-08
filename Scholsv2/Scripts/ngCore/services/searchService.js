(function () {
    'use strict';

    angular
        .module('app')
        .service('searchService', searchService);

    searchService.$inject = ['$http','$q','ngAuthSettings','$log'];

    /* @ngInject */

    function searchService($http, $q, ngAuthSettings,$log) {
        var serviceBaseApi = ngAuthSettings.serviceBaseApi;
        //had a big issue when i stupidly placed deffered here before d fxns. it kept getting called just once
        this.getScholarships = function getScholarships(vm){ //title,department,college,schoolYear,major,undergradGPA,gradGPA,highschoolGPA,keyword) {
            var deferred=$q.defer();            
            //console.log(vm);
            var request = $http({
                method: 'POST',
                url: serviceBaseApi + "Search",
                data: {
                title: vm.title,
                //department: vm.department,
                college: vm.college,
                schoolYear: vm.schoolYear,
                major: vm.major,
                undergradGPA: vm.undergradGPA,
                gradGPA: vm.gradGPA,
                highschoolGPA: vm.highschoolGPA,
                keyword: vm.keyword
            }
                //,headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            });
            /* Check whether the HTTP Request is Successfull or not. */
            request.success(function (data) {
                //message='Scholarships retrieved';
                $log.log("Scholarships retrieved via service");
                $log.log("service title:" + vm.title);
                $log.log(data);
               deferred.resolve(data);
               // $scope.message = "From PHP file : "+data;
            })
                .error(function(error){
                    $log.error(error);
                    deferred.reject(error);
                });
            //vm.reviews=ReviewFactory.getReviews(courseID);
            //console.log("Review has been added");
            return deferred.promise;            
        };

        this.getFavoriteScholarships = function getFavoriteScholarships() { //title,department,college,schoolYear,major,undergradGPA,gradGPA,highschoolGPA,keyword) {
            var deferred = $q.defer();
            //console.log(vm);
            var request = $http({
                method: 'GET',
                url: serviceBaseApi + "favorites",
            });
            request.success(function (data) {
                $log.log("Scholarships retrieved via service");
                $log.log(data);
                deferred.resolve(data);
            })
                .error(function (error) {
                    $log.log(error);
                    deferred.reject(error);
                });
            return deferred.promise;
        };
        this.getDropDowns=function getDropDowns(){
            var deferred=$q.defer();
            var request = $http({
                method: 'GET',
                url: serviceBaseApi + "dropdowndata",
                //,headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            });
            /* Check whether the HTTP Request is Successfull or not. */
            request.success(function (data) {
                //message='Scholarships retrieved';
                $log.log("Dropdown data retrieved");
                $log.log(data);
               deferred.resolve(data);
               // $scope.message = "From PHP file : "+data;
            })
                .error(function(error){
                    $log.error(error);
                    deferred.reject(error);
                });
            //vm.reviews=ReviewFactory.getReviews(courseID);
            //console.log("Review has been added");
            return deferred.promise;            

        }
        this.toggleFavorite = function toggleFavorite(fundacct, schlrshpname) {
            //need to incorp modal for no login
            var deferred = $q.defer();
            var request = $http({
                method: 'POST',
                url: serviceBaseApi + "togglefavorite",
                data: {
                    fundacct: fundacct,
                    schlrshpname: schlrshpname
                }
                //,headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            });
            /* Check whether the HTTP Request is Successfull or not. */
            request.success(function (data) {
                //message='Scholarships retrieved';
                $log.log("Fav toggled via service");
                $log.log(data);
                deferred.resolve(data);
            })
            .error(function (error) {
                $log.log(error);
                deferred.reject(error);
            });
            return deferred.promise;

        }

        return this;
    }
})();