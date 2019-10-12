$(function () {

    namespace.define('bundle.module.vue.controller');

    bundle.module.vue.controller.oneController = {

        //el: '#app-vue-one',
        data: {
            entity: {},
        },

        depends: [
            'bundle.module.vue.store.contactStore',
        ],

        run: function (request) {
            /*container.event.registerHandler('bundle.module.vue.store.contactStore.update', function (data) {
                d(data);
            });*/
            this.data.entity = bundle.module.vue.store.contactStore.oneById(request.query.id);
            //bundle.module.vue.store.contactStore.deleteById(1);
            //d(bundle.module.vue.store.contactStore.all());
        },

        onLoadDepends: function (request) {

        },

    };

});