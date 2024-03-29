(function () {
    'use strict';

    angular
        .module('app')
        .controller('profileController', profileController);

    profileController.$inject = ['$location', 'authService'];

    /* @ngInject */
    function profileController($location, authService) {
        /* jshint validthis: true */
        var vm = this;
        vm.title = 'profileController';
        vm.message = "";
        vm.profile = {};
        vm.getProfile = getProfile;
        vm.saveProfile = saveProfile;
        getProfile();



        function getProfile() {
            console.log(vm.profile, "before call get");
            console.log(vm.message);
            var promise = authService.getProfile(); //vm.login_username, vm.login_password);
            promise.then(function (result) {
                if (!(jQuery.isEmptyObject(result))) {
                    //vm.msg=AuthFactory.message;
                    //console.log("$location move");
                    vm.profile = result;
                    console.log(vm.profile);
                } else {
                    vm.message = "Empty auth";//AuthFactory.message;
                }
            }, function (reason) {
                vm.message = "Failed : " + reason + ":";//+  authService.message;
                console.log(reason);
            }, function (update) {
                vm.message = "updated";
            })

        }
        function saveProfile() {
            console.log(vm.profile, "before call save");
            console.log(vm.message);
            var promise = authService.saveProfile(vm.profile); //vm.login_username, vm.login_password);
            promise.then(function (result) {
                    console.log(result);
                    vm.message = result;
                    vm.savedSuccessfully = true;
                    vm.mode = "viewprofile";
            }, function (reason) {
                vm.message = "Failed : " + reason + ":";//+  authService.message;
                console.log(reason);
            }, function (update) {
                vm.message = "updated";
            })
        }
    }
})();
