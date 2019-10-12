$(function () {

    namespace.define('bundle.module.user.controller');

    bundle.module.user.controller.logoutController = {

        data: {},
        depends: [
            //'bundle.module.user.store.authStore',
        ],
        methods: {
            out: function (event) {

            },
        },
        run: function () {
            bundle.module.user.store.authStore.logout();
            bundle.spa.router.goHome();
        },
        access: function () {
            return {
                auth: '@',
            };
        },
    };

});