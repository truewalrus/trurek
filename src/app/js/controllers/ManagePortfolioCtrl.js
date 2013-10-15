'use strict';
angular.module("myApp.controllers").controller('ManagePortfolioCtrl', ['$scope', function($scope){
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

}]);
