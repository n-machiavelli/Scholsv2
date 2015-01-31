(function () {
    'use strict';

    angular
        .module('app')
        .controller('searchController', searchController);

    searchController.$inject = ['searchService', '$location', '$anchorScroll', 'authService', '$routeParams'];

    /* @ngInject */
    function searchController(searchService, $location, $anchorScroll, authService, $routeParams) {
        /* jshint validthis: true */
        var vm = this;
        vm.activate = activate;
        vm.spinnerdisplay = "hideme";
        vm.message = "";
        vm.searchString = "";
        //vm.title = 'searchController';
        vm.getScholarships = getScholarships;
        vm.toggleFavorite = toggleFavorite;
        //vm.registerClient = registerClientApp;
        vm.scholarships = [];
        vm.authentication = authService.authentication;
        vm.isAuthorized = authService.authentication.isAuth;  //need this also in this ctrlr for use in displaying fav star
        if ($routeParams !== undefined && $routeParams !== null && $routeParams.collegecode !== undefined) {
            vm.college = $routeParams.collegecode;
            vm.collegename = $routeParams.collegename;
            if (vm.collegename.indexOf("College") == -1) {
                vm.collegename = "College of " + $routeParams.collegename;
            }
            getScholarships();
        } else if ($routeParams !== undefined && $routeParams !== null && $routeParams.favorites !== undefined && $routeParams.favorites == 'favorites') {
            vm.collegename = "Favorites";
                getFavoriteScholarships();
        } else {
            activate();
        }

        function activate() {
            var promise = searchService.getDropDowns();
            promise.then(function (data) {
                vm.majors = data.majors;
                //console.log(vm.majors);
                vm.colleges = data.colleges;
                vm.departments = data.departments;
                vm.schoolyears = data.schoolyears;
            }, function (reason) {
                console.log(reason)
            }, function (update) {
                console.log("got notification" + update);
            });

        }

        function getScholarships() {
            console.log("controller title:" + vm.title);
            vm.spinnerdisplay = "showme";
            var promise = searchService.getScholarships(vm);
            promise.then(function (results) {
                console.log("scholarships retrieved via controller");
                vm.scholarships = results;
                vm.searchString = getSearchString(results.length);
                console.log(vm.scholarships);
                vm.spinnerdisplay = "hideme";
            }, function (err) {
                console.log("error here");
                vm.spinnerdisplay = "hideme";
            }, function (update) {
                console.log("update here");
                vm.spinnerdisplay = "hideme";
            });
        }
        function getFavoriteScholarships() {
            console.log("controller title:" + vm.title);
            vm.spinnerdisplay = "showme";
            var promise = searchService.getFavoriteScholarships();
            promise.then(function (results) {
                console.log("favorite scholarships retrieved via controller");
                vm.scholarships = results;
                vm.searchString = "Your Favorite scholarships...";
                console.log(vm.searchString);
                console.log(vm.scholarships);
                vm.spinnerdisplay = "hideme";
            }, function (err) {
                console.log("error here");
                vm.spinnerdisplay = "hideme";
            }, function (update) {
                console.log("update here");
                vm.spinnerdisplay = "hideme";
            });
        }
        function getSearchString(num) {
            var search = "";
            var title = checkNull(vm.title);
            var department = checkNull(vm.department);
            var college = checkNull(vm.college);
            var schoolyear = checkNull(vm.schoolyear);
            var major = checkNull(vm.major);
            var undergradGPA = checkNull(vm.undergradGPA);
            var gradGPA = checkNull(vm.undergradGPA);
            var highschoolGPA = checkNull(vm.highschoolGPA);
            var keyword = checkNull(vm.keyword);
            if (title != "") search += (title + ",");
            if (department != "") search += (department + ",");
            if (college != "") search += (college + ",");
            if (schoolyear != "") search += (schoolyear + ",");
            if (major != "") search += (major + ",");
            if (undergradGPA != "") search += (undergradGPA + ",");
            if (gradGPA != "") search += (gradGPA + ",");
            if (highschoolGPA != "") search += (highschoolGPA + ",");
            if (keyword != "") search += (keyword + ",");
            search = search.substring(0, search.length - 1);

            search = "Your search results for \"" + search + "\" below...";
            if (num == null || num === undefined || num == 0) search = "No search results for \"" + search + "\"";
            return search;
        }
        function checkNull(strg) {
            return ((strg == null || strg == "-1" || strg == "") ? "" : strg);
        }
        function toggleFavorite(fundacct, schlrshpname) {
            console.log("togglefav " + fundacct + ":" + schlrshpname + " in " + $routeParams.favorites);
            console.log(vm.scholarships);
            var promise = searchService.toggleFavorite(fundacct, schlrshpname);
            promise.then(function (response) {
                if ($routeParams.favorites != undefined && $routeParams.favorites == "favorites") {
                    for (var i=0; i<vm.scholarships.length; i++){
                        if (vm.scholarships[i].FUND_ACCT == fundacct) {
                            vm.scholarships.splice(i, 1);
                        }
                    }
                    console.log(vm.scholarships);
                }
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