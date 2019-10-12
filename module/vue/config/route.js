$(function () {

    bundle.spa.router.addRoute('/vue', function () {
        bundle.vue.loader.run({
            controller: 'vue',
            action: 'all',
        });
    });

    bundle.spa.router.addRoute('/vue/create', function (id) {
        bundle.vue.loader.run({
            controller: 'vue',
            action: 'create',
        });
    });

    bundle.spa.router.addRoute('/vue/view/:id', function (id) {
        bundle.vue.loader.run({
            controller: 'vue',
            action: 'one',
            query: {
                id: id,
            },
        });
    });

    bundle.spa.router.addRoute('/vue/update/:id', function (id) {
        bundle.vue.loader.run({
            controller: 'vue',
            action: 'update',
            query: {
                id: id,
            },
        });
    });

    bundle.spa.router.addRoute('/vue/delete/:id', function (id) {
        bundle.vue.loader.run({
            controller: 'vue',
            action: 'delete',
            query: {
                id: id,
            },
        });
    });

});