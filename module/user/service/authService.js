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
            console.log('DATA: ', loginDto);
            return new Promise(function(resolve, reject) {
                var request = {
                    url: "auth",
                    type: "POST",
                    data: {
                        login: loginDto.login,
                        password: loginDto.password,
                    },
                    success: function(data) {
                        identityStore.set(data);
                        resolve(data);
                        container.event.trigger('user.auth', data);
                    },
                    error: function(data) {
                        reject(data);
                        //return reject(new Error("Error login or password!"));
                    },
                };
                bundle.rest.api.setBaseUrl('http://api.union.project/v1');
                bundle.rest.api.sendRequest(request);
            });
        },

        logout: function () {
            identityStore.set(null);
            container.event.trigger('user.logout');
            //module.user.store.authStore.identity = null;
        },

    };

});
