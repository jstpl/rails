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

        run: function () {
            var request = bundle.vue.loader.request;
            var entity = bundle.module.todo.store.contactStore.oneById(request.query.id);
            bundle.module.todo.controller.oneController.data.entity = _.clone(entity);
        },

    };

});