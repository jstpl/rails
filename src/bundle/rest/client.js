space('bundle.rest.client', function() {

    var helper = {

        prepareRequestAuthorization: function (request) {
            var token = container.authService.getToken();
            if(token) {
                request.headers.Authorization = token;
            }
        },

    };

    return  {

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
                request.error = function(jqXHR) {
                    container.event.trigger('api.request.send.error', jqXHR);
                    reject(jqXHR);
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

        /**
         * Полученние сообщения об ошибке
         * @param response {*}
         * @returns {string}
         */
        getErrorMessage: function(response) {
            var msg = '';
            if (response.status === 0) {
                msg = 'Not connect.\n Verify Network.';
            } else if (response.status == 404) {
                msg = 'Requested page not found. [404]';
            } else if (response.status == 500) {
                msg = 'Internal Server Error [500].';
            } else {
                msg = 'Uncaught Error.\n' + response.responseText;
            }
            return msg;
        },

    };

});