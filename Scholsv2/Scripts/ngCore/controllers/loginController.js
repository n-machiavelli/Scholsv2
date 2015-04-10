(function () {
    'use strict';

    angular
        .module('app')
        .controller('loginController', loginController);

    loginController.$inject = ['authService', '$location','$log'];

    /* @ngInject */
    function loginController(authService, $location, $log) {
        /* jshint validthis: true */
        var vm = this;
        vm.loginData={
            userName: "",
            password: ""
        };
        vm.activate = activate;
        vm.title = 'loginController';
        vm.loginSuccessfully = false;
        vm.spinnerdisplay = "hideme";
        //console.log("redirect to " + authService.redirectURI);

        vm.loginTitle = " for Application " + authService.appName;
        vm.message = "";

        vm.login = login;

        //activate();

        ////////////////

        function activate() {
            vm.loginData = {
                userName: "",
                password: ""
            };
        }

        function login() {
            vm.loginData.userName = vm.login_username;
            vm.loginData.password = vm.login_password;
            $log.log(vm.loginData);
            vm.spinnerdisplay = "showme";
            var promise = authService.login(vm.loginData); //vm.login_username, vm.login_password);
            promise.then(function (authData) {
                if (!(jQuery.isEmptyObject(authData))) {
                    //vm.msg=AuthFactory.message;
                    //console.log("$location move");
                    $log.log(authData);
                    vm.authData = authData;
                    vm.spinnerdisplay = "hideme";
                    $location.path("/");
                } else {
                    vm.msg = "Empty auth";//AuthFactory.message;
                    vm.spinnerdisplay = "hideme";
                    $log.error(vm.msg);
                }
            }, function (reason) {
                if (reason.error_description == undefined) {
                    vm.message="Unable to access the system";
                } else {
                    vm.message = "Failed : " + reason.error_description;
                }                
                vm.spinnerdisplay = "hideme";
                $log.error(vm.message);
            }, function (update) {
                vm.message = "updated";
            })
        }

    }
})();