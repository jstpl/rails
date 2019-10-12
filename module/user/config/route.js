$(function () {

    bundle.spa.router.addRoute('/user/auth', function () {
        bundle.vue.loader.run({
            controller: 'user',
            action: 'auth',
        });
    });

});