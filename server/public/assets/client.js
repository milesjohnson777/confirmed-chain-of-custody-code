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
        $scope.students = CallService.students;
        $scope.submitStudent = CallService.postStudents;
        $scope.users = CallService.users;
        $scope.submitUser = CallService.postUsers;
    }]);
