$(function () {

    namespace.define('bundle.module.user.service');

    bundle.module.user.service.authService = {

        //identity: null,

        getToken: function () {
            var identity = bundle.module.user.store.identityStore.get();
            if(_.isEmpty(identity)) {
                return null;
            }
            return identity.token;
        },

        isLogin: function () {
            var identity = bundle.module.user.store.identityStore.get();
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
                        //console.info('Success authorization!');
                        //console.log('success:', data);
                        //container.authService.identity = data;
                        bundle.module.user.store.identityStore.set(data);
                        resolve(data);
                    },
                    error: function(data) {
                        //console.info('Error authorization!');
                        //console.log('error:', data);
                        reject(data);
                        //return reject(new Error("Error login or password!"));
                    },
                };
                bundle.rest.api.setBaseUrl('http://api.union.project/v1');
                bundle.rest.api.sendRequest(request);
            });
        },

        logout: function () {
            bundle.module.user.store.identityStore.set(null);
            //module.user.store.authStore.identity = null;
        },

    };

});
