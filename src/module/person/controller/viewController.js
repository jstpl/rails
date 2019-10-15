$(function () {

    namespace.define('bundle.module.person.controller');

    var data = {
        entity: {},
    };

    bundle.module.person.controller.viewController = {

        data: data,
        depends: [
            'bundle.module.person.service.personService',
        ],
        access: function () {
            return {
                auth: '@',
            };
        },
        run: function () {
            bundle.module.person.service.personService.oneSelf().then(function (entity) {
                d(entity);
                data.entity = entity;
            });
        },
    };

});