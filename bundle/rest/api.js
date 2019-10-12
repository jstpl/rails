$(function () {

    namespace.define('bundle.rest');

    window.bundle.rest.api = {

        baseUrl: null,

        setBaseUrl: function (baseUrl) {
            bundle.rest.api.baseUrl = baseUrl;
        },

        sendRequest: function (request) {
            request.url = bundle.rest.api.baseUrl + '/' + request.url;
            if(bundle.module.user.store.authStore.identity != null) {
                request.headers = {};
                request.headers.Authorization = bundle.module.user.store.authStore.identity.token;
            }

            $.ajax(request);
        },

    };

});