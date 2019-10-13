$(function () {

    namespace.define('bundle.module.navbar');

    var data = {
        isLogin: false,
        username: '',
    };

    var helper = {
        update: function () {
            data.isLogin = container.authService.isLogin();
            data.username = data.isLogin ? container.authService.getIdentity().login : {};
        }
    };

    bundle.module.navbar.navbarConretoller = {
        el: '#navbar',
        data: data,
        created: function () {
            helper.update();
            container.event.registerHandler(['user.auth', 'user.logout'], helper.update);
        }
    };

});