$(function () {

    namespace.define('bundle.module.kit.controller');

    var data = {
        collection: [
            {
                title: 'button',
                id: 'button',
            },
            {
                title: 'modal',
                id: 'modal',
            },
            {
                title: 'notification',
                id: 'notification',
            },
        ],
    };

    bundle.module.kit.controller.allController = {

        data: data,
        created: function (request) {
            //data.collection = bundle.module.todo.store.contactStore.all();
        },

    };

});
