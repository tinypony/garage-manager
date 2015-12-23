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
            controller: 'mainController'
        })

        // about page
        .when('/secondary', {
            templateUrl: 'secondary.html',
            controller: 'secondaryController'
        })

        .when('/login', {
            templateUrl: 'login.html',
            controller: 'LoginCtrl'
        })

        .when('/orders', {
            templateUrl: 'orders.html',
            controller: 'OrdersCtrl'
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
animateApp.controller('secondaryController', function($scope, $location, $http) {
    $scope.pageClass = 'page-secondary';

    $scope.submitOrder = function() {
        if(this.form.$valid) {
	    $http.post('/orders', $scope.booking)
		.then(function(resp) {
			
			$scope.pageClass = 'page-secondary booked';
		});
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

    $scope.formatDate = function(dt) {
      return moment(dt).format('DD/MM/YYYY');
    }
});

// home page controller
animateApp.controller('LoginCtrl', function($scope, $location) {
    $scope.pageClass = 'page-login';
    $scope.loginInfo = {
        login: '',
        password: ''
    };
    $scope.doLogin = function() {
        console.log(this.loginInfo);
    }
});

// home page controller
animateApp.controller('OrdersCtrl', function($scope, $http) {
    $scope.pageClass = 'page-orders';
    $http.get('/orders').then(function(resp) {
        $scope.orders = resp.data;
    });
});

animateApp.controller('ctrl', function($scope, $rootScope) {
      $rootScope.$on('$routeChangeSuccess', function(event, currRoute, prevRoute){
            if(!prevRoute) {
                setTimeout(function() {
                    $('body').removeClass('first-load');
                }, 400);
            }
      });
});
