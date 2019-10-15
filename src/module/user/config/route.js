$(function () {

    bundle.spa.router.addRoute('/user/auth', function () {
        bundle.vue.loader.run({
            controller: 'user',
            action: 'auth',
        });
    });

    bundle.spa.router.addRoute('/user/logout', function () {
        bundle.vue.loader.run({
            controller: 'user',
            action: 'logout',
        });
    });

});