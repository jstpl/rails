$(function () {

    namespace.define('bundle.module.person.controller');

    var data = {
        entity: {},
    };

    bundle.module.person.controller.updateController = {

        data: data,
        depends: [
            'bundle.module.person.service.personService',
            '/module/person/lang/ru/info.js',
        ],
        methods: {
            save: function (event) {
                bundle.module.person.service.personService.update(data.entity);
                container.event.trigger('person.info.update', data.entity);
                bundle.spa.router.go('person/view');
            }
        },
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
        created: function () {
            container.event.registerHandler('user.person.info.update', function (entity) {
                container.notify.success(lang.person.info.infoUpdatedMessage);
            })
        },
    };

});