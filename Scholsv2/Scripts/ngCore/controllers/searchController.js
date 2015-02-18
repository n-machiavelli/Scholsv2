(function () {
    'use strict';

    angular
        .module('app')
        .controller('searchController', searchController);

    searchController.$inject = ['searchService', '$location', '$anchorScroll', 'authService', '$routeParams','$log'];

    /* @ngInject */
    function searchController(searchService, $location, $anchorScroll, authService, $routeParams,$log) {
        
        var vm = this;
        vm.activate = activate;
        vm.spinnerdisplay = "hideme";
        vm.message = "";
        vm.searchString = "";
        vm.errorFlag = false;
        //vm.title = 'searchController';
        vm.getScholarships = getScholarships;
        vm.toggleFavorite = toggleFavorite;
        //vm.registerClient = registerClientApp;
        vm.scholarships = [];
        vm.myApplications = [];
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
        } else if ($routeParams !== undefined && $routeParams !== null && $routeParams.myapplications !== undefined && $routeParams.myapplications == 'myapplications') {
            vm.collegename = "My Applications";
            getMyApplications();
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
                $log.error(reason);
                vm.message = "Unable to connect to the database. Please confirm connectivity and then refresh.";
                vm.errorFlag = true;
            }, function (update) {
                $log.log("got notification" + update);
            });

        }

        function getScholarships() {
            $log.log("controller title:" + vm.title);
            vm.spinnerdisplay = "showme";
            var promise = searchService.getScholarships(vm);
            promise.then(function (results) {
                $log.log("scholarships retrieved via controller");
                vm.scholarships = results;
                vm.searchString = getSearchString(results.length);
                $log.log(vm.searchString);
                $log.log(vm.scholarships);
                vm.spinnerdisplay = "hideme";
            }, function (err) {
                $log.error("error here");
                vm.spinnerdisplay = "hideme";
            }, function (update) {
                $log.log("update here");
                vm.spinnerdisplay = "hideme";
            });
        }
        function getFavoriteScholarships() {
            $log.log("controller title:" + vm.title);
            vm.spinnerdisplay = "showme";
            var promise = searchService.getFavoriteScholarships();
            promise.then(function (results) {
                $log.log("favorite scholarships retrieved via controller");
                vm.scholarships = results;
                vm.searchString = "Your Favorite scholarships...";
                $log.log(vm.searchString);
                $log.log(vm.scholarships);
                vm.spinnerdisplay = "hideme";
            }, function (err) {
                $log.error("error here");
                vm.spinnerdisplay = "hideme";
            }, function (update) {
                $log.log("update here");
                vm.spinnerdisplay = "hideme";
            });
        }
        function getMyApplications() {
            $log.log("controller title:" + vm.title);
            vm.spinnerdisplay = "showme";
            var promise = searchService.getMyApplications();
            promise.then(function (results) {
                $log.log("My Applications retrieved via controller");
                vm.myApplications = results;
                vm.searchString = "Your Applications";
                $log.log(vm.searchString);
                $log.log(vm.myApplications);
                vm.spinnerdisplay = "hideme";
            }, function (err) {
                $log.error("error here");
                vm.spinnerdisplay = "hideme";
            }, function (update) {
                $log.log("update here");
                vm.spinnerdisplay = "hideme";
            });
        }
        function getSearchString(num) {
            var search = "";
            var title = checkNull(vm.title);
            var department = checkNull(vm.department);
            var college = getCollegeString();
            var schoolyear = getSchoolYearString();
            var major = checkNull(vm.major);
            var undergradGPA = checkNull(vm.undergradGPA);
            var gradGPA = checkNull(vm.gradGPA);
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
            if (search==null || search==""){
                search="Your search results for \"No parameters\" below...";
            }else{
                search = "Your search results for \"" + search + "\" below...";
            }
            if (num == null || num === undefined || num == 0) search = "No search results for \"" + search + "\"";
            return search;
        }
        function getSchoolYearString() {
            for (var i = 0; i < vm.schoolyears.length; i++) {
                if (vm.schoolyears[i].USER_CD == vm.schoolyear) {
                    return vm.schoolyears[i].USER_CD_DESCR;
                }
            }
            return "";
        }
        function getCollegeString() {
            for (var i = 0; i < vm.colleges.length; i++) {
                if (vm.colleges[i].FUND_COLL_ATTRB == vm.college) {
                    return vm.colleges[i].FUND_COLL_DESCR;
                }
            }
            return "";
        }

        function checkNull(strg) {
            return ((strg == null || strg == "-1" || strg == "" || strg==undefined) ? "" : strg);
        }
        function toggleFavorite(fundacct, schlrshpname) {
            $log.log("togglefav " + fundacct + ":" + schlrshpname + " in " + $routeParams.favorites);
            $log.log(vm.scholarships);
            var promise = searchService.toggleFavorite(fundacct, schlrshpname);
            promise.then(function (response) {
                if ($routeParams.favorites != undefined && $routeParams.favorites == "favorites") {
                    for (var i=0; i<vm.scholarships.length; i++){
                        if (vm.scholarships[i].FUND_ACCT == fundacct) {
                            vm.scholarships.splice(i, 1);
                        }
                    }
                    $log.log(vm.scholarships);
                }
                $log.log(response);
            }, function (err) {
                $log.error("error here");
            }, function (update) {
                $log.log("update here");
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