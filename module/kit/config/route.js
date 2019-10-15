$(function () {

    bundle.spa.router.addRoute('/kit', function () {
        bundle.vue.loader.run({
            controller: 'kit',
            action: 'all',
        });
    });

    bundle.spa.router.addRoute('/kit/:id', function (id) {
        bundle.vue.loader.run({
            controller: 'kit',
            action: id,
            query: {
                id: id,
            },
        });
    });

});