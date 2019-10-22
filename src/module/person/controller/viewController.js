space('bundle.module.person.controller.viewController', function() {

    namespace.define('bundle.module.person.controller');

    var data = {
        entity: {},
    };

    return {

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