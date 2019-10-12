$(function () {

    namespace.define('bundle.module.todo.controller');

    bundle.module.todo.controller.createController = {

        data: {
            entity: {
                title: '',
                content: '',
            },
        },

        methods: {
            save: function (event) {
                var entity = _.clone(bundle.module.todo.controller.createController.data.entity);
                bundle.module.todo.store.contactStore.create(entity);
                bundle.module.todo.controller.createController.data.entity = {};
                location.hash = '#todo';
            }
        },

        depends: [
            'bundle.module.todo.store.contactStore',
        ],

        run: function (request) {

        },

        onLoadDepends: function (request) {

        },

    };

});