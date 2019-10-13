$(function () {

    bundle.spa.router.addRoute('/person/view', function () {
        bundle.vue.loader.run({
            controller: 'person',
            action: 'view',
        });
    });

});