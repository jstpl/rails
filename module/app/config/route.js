$(function () {

    namespace.define('bundle.app.config');

    bundle.app.config.route = {

        '/': function () {
            bundle.spa.module.run({
                controller: 'main',
            });
        },

        '/about': function () {
            bundle.spa.module.run({
                controller: 'about',
            });
        },

        '/contact': function () {
            bundle.spa.module.run({
                controller: 'contact',
                action: 'all',
            });
        },

        '/contact/view/:id': function (id) {
            bundle.spa.module.run({
                controller: 'contact',
                action: 'one',
                query: {
                    id: id,
                },
            });
        },

        '/contact/update/:id': function (id) {
            bundle.spa.module.run({
                controller: 'contact',
                action: 'update',
                query: {
                    id: id,
                },
            });
        },

        '/contact/delete/:id': function (id) {
            bundle.spa.module.run({
                controller: 'contact',
                action: 'delete',
                query: {
                    id: id,
                },
            });
        },

    };

});