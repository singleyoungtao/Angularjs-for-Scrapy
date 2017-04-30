'use strict';

angular.module('app', [
    'ngRoute',
    'ngResource',
    'ngSanitize' // 使用ng-bind-html
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
        $locationProvider.hashPrefix('!');

        $routeProvider.when('/', {
            templateUrl: 'view/test.html',
            controller: 'showPageCtrl'
        });
        $routeProvider.otherwise({ redirectTo: '/' });
    }])
    // .factory('GetUrl', ['$resource', function($resource) {
    //     return $resource('http://127.0.0.1:5000/url-get', null, {
    //         get: {
    //             method: 'GET',
    //             url: 'http://127.0.0.1:5000/url-get',
    //             isArray: false
    //         }
    //     });
    // }])
    // .factory('PostUrl', ['$http', function($http){
    //     return http://127.0.0.1:5000/url-post
    // }])
    // .factory('PostUrl', ['$resource', function($resource) {
    //     return $resource('http://127.0.0.1:5000/url-post', null, {
    //         save: {
    //             method: ['GET', 'POST'],
    //             url: 'http://127.0.0.1:5000/url-post',
    //             isArray: false
    //         }
    //     });
    // }])
    // .factory('GetResults', ['$resource', function($resource) {
    //     return $resource('http://127.0.0.1:5000/results', null, {
    //         save: {
    //             method: ['GET', 'POST'],
    //             url: 'http://127.0.0.1:5000/results',
    //             isArray: false
    //         }
    //     });
    // }])
    .controller('showPageCtrl', ['$scope', '$http',
        function($scope, $http) {
            // $scope.defaulturl = GetUrl.get();
            $http.get('http://127.0.0.1:5000/url-get').then(function(resp) {
                console.log("123")
                console.log(resp);
                $scope.defaulturl = resp.data;
                console.log($scope.defaulturl.posturl);

            }, function(error) {
                alert("Error!")
            });
            // console.log($scope.defaultrul.posturl);
            $scope.checkpasswordview = false;
            $scope.checkpass = false;
            $scope.issendurl = false;
            $scope.searched = false;
            $scope.changeUrl = function() {
                $scope.checkpasswordview = true;
            };
            $scope.checkPassword = function() {
                if ($scope.inputpassword == "nwsuaf") {
                    $scope.checkpass = true;
                    $scope.checkpasswordview = false;
                } else {
                    console.log("密码错误");
                    alert("密码错误！");
                }
            }
            $scope.sendUrlClick = function() {
                $scope.issendurl = true;
                $http.post('http://127.0.0.1:5000/url-post', { posturl: $scope.inputurl }).then(function(resp) {
                        console.log("发送成功");
                        // $scope.defaulturl = GetUrl.get();
                        // $scope.defaulturl = $http.get('http://127.0.0.1:5000/url-get').data
                        $scope.defaulturl.posturl = resp.data
                        console.log($scope.defaulturl.posturl);
                    }, function(error) {
                        alert("发送请求失败！")
                        console.log(error.status);
                    })
                    // PostUrl.save({}, { posturl: $scope.inputurl }, function(resp) {
                    //     console.log("发送成功");
                    //     $scope.defaulturl = GetUrl.get();
                    // }, function(error) {
                    //     alert("发送请求失败！")
                    //     console.log(error.status);
                    // })

            }
            $scope.checkCrawlFinished = function() {
                $http.get('http://127.0.0.1:5000/check-crawl').then(function(resp) {
                    if (resp.data.pending == 0) {
                        $scope.isfinished = true;
                    } else {
                        $scope.isfinished = false;
                    }
                }, function(error) {
                    console.log("error");
                    alert("爬取检查失败");
                })
            }
            $scope.getResultsClick = function() {
                // GetResults.save({}, { keywords: $scope.inputkeywords }, function(resp) {
                $http.post('http://127.0.0.1:5000/results', { keywords: $scope.inputkeywords }).then(function(resp) {
                    // var pageshow = GetResults.get()
                    // 'get': {method:'GET'},  'query':  {method:'GET', isArray:true}
                    var pageshow = resp.data;
                    // post方法直接就有返回的response，不用再次发get请求
                    $scope.pageshowcopy = pageshow;
                    $scope.pageshowresults = $scope.pageshowcopy.results;
                    $scope.total_items = $scope.pageshowcopy.total_items;
                    $scope.teststr = "pageshow";
                    // $scope.c = GetResults.get()
                    // 得到传过来的json后可以直接使用。
                    $scope.searched = true;
                }, function(error) {
                    $scope.searched = false;
                    alert("发送请求失败！");
                    console.log(error.status);
                });


            }

        }
    ])