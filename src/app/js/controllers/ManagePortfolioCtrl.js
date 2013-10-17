'use strict';
angular.module("myApp.controllers").controller('ManagePortfolioCtrl', ['$scope', '$http', function($scope, $http){
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

    $scope.newProject = function(){
        $http.post('/api/portfolio/addProject', {'siteName': $scope.siteName, 'siteAddress': $scope.siteAddress, 'description': $scope.description, 'information': $scope.information}).
            success(function(data) {
                console.log(data);
            }).
            error(function(data) {
                console.warn("Failure: " + data);
            });
    };

    $scope.check = function(){
        $http.get('/api/portfolio/getProjects').
            success(function(data){
                console.log(data);
            }).
            error(function(data){
                console.warn("failed" + data);
            });
    };

}]);
