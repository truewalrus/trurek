'use strict';
angular.module("myApp.controllers").controller('PortfolioCtrl', ['$scope', '$http', function($scope, $http){

    $scope.page1 ='';
    $scope.page2 ='';

    $scope.tempPort = [
        {
            "title": "Super Proj One",
            "description": "Website for some stuff we did",
            "img": "../img/BuyABoat.jpg"
        },
        {
            "title": "Super Proj Two",
            "description": "Website for some other stuff we did",
            "img": "../img/BuyABoat.jpg"
        },
        {
            "title": "Super Proj Three",
            "description": "Website for some stuff we did and it's still a boat",
            "img": "../img/BuyABoat.jpg"
        },
        {
            "title": "Super Proj Four",
            "description": "Website for some stuff we did which is for some reason still a boat",
            "img": "../img/BuyABoat.jpg"
        }];

    $scope.load = function(page){
        var query = 'count=4&page=' + page;
        $http.get('/api/portfolio/getProjects?' + query).
            success(function(data){
                console.log(data);
                $scope.page1 = data.projects;
            }).
            error(function(data){
                console.warn("failed" + data);
            });

        var query2 = 'count=4&page=' + (page+1);
        $http.get('/api/portfolio/getProjects?' + query2).
            success(function(data){
                console.log(data);
                $scope.page2 = data.projects;
            }).
            error(function(data){
                console.warn('failed' +data);
            });
    };
    $scope.load(1);



}]);