$(function () {

    bundle.spa.router.addRoute('/person/view', function () {
        bundle.vue.loader.run({
            controller: 'person',
            action: 'view',
        });
    });

    bundle.spa.router.addRoute('/person/update', function () {
        bundle.vue.loader.run({
            controller: 'person',
            action: 'update',
        });
    });

});