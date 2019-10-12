$(function () {

    bundle.spa.router.addRoute('/user/auth', function () {
        bundle.vue.loader.run({
            controller: 'user',
            action: 'auth',
        });
    });

    bundle.spa.router.addRoute('/user/person', function () {
        bundle.vue.loader.run({
            controller: 'user',
            action: 'person',
        });
    });

});