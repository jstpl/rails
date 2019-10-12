$(function () {

    namespace.define('bundle.module.vue.controller');

    bundle.module.vue.controller.createController = {

        data: {
            entity: {
                title: '',
                content: '',
            },
        },

        methods: {
            save: function (event) {
                var entity = _.clone(bundle.module.vue.controller.createController.data.entity);
                bundle.module.vue.store.contactStore.create(entity);
                bundle.module.vue.controller.createController.data.entity = {};
                location.hash = '#vue';
            }
        },

        depends: [
            'bundle.module.vue.store.contactStore',
        ],

        run: function (request) {

        },

        onLoadDepends: function (request) {

        },

    };

});