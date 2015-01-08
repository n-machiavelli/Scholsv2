(function () {
    'use strict';

    angular
        .module('app')
        .controller('searchController', searchController);

    searchController.$inject = ['searchService','$location','$anchorScroll','authService','$routeParams'];

    /* @ngInject */
    function searchController(searchService,$location,$anchorScroll,authService,$routeParams) {
        /* jshint validthis: true */
        var vm = this;
        vm.activate = activate;
        vm.spinnerdisplay = "hideme";
        vm.message = "";
        //vm.title = 'searchController';
        vm.getScholarships = getScholarships;
        vm.toggleFavorite = toggleFavorite;
        //vm.registerClient = registerClientApp;
        vm.scholarships = [];
        if ($routeParams !== undefined && $routeParams !== null && $routeParams.collegecode!==undefined) {
            vm.college = $routeParams.collegecode;
            vm.collegename = $routeParams.collegename;
            if (vm.collegename.indexOf("College") == -1) {
                vm.collegename = "College of " + $routeParams.collegename;
            }
            getScholarships();
        } else {
            activate();
        }

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

        function getScholarships() {
            console.log("controller title:" + vm.title);
            vm.spinnerdisplay = "showme";
            var promise=searchService.getScholarships(vm);
            promise.then(function (results) {
                console.log("scholarships retrieved via controller");
                vm.scholarships = results;
                console.log(vm.scholarships);
                vm.spinnerdisplay = "hideme";
            }, function (err) {
                console.log("error here");
                vm.spinnerdisplay = "hideme";
            }, function(update){
                console.log("update here");
                vm.spinnerdisplay = "hideme";
            });
            
        }
        function toggleFavorite(fundacct, schlrshpname) {
            console.log("togglefav " + fundacct + ":" + schlrshpname);
            var promise = searchService.toggleFavorite(fundacct, schlrshpname);
            promise.then(function (response) {
                console.log(response);
            }, function (err) {
                console.log("error here");
            }, function (update) {
                console.log("update here");
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