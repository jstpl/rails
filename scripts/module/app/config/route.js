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
            });
        },

        '/contact/view/:id': function (id) {
            bundle.spa.module.run({
                controller: 'contact',
                action: 'view',
                query: {
                    id: id,
                },
            });
        },

    };

});