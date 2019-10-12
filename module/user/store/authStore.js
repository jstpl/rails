$(function () {

    namespace.define('bundle.module.user.store');

    bundle.module.user.store.authStore = {

        identity: null,

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
                        console.log('success:', data);
                        bundle.module.user.store.authStore.identity = data;
                        resolve(data);
                    },
                    error: function(data) {
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
            module.user.store.authStore.identity = null;
        },

    };

});
