$(function () {

    namespace.define('bundle.module.todo.controller');

    bundle.module.todo.controller.updateController = {

        data: {
            entity: {},
        },

        methods: {
            save: function (event) {
                bundle.module.todo.store.contactStore.update(bundle.module.todo.controller.updateController.data.entity);
                var uri = 'todo/view/' + bundle.module.todo.controller.updateController.data.entity.id;
                bundle.spa.router.go(uri);
            }
        },

        depends: [
            'bundle.module.todo.store.contactStore',
        ],

        run: function () {
            var request = bundle.vue.loader.request;

            var entity = bundle.module.todo.store.contactStore.oneById(request.query.id);
            //d(entity);
            bundle.module.todo.controller.updateController.data.entity = _.clone(entity);
        },

    };

});