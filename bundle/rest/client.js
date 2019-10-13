$(function () {

    namespace.define('bundle.rest');

    window.bundle.rest.client = {

        baseUrl: null,

        get: function (url, query, headers) {
            var request = {
                url: url,
            };
            if(headers) {
                request.headers = _.defaultTo(headers, {});
            }
            return this.sendRequest(request);
        },

        post: function (url, data, headers) {
            var request = {
                url: url,
                type: 'POST',
                data: data,
            };
            if(headers) {
                request.headers = _.defaultTo(headers, {});
            }
            return this.sendRequest(request);
        },

        put: function (url, data, headers) {
            var request = {
                url: url,
                type: 'PUT',
                data: data,
            };
            if(headers) {
                request.headers = _.defaultTo(headers, {});
            }
            return this.sendRequest(request);
        },

        del: function (url, query, headers) {
            var request = {
                url: url,
                type: 'DELETE',
            };
            if(headers) {
                request.headers = _.defaultTo(headers, {});
            }
            return this.sendRequest(request);
        },

        setBaseUrl: function (baseUrl) {
            this.baseUrl = baseUrl;
        },

        sendRequest: function (requestSource) {
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
            request.headers = _.defaultTo(request.headers, {});
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
                request.headers.Authorization = token;
            }
        },

        errorCallback: function (jqXHR, exception) {
            var msg = bundle.helper.ajax.getErrorMessage(jqXHR, exception);
            container.notify.error('Произошла ошибка запроса!' + "<br/>" + msg);
        },
    };
});