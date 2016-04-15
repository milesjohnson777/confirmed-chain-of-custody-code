myApp.factory('CallService', ['$http', function($http){
        var allStudents;
        var allUsers;
        var getStudents = function(){
            $http.get('/students').then(function(response){
                // allStudents.data = response.data;
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
                // allUsers.data = response.data;
            });
        };
        var postUsers = function(user){
            $http.post('/users').then(function(response){
                console.log(user);
                getUsers();
            });
        };
        var deleteUsers = function(){
            $http.delete('/users/' + users._id).then(function(){
                getUsers();
            });
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
