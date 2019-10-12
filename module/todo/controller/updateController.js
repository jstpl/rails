$(function () {

    namespace.define('bundle.module.todo.controller');

    bundle.module.todo.controller.updateController = {

        data: {
            entity: {},
        },

        methods: {
            save: function (event) {
                bundle.module.todo.store.contactStore.update(bundle.module.todo.controller.updateController.data.entity);
                location.hash = '#todo/view/' + bundle.module.todo.controller.updateController.data.entity.id;
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