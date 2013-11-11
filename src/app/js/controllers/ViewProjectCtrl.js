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
                console.log($scope.project);
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
        $http.post('/api/portfolio/deleteProject', {'_id': $scope.project._id}).
            success(function(data){
                console.log(data);
                $location.url('/portfolio');
            }).
            error(function(err){
                console.error(err);
            });
    };

    $scope.editProject = function(){
        $http.post('/api/portfolio/updateProject', {'_id': $scope.project._id, 'siteName': $scope.project.siteName, 'siteAddress': $scope.project.siteAddress, 'information': $scope.project.information}).
            success(function(data){
                console.log(data);
            }).
            error(function(err){
                console.error(err);
            });
    };


}]);
