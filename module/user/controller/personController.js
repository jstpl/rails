$(function () {

    namespace.define('bundle.module.user.controller');

    var data = {
        entity: {},
    };

    bundle.module.user.controller.personController = {

        data: data,
        depends: [
            'bundle.module.user.service.personService',
        ],
        access: function () {
            return {
                auth: '@',
            };
        },
        run: function () {
            //var identity = bundle.module.user.store.identityStore.get();
            bundle.module.user.service.personService.oneSelf().then(function (entity) {
                d(entity);
                data.entity = entity;
            });

            //data.entity = identity;
        },
    };

});