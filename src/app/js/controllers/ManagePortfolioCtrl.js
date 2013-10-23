'use strict';
angular.module("myApp.controllers").controller('ManagePortfolioCtrl', ['$scope', '$http', function($scope, $http){
    $scope.recentProjects = [];


    $scope.newProject = function(){
        $http.post('/api/portfolio/addProject', {'siteName': $scope.siteName, 'siteAddress': $scope.siteAddress, 'description': $scope.description, 'information': $scope.information}).
            success(function(data) {
                console.log(data);
                $scope.load(1);
            }).
            error(function(data) {
                console.warn("Failure: " + data);
            });
    };

    $scope.load = function(page){
        var query = 'count=4&page=' + page;
        $http.get('/api/portfolio/getProjects?' + query).
            success(function(data){
                console.log(data);
                $scope.recentProjects = data.projects;
            }).
            error(function(data){
                console.warn("failed" + data);
            });
    };
    $scope.load(1);

  /*  $scope.retrievePosts = function(page) {
        if (page) { $scope.page = page; }

        var query = 'count=8&page=' + $scope.page;

        if ($scope.tab.current != $scope.tab.all) {
            query = query + '&tag=' + $scope.tab.current;
        }

        $http.get('api/articles/front?' + query).
            success(function(data) {
                $scope.posts = data.articles;
                $scope.pageCount = data.pages;
            }).
            error(function(err) {
                console.error(err);
            });
    };*/

}]);
