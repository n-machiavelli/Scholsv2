(function () {
    'use strict';

    angular
        .module('app')
        .controller('registerController', registerController);

    registerController.$inject = ['$location', 'authService','searchService','$log'];

    /* @ngInject */
    function registerController($location, authService, searchService,$log) {
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
                $log.log(reason);
            });
        }
        function validate() {
            var isValid = true;
            var emailRegex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
            var nameRegex = /^[A-Za-z]+$/;
            var majorRegex = /^[A-Za-z\(\)\[\]\- ]+$/;
            var numberRegex = /^[0-9.]+$/;
            //var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
            if (!(emailRegex.test(vm.registration.email))) {
                vm.message += "Invalid email address. ";
                isValid = false;
            }
            if (!(nameRegex.test(vm.registration.FirstName)) || !(nameRegex.test(vm.registration.LastName))) {
                vm.message += "Invalid First Name / Last Name. Avoid numbers and spaces";
                isValid = false;
            }
            if (!(majorRegex.test(vm.registration.UserMajor)) && vm.registration.UserMajor != undefined) {
                vm.message += "Invalid Major. ";
                isValid = false;
            }
            if (vm.registration.PresentGPA != undefined && (!(numberRegex.test(vm.registration.PresentGPA)) || vm.registration.PresentGPA>4)) {
                vm.message += "Invalid present GPA. ";
                isValid = false;
            }
            if (vm.registration.HighSchoolGPA != undefined && (!(numberRegex.test(vm.registration.HighSchoolGPA)) || vm.registration.HighSchoolGPA > 4)) {
                vm.message += "Invalid high school GPA. ";
                isValid = false;
            }
            if (!(numberRegex.test(vm.registration.PhoneNumber)) && vm.registration.PhoneNumber != undefined) {
                vm.message += "Invalid Phone number. ";
                isValid = false;
            }
            if (!(numberRegex.test(vm.registration.UniversityId)) && vm.registration.UniversityId != undefined) {
                vm.message += "Invalid University ID. ";
                isValid = false;
            }

            if (vm.registration.password != vm.registration.confirmPassword) {
                vm.message += "Password must be same as Confirm Password field. ";
                isValid = false;
            }
            return isValid;
        }
        function register() {
            $log.log(vm.registration, "before call save");
            $log.log(vm.message);
            vm.message = "";
            var validForm = validate();
            if (!validForm) {
                //vm.message must have been set by validate.
                return;
            }
            vm.spinnerdisplay = "showme";
            var promise = authService.saveRegistration(vm.registration); //vm.login_username, vm.login_password);
            promise.then(function (result) {
                if (!(jQuery.isEmptyObject(result))) {
                    //vm.msg=AuthFactory.message;
                    //console.log("$location move");
                    $log.log(result);
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
                $log.error(reason);
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
