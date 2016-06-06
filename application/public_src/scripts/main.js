angular.module('app', ['ngRoute'])
    .config(function($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/pages/homepage.html',
                controller: 'HomepageCtrl'
            })
            .when('/map', {
            	templateUrl: 'views/pages/mapTemplate.html'
            })
            .otherwise({
                redirectTo: '/'
            });
});
