$(function () {

    namespace.define('bundle.module.todo.controller');

    bundle.module.todo.controller.deleteController = {

        data: {
            entity: {},
        },

        methods: {
            del: function (event) {
                bundle.module.todo.store.contactStore.deleteById(bundle.module.todo.controller.deleteController.data.entity.id);
                location.hash = '#todo';
            }
        },

        depends: [
            'bundle.module.todo.store.contactStore',
        ],

        created: function () {
            var request = bundle.vue.loader.request;
            var entity = bundle.module.todo.store.contactStore.oneById(request.query.id);
            this.entity = _.clone(entity);
        },

    };

});