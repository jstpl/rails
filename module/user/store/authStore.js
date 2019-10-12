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
                        //console.log('success:', data);
                        bundle.module.user.store.authStore.identity = data;
                        resolve(data);
                    },
                    error: function(data) {
                        //console.log('error:', data);
                        reject(data);
                    },
                };
                bundle.rest.api.setBaseUrl('http://api.union.project/v1');
                bundle.rest.api.sendRequest(request);
                /*
                if(loginDto.login === '77771111111' && loginDto.password === 'Wwwqqq111') {
                    return resolve({
                        id: 123,
                        username: 'John'
                    });
                } else {
                    return reject(new Error("Error login or password!"));
                }*/
            });
        },

        login: function (login, password) {
            if(typeof password == 'undefined') {
                password = 'Wwwqqq111';
            }
            var formData = form.getData();
            var apiHost = hostStore.oneApiHostByUrl(formData.url);
            bundle.rest.api.setBaseUrl(apiHost);
            var promise = new Promise(function(resolve,reject){
                var request = {
                    url: "auth",
                    type: "POST",
                    data: {
                        login: login,
                        password: password,
                    },
                    success: function(data) {
                        module.user.store.authStore.identity = data;
                        resolve(data);
                    },
                    error: function(data) {
                        reject(data);
                    },
                };
                bundle.rest.api.sendRequest(request);
            });
            return promise;
        },

        logout: function () {
            module.user.store.authStore.identity = null;
        },

    };

});
