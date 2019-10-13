$(function () {

    namespace.define('bundle.module.navbar');

    var data = {
        isLogin: false,
        identity: {},
    };

    bundle.module.navbar.navbarConretoller = {

        el: '#navbar',
        data: data,
        created: function () {
            data.isLogin = container.authService.isLogin();
            data.identity = container.authService.getIdentity();
            container.event.registerHandler('user.auth', function (identity) {
                data.isLogin = container.authService.isLogin();
                data.identity = container.authService.getIdentity();
            });
            container.event.registerHandler('user.logout', function () {
                data.isLogin = container.authService.isLogin();
                data.identity = container.authService.getIdentity();
            });
        }

    };

});