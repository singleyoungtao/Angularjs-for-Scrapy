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
    }])
    .factory('GetResults', ['$resource', function($resource) {
        return $resource('http://127.0.0.1:5000/results', null, {
            action: {
                method: ['GET', 'POST'],
                url: 'someOtherUrl',
                isArray: false
            }
        });
    }])
    // .factory('PostKeywords', ['$resource', function($resource) {
    //     return $resource('http://127.0.0.1:5000/keywords', null, {
    //         action: {
    //             method: 'POST',
    //             url: 'someOtherUrl',
    //             isArray: false
    //         }
    //     });
    // }])
    .controller('showPageCtrl', ['$scope', 'GetResults',
        function($scope, GetResults) {
            $scope.searched = false
            $scope.getResultsClick = function() {
                GetResults.save({}, { keywords: $scope.inputkeywords }, function(resp) {
                    // var pageshow = GetResults.get()
                    // 'get': {method:'GET'},  'query':  {method:'GET', isArray:true}
                    var pageshow = resp
                        // post方法直接就有返回的response，不用再次发get请求
                    $scope.pageshowcopy = pageshow
                    $scope.pageshowresults = $scope.pageshowcopy.results
                    $scope.teststr = "pageshow"
                        // $scope.c = GetResults.get()
                        // 得到传过来的json后可以直接使用。
                    $scope.searched = true
                }, function(error) {
                    console.log(error.status)
                })
            }

        }
    ])