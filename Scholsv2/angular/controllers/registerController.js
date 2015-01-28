(function () {
    'use strict';

    angular
        .module('app')
        .controller('registerController', registerController);

    registerController.$inject = ['$location', 'authService','searchService'];

    /* @ngInject */
    function registerController($location, authService, searchService) {
        /* jshint validthis: true */
        var vm = this;

        vm.activate = activate;
        vm.title = 'registerController';

        vm.savedSuccessfully = false;
        vm.message = "";

        vm.registration = {
            email: "",
            password: "",
            confirmPassword: "",
            UserMajor:"",
            FirstName:"",
            MiddleName:"",
            LastName:"",
            UniversityId:"",
            PhoneNumber:""
        };
        vm.register = register;
        vm.login = login;

        activate();

        function activate() {
            var promise = searchService.getDropDowns();
            promise.then(function (data) {
                vm.majors = data.majors;
                //console.log(vm.majors);
            }, function (reason) {
                console.log(reason);
            });
        }

        function register() {
            console.log(vm.registration, "before call save");
            console.log(vm.message);
            var promise = authService.saveRegistration(vm.registration); //vm.login_username, vm.login_password);
            promise.then(function (result) {
                if (!(jQuery.isEmptyObject(result))) {
                    //vm.msg=AuthFactory.message;
                    //console.log("$location move");
                    console.log(result);
                    vm.message = result;
                    vm.savedSuccessfully = true;
                    $location.path("login");
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

        function login() {
            $location.path('/auth/login')
        }
    }
})();
