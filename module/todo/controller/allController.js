$(function () {

    namespace.define('bundle.module.todo.controller');

    bundle.module.todo.controller.allController = {

        data: {
            collection: [],
        },

        depends: [
            'bundle.module.todo.store.contactStore',
        ],

        created: function (request) {
            this.collection = bundle.module.todo.store.contactStore.all();
        },

    };

});
