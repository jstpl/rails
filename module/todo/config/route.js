$(function () {

    bundle.spa.router.addRoute('/todo', function () {
        bundle.vue.loader.run({
            controller: 'todo',
            action: 'all',
        });
    });

    bundle.spa.router.addRoute('/todo/create', function (id) {
        bundle.vue.loader.run({
            controller: 'todo',
            action: 'create',
        });
    });

    bundle.spa.router.addRoute('/todo/view/:id', function (id) {
        bundle.vue.loader.run({
            controller: 'todo',
            action: 'one',
            query: {
                id: id,
            },
        });
    });

    bundle.spa.router.addRoute('/todo/update/:id', function (id) {
        bundle.vue.loader.run({
            controller: 'todo',
            action: 'update',
            query: {
                id: id,
            },
        });
    });

    bundle.spa.router.addRoute('/todo/delete/:id', function (id) {
        bundle.vue.loader.run({
            controller: 'todo',
            action: 'delete',
            query: {
                id: id,
            },
        });
    });

});