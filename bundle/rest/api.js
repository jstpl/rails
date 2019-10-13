$(function () {

    namespace.define('bundle.rest');

    window.bundle.rest.api = {

        baseUrl: null,

        setBaseUrl: function (baseUrl) {
            this.baseUrl = baseUrl;
        },

        sendRequest: function (request) {
            this.prepareRequest(request);
            $.ajax(request);
        },

        sendRequestPromise: function (requestSource) {
            var request = _.clone(requestSource);
            this.prepareRequest(request);
            var promiseCallback = function(resolve,reject){
                request.success = function(data) {
                    resolve(data);
                    container.event.trigger('api.request.send.success', data);
                };
                request.error = function(jqXHR, exception) {
                    helper.errorCallback(jqXHR, exception);
                    reject(jqXHR);
                    container.event.trigger('api.request.send.error', {
                        jqXHR: jqXHR,
                        exception: exception,
                    });
                };
                $.ajax(request);
            };
            return new Promise(promiseCallback);
        },

        prepareRequest: function (request) {
            this.prepareRequestUrl(request);
            helper.prepareRequestAuthorization(request);
        },

        prepareRequestUrl: function (request) {
            request.url = this.baseUrl + '/' + request.url;
        },

    };

    var helper = {

        prepareRequestAuthorization: function (request) {
            var token = container.authService.getToken();
            if(token) {
                request.headers = {};
                request.headers.Authorization = token;
            }
        },

        errorCallback: function (jqXHR, exception) {
            var msg = bundle.helper.ajax.getErrorMessage(jqXHR, exception);
            container.notify.error('Произошла ошибка запроса!' + "<br/>" + msg);
        },
    };
});