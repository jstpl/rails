$(function () {

    namespace.define('bundle.rest');

    window.bundle.rest.api = {

        baseUrl: null,

        setBaseUrl: function (baseUrl) {
            bundle.rest.api.baseUrl = baseUrl;
        },

        sendRequest: function (request) {
            request.url = bundle.rest.api.baseUrl + '/' + request.url;
            var identity = bundle.module.user.store.identityStore.get();
            if(identity != null) {
                request.headers = {};
                request.headers.Authorization = container.authService.identity.token;
            }

            $.ajax(request);
        },

    };

});