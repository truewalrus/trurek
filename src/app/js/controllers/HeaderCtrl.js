'use strict';
angular.module("myApp.controllers").controller('HeaderCtrl', ['$scope','$location', function($scope, $location){

    $scope.active = 0;

    $scope.makeActive = function(){
        console.log("test");
        //console.log($uiRoute);
    };

}]);