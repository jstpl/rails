$(function () {

    namespace.define('bundle.module.vue.controller');

    bundle.module.vue.controller.deleteController = {

        data: {
            entity: {},
        },

        methods: {
            del: function (event) {
                bundle.module.vue.store.contactStore.deleteById(bundle.module.vue.controller.deleteController.data.entity.id);
                location.hash = '#vue';
            }
        },

        depends: [
            'bundle.module.vue.store.contactStore',
        ],

        run: function (request) {
            var entity = bundle.module.vue.store.contactStore.oneById(request.query.id);
            this.data.entity = _.clone(entity);
        },

        onLoadDepends: function (request) {

        },

    };

});