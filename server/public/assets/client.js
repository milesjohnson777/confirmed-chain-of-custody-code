var myApp = angular.module('myApp', ['ngMaterial', 'ngMessages', 'ngRoute']);

    myApp.controller('TabCtrl', ['$scope', function($scope){
        $scope.tab = 1;
        $scope.setTab = function(newTab){
            $scope.tab = newTab;
        };
        $scope.isSet = function(tabNum){
            return $scope.tab === tabNum;
        };
    }]);
    myApp.controller('SubTabCtrl', ['$scope', function($scope){
        $scope.subTab = 1;
        $scope.setSubTab = function(newTab){
            $scope.subTab = newTab;
        };
        $scope.isSubSet = function(tabNum){
            return $scope.subTab === tabNum;
        };
    }]);
    myApp.controller('CallCtrl', ['$scope', 'CallService', function($scope, CallService){

        // Route params service https://docs.angularjs.org/api/ngRoute/service/$routeParams
        function postStudentsDone(response){
            getStudents();
            clearScopeStudent();
        }

        function postUsersDone(response){
            getUsers();
            clearScopeUser();
        }

        function getStudents(){
            CallService.getStudents().then(function(response){
                $scope.listOfStudents = response.data;
            });
        }

        function getUsers(){
            CallService.getUsers().then(function(response){
                $scope.listOfUsers = response.data;
            });
        }

        function clearScopeUser(){
            $scope.user = {};
        }

        function clearScopeStudent(){
            $scope.student = {};
        }

        function deleteUser(user){
            CallService.deleteUsers(user).then(getUsers);
        }

        function deleteStudent(student){
            CallService.deleteStudents(student).then(getStudents);
        }

        function init(){
            clearScopeUser();
            clearScopeStudent();
            getStudents();
            getUsers();
        }

        init();

        $scope.submitStudent = function(){
            CallService.postStudents($scope.student).then(postStudentsDone);
        }

        $scope.submitUser = function(){
            CallService.postUsers($scope.user).then(postUsersDone);
        }

        $scope.deleteStudent = function(student){
            deleteStudent(student);
        }

        $scope.deleteUser = function(user){
            deleteUser(user);
        }



    }]);
