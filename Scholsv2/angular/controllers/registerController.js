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
        vm.spinnerdisplay = "hideme";
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
        function validate() {
            var isValid = true;
            emailRegex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
            if (!(emailRegex.test(vm.email))) {
                vm.message += "Invalid email address. ";
                isValid = false;
            }
            if (vm.password != vm.confirmPassword) {
                vm.message += "Password must be same as Confirm Password field. ";
                isValid = false;
            }
            return isValid;
        }
        function register() {
            console.log(vm.registration, "before call save");
            console.log(vm.message);
            vm.spinnerdisplay = "showme";
            var validForm = validate();
            if (!validForm) {
                //vm.message must have been set by validate.
                return;
            }
            var promise = authService.saveRegistration(vm.registration); //vm.login_username, vm.login_password);
            promise.then(function (result) {
                if (!(jQuery.isEmptyObject(result))) {
                    //vm.msg=AuthFactory.message;
                    //console.log("$location move");
                    console.log(result);
                    vm.message = result;
                    vm.savedSuccessfully = true;
                    vm.spinnerdisplay = "hideme";
                    $location.path("login");
                } else {
                    //vm.message = "Empty auth";//AuthFactory.message; supposed to be empty bcos AccountController Register returns Ok().TODO:Ok(Message)
                    vm.savedSuccessfully = true;
                    vm.spinnerdisplay = "hideme";
                    $location.path("login");
                }
            }, function (reason) {
                vm.message = "Failed : " + reason.Message; // + ":" +  authService.message;
                vm.spinnerdisplay = "hideme";
                console.log(reason);
            }, function (update) {
                vm.spinnerdisplay = "hideme";
                vm.message = "updated";
            })
        }

        function login() {
            $location.path('/auth/login')
        }
    }
})();
