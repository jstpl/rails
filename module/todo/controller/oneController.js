$(function () {

    namespace.define('bundle.module.todo.controller');

    bundle.module.todo.controller.oneController = {

        //el: '#app-vue-one',
        data: {
            entity: {},
        },

        depends: [
            'bundle.module.todo.store.contactStore',
        ],

        run: function (request) {
            /*container.event.registerHandler('bundle.module.todo.store.contactStore.update', function (data) {
                d(data);
            });*/
            this.data.entity = bundle.module.todo.store.contactStore.oneById(request.query.id);
            //bundle.module.todo.store.contactStore.deleteById(1);
            //d(bundle.module.todo.store.contactStore.all());
        },

        onLoadDepends: function (request) {

        },

    };

});