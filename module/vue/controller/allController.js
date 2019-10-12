$(function () {

    namespace.define('bundle.module.vue.controller');

    bundle.module.vue.controller.allController = {

        depends: [
            'bundle.module.vue.store.contactStore',
        ],

        run: function (request) {

        },

        onLoadDepends: function (request) {
            var vm = new Vue({
                el: '#app-vue-all',
                data: {
                    collection: bundle.module.vue.store.contactStore.all(),
                }
            });
        },

    };

});