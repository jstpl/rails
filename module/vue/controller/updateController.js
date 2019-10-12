$(function () {

    namespace.define('bundle.module.vue.controller');

    bundle.module.vue.controller.updateController = {

        data: {
            entity: {},
        },

        methods: {
            save: function (event) {
                bundle.module.vue.store.contactStore.update(bundle.module.vue.controller.updateController.data.entity);
                location.hash = '#vue/view/' + bundle.module.vue.controller.updateController.data.entity.id;
            }
        },

        depends: [
            'bundle.module.vue.store.contactStore',
        ],

        run: function (request) {
            /*container.event.registerHandler('bundle.module.vue.store.contactStore.update', function (data) {
                d(data);
            });*/
            var entity = bundle.module.vue.store.contactStore.oneById(request.query.id);
            this.data.entity = _.clone(entity);
            //bundle.module.vue.store.contactStore.deleteById(1);
            //d(bundle.module.vue.store.contactStore.all());
        },

        onLoadDepends: function (request) {

        },

    };

});