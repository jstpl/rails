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

        run: function (request) {
            /*container.event.registerHandler('bundle.module.todo.store.contactStore.update', function (data) {
                d(data);
            });*/
            var entity = bundle.module.todo.store.contactStore.oneById(request.query.id);
            this.data.entity = _.clone(entity);
            //bundle.module.todo.store.contactStore.deleteById(1);
            //d(bundle.module.todo.store.contactStore.all());
        },

        onLoadDepends: function (request) {

        },

    };

});