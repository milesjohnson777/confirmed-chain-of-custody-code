myApp.factory('CallService', ['$http', function($http){
        var students = {};
        var users = {};
        var getStudents = function(){
            $http.get('/students').then(function(response){
                students.data = response.data;
            });
        };
        var postStudents = function(){
            $http.post('/students').then(function(){
                getStudents();
            });
        };
        var deleteStudents = function(){
            $http.delete('/students/' + students._id).then(function(){
                getStudents();
            });
        };
        var getUsers = function(){
            $http.get('/users').then(function(response){
                users.data = response.data;
            });
        };
        var postUsers = function(){
            $http.post('/users').then(function(){
                getUsers();
            });
        };
        var deleteUsers = function(){
            $http.delete('/users/' + users._id).then(function(){
                getUsers();
            });
        };
    return{
        users: users,
        students: students,
        getStudents: getStudents,
        postStudents: postStudents,
        deleteStudents: deleteStudents,
        getUsers: getUsers,
        postUsers: postUsers,
        deleteUsers: deleteUsers
    }
}]);
