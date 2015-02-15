(function () {
    'use strict';

    angular
        .module('app')
        .service('scholarshipService', scholarshipService);

    scholarshipService.$inject = ['$http', '$q', 'ngAuthSettings','$log'];

    /* @ngInject */

    function scholarshipService($http, $q, ngAuthSettings, $log) {
        var serviceBaseApi = ngAuthSettings.serviceBaseApi;
        //had a big issue when i stupidly placed deffered here before d fxns. it kept getting called just once
        this.getScholarshipDetails = function getScholarshipDetails(fund_acct,schlrshp_num) { //title,department,college,schoolYear,major,undergradGPA,gradGPA,highschoolGPA,keyword) {
            var deferred=$q.defer();            
            //console.log(vm);
            var request = $http({
                method: 'GET',
                url: serviceBaseApi + "scholarshipdetails?fundAcct=" + fund_acct + "&scholarNum=" + schlrshp_num 
            });
            /* Check whether the HTTP Request is Successfull or not. */
            request.success(function (data) {
                //message='Scholarships retrieved';
                $log.log("Scholarship detail retrieved via service");
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
        this.apply = function apply(vm) {
            var deferred = $q.defer();
            $log.log(vm);
            var request = $http({
                method: 'POST',
                url: serviceBaseApi + "apply",
                data: {
                    firstname: vm.firstname,
                    middlename: vm.middlename,
                    lastname: vm.lastname,
                    email: vm.email,
                    UniversityId: vm.UniversityId,
                    address: vm.address,
                    UserMajor: vm.usermajor,
                    phonenumber: vm.phonenumber,
                    essayfilename: vm.essayfilename,
                    reffilename: vm.reffilename,
                    fund_acct: vm.fund_acct,
                    ScholarshipYear: vm.scholarshipyear,
                    ExpectedGraduation: vm.expectedGraduation,
                    PresentGPA: vm.presentGPA,
                    HighSchoolGPA: vm.highschoolGPA,
                    CommunityService: vm.communityService,
                    ExtraCurricular: vm.extraCurricular,
                    AwardsHonors: vm.awardsHonors
                }
                //,headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            });
            /* Check whether the HTTP Request is Successful or not. */
            request.success(function (data) {
                //message='Scholarships retrieved';
                $log.log("Scholarship application submitted via service");
                $log.log(data);
                deferred.resolve(data);
                // $scope.message = "From PHP file : "+data;
            })
                .error(function (error) {
                    $log.error(error);
                    deferred.reject(error);
                });
            //vm.reviews=ReviewFactory.getReviews(courseID);
            //console.log("Review has been added");
            return deferred.promise;

        }
        return this;
    }

})();