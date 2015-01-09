(function () {
    'use strict';

    angular
        .module('app')
        .service('searchService', searchService);

    searchService.$inject = ['$http','$q','ngAuthSettings'];

    /* @ngInject */

    function searchService($http, $q, ngAuthSettings) {
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
               console.log("Scholarships retrieved via service");
               console.log("service title:" + vm.title);
               console.log(data);
               deferred.resolve(data);
               // $scope.message = "From PHP file : "+data;
            })
                .error(function(error){
                    console.log(error);
                    deferred.reject(error);
                });
            //vm.reviews=ReviewFactory.getReviews(courseID);
            //console.log("Review has been added");
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
               console.log("Dropdown data retrieved");
               console.log(data);
               deferred.resolve(data);
               // $scope.message = "From PHP file : "+data;
            })
                .error(function(error){
                    console.log(error);
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
                console.log("Fav toggled via service");
                console.log(data);
                deferred.resolve(data);
            })
            .error(function (error) {
                console.log(error);
                deferred.reject(error);
            });
            return deferred.promise;

        }

        return this;
    }
})();