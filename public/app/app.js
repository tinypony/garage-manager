// app.js

// define our application and pull in ngRoute and ngAnimate
var animateApp = angular.module('animateApp', ['ngRoute', 'ngAnimate', 'ui.bootstrap']);

// ROUTING ===============================================
// set our routing for this application
// each route will pull in a different controller
animateApp.config(function($routeProvider) {

    $routeProvider

        // home page
        .when('/', {
            templateUrl: 'main.html',
            controller: 'mainController',
            animation: 'main'
        })

        // about page
        .when('/secondary', {
            templateUrl: 'secondary.html',
            controller: 'secondaryController',
            animation: 'secondary'
        })

});


// CONTROLLERS ============================================
// home page controller
animateApp.controller('mainController', function($scope, $location) {
    $scope.pageClass = 'page-home';
    $scope.toSecondary = function() {
        $location.path('/secondary');
    }
});

// about page controller
animateApp.controller('secondaryController', function($scope, $location) {
    $scope.pageClass = 'page-secondary';

    $scope.goBack=function() {
        if(this.form.$valid) {
            console.log(this.booking);
            $location.path('/');
        }
    }

    $scope.unavailableDates = [new Date(18,12,2015)];

    $scope.minDate = new Date();
    // Disable weekend selection
    $scope.disabled = function(date, mode) {
        return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
    };

    $scope.status = {
        opened: false
      };

    $scope.openDatepicker = function(event) {
        $scope.status.opened = true;
    };

    $scope.booking = {
        name: '',
        phone: '',
        email: '',
        licensePlate: '',
        preferredDate: '',
        description: ''
    }
});

animateApp.controller('ctrl', function($scope, $rootScope){
      $rootScope.$on('$routeChangeSuccess', function(event, currRoute, prevRoute){
        if(!prevRoute) {
            setTimeout(function() {
                $('body').removeClass('first-load');
            }, 400);
        }
      });
    });