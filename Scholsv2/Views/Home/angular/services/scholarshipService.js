(function () {
    'use strict';

    angular
        .module('app')
        .service('scholarshipService', scholarshipService);

    scholarshipService.$inject = ['$http', '$q', 'ngAuthSettings'];

    /* @ngInject */

    function scholarshipService($http, $q, ngAuthSettings) {
        var serviceBaseApi = ngAuthSettings.serviceBaseApi;
        //had a big issue when i stupidly placed deffered here before d fxns. it kept getting called just once
        this.getScholarshipDetails = function getScholarshipDetails(fund_acct,schlrshp_num) { //title,department,college,schoolYear,major,undergradGPA,gradGPA,highschoolGPA,keyword) {
            var deferred=$q.defer();            
            //console.log(vm);
            var request = $http({
                method: 'GET',
                url: serviceBaseApi + "scholarshipdetails?f=" + fund_acct + "&s=" + schlrshp_num 
            });
            /* Check whether the HTTP Request is Successfull or not. */
            request.success(function (data) {
                //message='Scholarships retrieved';
               console.log("Scholarship detail retrieved via service");
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
        this.apply = function apply(vm) {
            var deferred = $q.defer();
            //console.log(vm);
            var request = $http({
                method: 'POST',
                url: serviceBaseApi + "apply",
                data: {
                    firstname: vm.firstname,
                    middlename: vm.middlename,
                    lastname: vm.lastname,
                    email: vm.email,
                    universityid: vm.universityid,
                    address: vm.address,
                    phonenumber: vm.phonenumber,
                    essayfilename: vm.essayfilename,
                    reffilename: vm.reffilename,
                    fund_acct: vm.fund_acct,
                    scholarshipyear: vm.scholarshipyear
                }
                //,headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            });
            /* Check whether the HTTP Request is Successful or not. */
            request.success(function (data) {
                //message='Scholarships retrieved';
                console.log("Scholarship application submitted via service");
                console.log(data);
                deferred.resolve(data);
                // $scope.message = "From PHP file : "+data;
            })
                .error(function (error) {
                    console.log(error);
                    deferred.reject(error);
                });
            //vm.reviews=ReviewFactory.getReviews(courseID);
            //console.log("Review has been added");
            return deferred.promise;

        }
        return this;
    }

})();