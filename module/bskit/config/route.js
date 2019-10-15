$(function () {

    bundle.spa.router.addRoute('/bskit', function () {
        bundle.vue.loader.run({
            controller: 'bskit',
            action: 'all',
        });
    });

    bundle.spa.router.addRoute('/bskit/:id', function (id) {
        bundle.vue.loader.run({
            controller: 'bskit',
            action: id,
            query: {
                id: id,
            },
        });
    });

});