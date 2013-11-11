'use strict';
angular.module("myApp.controllers").controller('PortfolioCtrl', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams){
    $scope.searchQuery = '';

    $scope.load = function(page){
        var query = 'count=8&page=' + page;
        $http.get('/api/portfolio/getProjects?' + query).
            success(function(data){
                console.log(data);
                $scope.projects = data.projects;
                $scope.previousPage = page > 1;
                $scope.nextPage = (data.pages - (page) > 0);
            }).
            error(function(data){
                console.warn("failed" + data);
            });
    };
    if ($routeParams.page)
    {
        $scope.load($routeParams.page);
        $scope.page = parseInt($routeParams.page, 0);
    }
    else{
        $scope.page = 1;
        $scope.nextPage = 0;
        $scope.previousPage = 0;
        $scope.load(1);
    }

    $scope.search = function(page){

    };






}]);