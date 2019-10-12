$(function () {

    namespace.define('bundle.module.user.store');

    bundle.module.user.store.authStore = {

        auth: function (loginDto) {
            console.log('DATA: ', loginDto);
            return new Promise(function(resolve, reject) {
                if(loginDto.login === '77771111111' && loginDto.password === 'Wwwqqq111') {
                    return resolve({
                        id: 123,
                        username: 'John'
                    });
                } else {
                    return reject(new Error("Error login or password!"));
                }
            });
        },

    };

});
