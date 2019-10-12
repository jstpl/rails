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

        created: function () {
            var request = bundle.vue.loader.request;
            this.entity = bundle.module.todo.store.contactStore.oneById(request.query.id);
        },

    };

});