$(function () {

    namespace.define('bundle.module.user.service');

    var identityStore = bundle.module.user.store.identityStore;

    bundle.module.user.service.authService = {

        getIdentity: function () {
            var identity = identityStore.get();
            if(_.isEmpty(identity)) {
                return null;
            }
            return identity;
        },

        getToken: function () {
            var identity = identityStore.get();
            if(_.isEmpty(identity)) {
                return null;
            }
            return identity.token;
        },

        isLogin: function () {
            var identity = identityStore.get();
            return ! _.isEmpty(identity);
        },

        auth: function (loginDto) {
            var request = {
                url: "auth",
                type: "POST",
                data: {
                    login: loginDto.login,
                    password: loginDto.password,
                },
            };
            var promise = container.restClient.sendRequestPromise(request);
            promise.then(function (identity) {
                identityStore.set(identity);
                container.event.trigger('user.auth.login', identity);
            });
            return promise;
        },

        logout: function () {
            identityStore.set(null);
            container.event.trigger('user.auth.logout');
            //module.user.store.authStore.identity = null;
        },

    };

});
