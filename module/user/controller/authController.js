$(function () {

    namespace.define('bundle.module.user.controller');

    bundle.module.user.controller.authController = {

        data: {
            entity: {},
        },

        depends: [
            'bundle.module.user.store.authStore',
        ],
        methods: {
            auth: function (event) {
                var promise = bundle.module.user.store.authStore.auth(bundle.module.user.controller.authController.data.entity);
                promise.then(function (identity) {
                    location.hash = '#';
                    console.log(identity);
                }).catch(function (err) {
                    console.log(err.message);
                });
            },
            onSubmit: function (event) {
                var promise = bundle.module.user.store.authStore.auth(bundle.module.user.controller.authController.data.entity);
                promise.then(function (identity) {
                    location.hash = '#';
                    console.log(identity);
                }).catch(function (err) {
                    console.log(err.message);
                });
            }
        },

        run: function (request) {

        },

        onLoadDepends: function (request) {

        },

    };

});