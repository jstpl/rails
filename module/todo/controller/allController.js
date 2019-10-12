$(function () {

    namespace.define('bundle.module.todo.controller');

    bundle.module.todo.controller.allController = {

        //el: '#app-vue-all',
        data: {
            collection: [],
        },

        depends: [
            'bundle.module.todo.store.contactStore',
            //'bundle.module.todo.store.allStore',
        ],

        run: function (request) {
            this.data.collection = bundle.module.todo.store.contactStore.all();
            /*bundle.module.todo.store.contactStore.update({
                id: 1,
                title: 'qwerty',
            });*/
            /*bundle.module.todo.store.contactStore.create({
                title: 'qw333',
                content: 'qwerty33333333333333333333333'
            });*/
        },

        onLoadDepends: function (request) {

        },

    };

});
