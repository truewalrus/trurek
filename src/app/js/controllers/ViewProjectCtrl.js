'use strict';
angular.module("myApp.controllers").controller('ViewProjectCtrl', ['$scope', '$routeParams', '$http', '$location', function($scope, $routeParams, $http, $location){
    $scope.project = {};
    if ($routeParams.id)
    {
        console.log($routeParams.id);
        var query = 'id='+$routeParams.id;

        $http.get('/api/portfolio/getProjects?' + query).
            success(function(data) {
                $scope.project = data.projects[0];
                if(!data){
                    $location.url('/home');
                }
            }).
            error(function(err) {
                console.error(err);
            });
    }
    else{
        $location.url('/home');
    }

    $scope.deleteProject = function(){
        $http.post('/api/portfolio/deleteProject', {'id': $scope.project.id}).
            success(function(data){
                console.log(data);
                $location.url('/portfolio');
            }).
            error(function(err){
                console.error(err);
            });
    };


}]);
