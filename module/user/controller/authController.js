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
                    bundle.spa.router.go();
                    console.log(identity);
                }).catch(function (err) {
                    console.log(err.message);
                });
            },
        },
        created: function () {

        },
    };

});