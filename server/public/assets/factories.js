myApp.factory('CallService', ['$http', function($http){
        var getStudents = function(){
            return $http.get('/students').then(function(response){
                return response;
            });
        };
        var postStudents = function(students){
            return $http.post('/students', students).then(function(response){
                return response;
            });
        };
        var deleteStudents = function(student){
            return $http.delete('/students/' + student._id);
        };
        var getUsers = function(){
            return $http.get('/users').then(function(response){
                return response;
            });
        };
        var postUsers = function(user){
            return $http.post('/users', user).then(function(response){
                return response;
            });
        };
        var deleteUsers = function(user){
            return $http.delete('/users/' + user._id);
        };

    return{
        getStudents: getStudents,
        postStudents: postStudents,
        deleteStudents: deleteStudents,
        getUsers: getUsers,
        postUsers: postUsers,
        deleteUsers: deleteUsers
    }
}]);
