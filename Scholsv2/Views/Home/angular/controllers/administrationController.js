(function () {
    'use strict';

    angular
        .module('app')
        .controller('administrationController', administrationController);

    administrationController.$inject = ['administrationService', '$location', 'authService'];

    /* @ngInject */
    function administrationController(administrationService, $location, authService) {
        /* jshint validthis: true */
        var vm = this;
        vm.activate = activate;
        vm.spinnerdisplay = "hideme";
        //vm.title = 'searchController';

        vm.getApplications = getApplications;
        vm.applications = [];
        getApplications();
        //activate();

        ////////////////
        function activate() {
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

        // function registerClientApp() {
        //     vm.message = "";
        //     console.log("came here");
        //     clientService.registerClientApp(vm.clientApp).then(function (results) {
        //         console.log("registered");
        //         vm.getClientApps();
        //         //vm.$apply();
        //     }, function (error) {
        //         //alert(error.data.message);
        //         console.log("error here");
        //     });
        // }
    }
})();