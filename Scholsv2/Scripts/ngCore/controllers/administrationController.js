(function () {
    'use strict';

    angular
        .module('app')
        .controller('administrationController', administrationController);

    administrationController.$inject = ['administrationService', '$location', 'authService','$modal','$log'];

    /* @ngInject */
    function administrationController(administrationService, $location, authService,$modal,$log) {
        /* jshint validthis: true */
        var vm = this;
        vm.activate = activate;
        vm.spinnerdisplay = "hideme";
        vm.tickcompleted = "hideme";
        vm.filterspinner = "hideme";
        //vm.title = 'searchController';

        vm.getApplications = getApplications;
        vm.filterApplications=filterApplications;
        vm.generateExcel = generateExcel;
        vm.excelLink = "";
        vm.applications = [];
        getScholarshipNames();
        getApplications();
        activate();

        ////////////////
        function activate() {
        /*
            vm.isAuthorized = authService.authentication.isAuth;  //need this also in this ctrlr for use in displaying fav star
            var promise=searchService.getDropDowns();
            promise.then(function(data){
                console.log(data);
                vm.colleges=data.colleges;    
                vm.departments=data.departments;
                vm.schoolyears=data.schoolyears;
            }, function(reason){
                console.log(reason)
            }, function(update){
                console.log("got notification" + update);
            });
            */
        }

        function getApplications() {
            vm.spinnerdisplay = "showme";
            var promise=administrationService.getApplications();
            promise.then(function (results) {
                $log.log("applications retrieved via controller");
                vm.applications = results;
                $log.log(vm.applications);
                vm.spinnerdisplay = "hideme";
            }, function (err) {
                $log.error("error here getApplications");
                vm.spinnerdisplay = "hideme";
            }, function(update){
                $log.log("update here");
                vm.spinnerdisplay = "hideme";
            });            
        }
        function getScholarshipNames() {
            vm.spinnerdisplay = "showme";
            var promise = administrationService.getScholarshipNames();
            promise.then(function (results) {
                $log.log("scholarship names retrieved via controller");
                vm.scholarships = results;
                $log.log(vm.scholarships);
                vm.spinnerdisplay = "hideme";
            }, function (err) {
                $log.error("error here get scholarship names");
                vm.spinnerdisplay = "hideme";
            }, function (update) {
                $log.log("update here");
                vm.spinnerdisplay = "hideme";
            });
        }
        function generateExcel() {
            vm.spinnerdisplay = "showme";
            var promise = administrationService.generateExcel();
            promise.then(function (response) {
                $log.log("Generated Excel document");
                vm.excelLink = "../api/ExcelUploads/" + response.body;
                vm.message = response.body;
                $log.log(vm.message);
                vm.spinnerdisplay = "hideme";
                vm.tickcompleted = "showme";
            }, function (err) {
                $log.error("error here gen excel");
                vm.tickcompleted = "hideme";
                vm.spinnerdisplay = "hideme";
            }, function (update) {
                $log.log("update here");
                vm.tickcompleted = "hideme";
                vm.spinnerdisplay = "hideme";
            });
        }
        function filterApplications() {
            vm.filterspinner = "showme";
            if (vm.fund_acct == undefined || vm.fund_acct ==null) vm.fund_acct ="";
            $log.log(vm.fund_acct);
            var promise = administrationService.filterApplications(vm.fund_acct);
            promise.then(function (response) {
                $log.log("Filtered Applications");
                vm.applications = response; 
                vm.filterspinner = "hideme";
            }, function (err) {
                $log.error("error here filter apps");
                vm.filterspinner = "hideme";
            }, function (update) {
                $log.log("update here");
                vm.filterspinner = "hideme";
            });
        }
        vm.openModal = function (id) {
            administrationService.getStatusData(id).then(function (response) {
                $log.log("Received Application Status");
                /*
                vm.statusData.remark = response.remark;
                vm.statusData.firstname = response.firstname;
                vm.statusData.middlename = response.middlename;
                vm.statusData.lastname  = response.lastname;
                vm.statusData.status = response.status;
                */
                response.id = id;
                vm.launchModal(response);
            }, function (error) {
                $log.error("error here");
            });
        };
        vm.launchModal = function (statusData) {
            var myModal = $modal.open({
                title: 'Update Status',
                templateUrl: '../ngViews/adminmodal.html',
                controller: "adminModalController",
                controllerAs: "vm",
                size: "sm",
                resolve: {
                    message: function () {
                        return statusData.firstname + " " + statusData.middlename + " " + statusData.lastname;
                    },
                    status: function () {
                        return statusData.status;
                    },
                    remark: function () {
                        return statusData.remark;
                    },
                    id: function () {
                        return statusData.id;
                    }
                }
            });
            myModal.result.then(function (modalReturnObject) {
                $log.log(modalReturnObject);
                administrationService.saveAppStatus(modalReturnObject).then(function (response) {
                    $log.log("Saved Status");
                    $log.log(response);
                    //vm.getClientApps();
                }, function (error) {
                    $log.error("error here");
                });
            }, function () {
                $log.log("Modal dismissed instead.");
            });

        }
    }
})();