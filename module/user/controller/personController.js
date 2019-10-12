$(function () {

    namespace.define('bundle.module.user.controller');

    var data = {
        entity: {},
    };

    bundle.module.user.controller.personController = {

        data: data,
        depends: [
            'bundle.module.user.store.authStore',
        ],
        access: function () {
            return {
                auth: '@',
            };
        },
        run: function () {
            data.entity = bundle.module.user.store.authStore.identity;
        },
    };

});