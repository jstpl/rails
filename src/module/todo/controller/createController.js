$(function () {

    namespace.define('bundle.module.todo.controller');

    var data = {
        entity: {
            title: '',
            content: '',
        },
    };

    bundle.module.todo.controller.createController = {

        data: data,
        methods: {
            save: function (event) {
                var entity = _.clone(bundle.module.todo.controller.createController.data.entity);
                bundle.module.todo.store.contactStore.create(entity);
                bundle.module.todo.controller.createController.data.entity = {};
                bundle.spa.router.go('todo');
            }
        },

        depends: [
            'bundle.module.todo.store.contactStore',
        ],

    };

});