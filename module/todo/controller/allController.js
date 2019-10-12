$(function () {

    namespace.define('bundle.module.todo.controller');

    var data = {
        collection: {},
    };

    bundle.module.todo.controller.allController = {

        data: data,
        depends: [
            'bundle.module.todo.store.contactStore',
        ],

        created: function (request) {
            data.collection = bundle.module.todo.store.contactStore.all();
        },

    };

});
