var app = angular.module('myApp', [
    'ngMaterial',
    'ngMessages',
    'ngSanitize',
    //'ADM-dateTimePicker',
//    'ui.bootstrap',
    'blockUI',
    'ngResource'
]);

angular.module('myApp').config(function (blockUIConfig) {
    blockUIConfig.message = '';
    blockUIConfig.delay = 100;
    blockUIConfig.requestFilter = function (config) {
        if (config.url.match(/noblockui/gi)) {
            return false;
        }
    };
});


app.factory('service', function ($http, $q, $mdToast) {
    return {
        post: post,
        get: get,
        showToast: showToast,
        showError: showError,
        showSuccess: showSuccess,
        show: show,
    }
    function post(url, data) {
        var deferred = $q.defer();
        $http({
            method: "POST",
            dataType: 'json',
            headers: { 'Content-Type': 'application/json; charset=utf-8' },
            data: data ? JSON.stringify(data) : null,
            url: url
        }).then(function success(response) {
            deferred.resolve(response.data);
        }, function error(response) {
            deferred.reject(response);
        });
        return deferred.promise;
    }
    function get(url) {
        var deferred = $q.defer();
        $http({
            method: "GET",
            dataType: 'json',
            headers: { 'Content-Type': 'application/json; charset=utf-8' },
            url: url
        }).then(function success(response) {
            deferred.resolve(response.data);
        }, function error(response) {
            deferred.reject(response);
        });
        return deferred.promise;
    }

    function showToast(message) {
        if (message && message.Text) {
            $mdToast.show(
                $mdToast.simple()
                    .textContent(message.Text).position('top left').theme(message.Type).hideDelay(1000)
            );
        } else {
            $mdToast.show(
                $mdToast.simple()
                    .textContent('خطای ناشناخته.').position('top left').theme('warning').hideDelay(5000)
            );
        }
    }
    function showError(text) {
        showToast({ Text: text, Type: 'error' });
    }
    function showSuccess(text) {
        showToast({ Text: text, Type: 'success' });
    }
    function show(text) {
        $mdToast.show(
            $mdToast.simple().textContent(text).hideDelay(1000)
        );
    }
});
