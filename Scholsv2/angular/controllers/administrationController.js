(function () {
    'use strict';

    angular
        .module('app')
        .controller('administrationController', administrationController);

    administrationController.$inject = ['administrationService', '$location', 'authService','$modal'];

    /* @ngInject */
    function administrationController(administrationService, $location, authService,$modal) {
        /* jshint validthis: true */
        var vm = this;
        vm.activate = activate;
        vm.spinnerdisplay = "hideme";
        vm.tickcompleted = "hideme";
        //vm.title = 'searchController';

        vm.getApplications = getApplications;
        vm.generateExcel = generateExcel;
        vm.excelLink = "";
        vm.applications = [];
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
            console.log("here");
            vm.spinnerdisplay = "showme";
            var promise=administrationService.getApplications();
            promise.then(function (results) {
                console.log("applications retrieved via controller");
                vm.applications = results;
                console.log(vm.applications);
                vm.spinnerdisplay = "hideme";
            }, function (err) {
                console.log("error here");
                vm.spinnerdisplay = "hideme";
            }, function(update){
                console.log("update here");
                vm.spinnerdisplay = "hideme";
            });            
        }

        function generateExcel() {
            vm.spinnerdisplay = "showme";
            var promise = administrationService.generateExcel();
            promise.then(function (response) {
                console.log("Generated Excel document");
                vm.excelLink = "../api/ExcelUploads/" + response.body;
                vm.message = response.body;
                console.log(vm.message);
                vm.spinnerdisplay = "hideme";
                vm.tickcompleted = "showme";
            }, function (err) {
                console.log("error here");
                vm.tickcompleted = "hideme";
                vm.spinnerdisplay = "hideme";
            }, function (update) {
                console.log("update here");
                vm.tickcompleted = "hideme";
                vm.spinnerdisplay = "hideme";
            });
        }
        vm.openModal = function (id) {
            administrationService.getStatusData(id).then(function (response) {
                console.log("Received Application Status");
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
                console.log("error here");
            });
        };
        vm.launchModal = function (statusData) {
            var myModal = $modal.open({
                title: 'Update Status',
                templateUrl: 'views/adminmodal.html',
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
                console.log(modalReturnObject);
                administrationService.saveAppStatus(modalReturnObject).then(function (response) {
                    console.log("Saved Status");
                    console.log(response);
                    //vm.getClientApps();
                }, function (error) {
                    console.log("error here");
                });
            }, function () {
                console.log("Modal dismissed instead.");
            });

        }
    }
})();