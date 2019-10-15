$(function () {

    bundle.spa.router.addRoute('/contact', function () {
        bundle.spa.module.run({
            controller: 'contact',
            action: 'all',
        });
    });

    bundle.spa.router.addRoute('/contact/view/:id', function (id) {
        bundle.spa.module.run({
            controller: 'contact',
            action: 'one',
            query: {
                id: id,
            },
        });
    });

    bundle.spa.router.addRoute('/contact/update/:id', function (id) {
        bundle.spa.module.run({
            controller: 'contact',
            action: 'update',
            query: {
                id: id,
            },
        });
    });

    bundle.spa.router.addRoute('/contact/delete/:id', function (id) {
        bundle.spa.module.run({
            controller: 'contact',
            action: 'delete',
            query: {
                id: id,
            },
        });
    });

});