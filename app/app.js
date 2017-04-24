'use strict';

angular.module('app', [
    'ngRoute',
    'ngResource'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('!');

    $routeProvider.when('/', {
        templateUrl: 'view/test.html',
        controller: 'showPageCtrl'
    });
    $routeProvider.otherwise({ redirectTo: '/' });
}]).
factory('GetResults', ['$resource', function($resource) {
        return $resource('http://127.0.0.1:5000/results', null, {
            action: {
                method: 'GET',
                url: 'someOtherUrl',
                isArray: false
            }
        });
    }])
    .controller('showPageCtrl', ['$scope', 'GetResults', function($scope, GetResults) {
        var pageshow = GetResults.query()
        $scope.results = pageshow['results']
    }])