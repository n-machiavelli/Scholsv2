(function () {
    'use strict';

    angular
        .module('app')
        .controller('loginController', loginController);

    loginController.$inject = ['authService', '$location'];

    /* @ngInject */
    function loginController(authService, $location) {
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
        vm.register = register;

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
            console.log(vm.loginData);
            vm.spinnerdisplay = "showme";
            var promise = authService.login(vm.loginData); //vm.login_username, vm.login_password);
            promise.then(function (authData) {
                if (!(jQuery.isEmptyObject(authData))) {
                    //vm.msg=AuthFactory.message;
                    //console.log("$location move");
                    console.log(authData);
                    vm.authData = authData;
                    vm.spinnerdisplay = "hideme";
                    $location.path("/");
                } else {
                    vm.msg = "Empty auth";//AuthFactory.message;
                    vm.spinnerdisplay = "hideme";
                    console.log(vm.msg);
                }
            }, function (reason) {
                vm.message = "Failed : " + reason.error_description;
                vm.spinnerdisplay = "hideme";
                console.log(vm.message);
            }, function (update) {
                vm.message = "updated";
            })
        }

    }
})();