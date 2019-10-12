$(function () {

    namespace.define('bundle.module.vue.controller');

    bundle.module.vue.controller.allController = {

        //el: '#app-vue-all',
        data: {
            collection: [],
        },

        depends: [
            'bundle.module.vue.store.contactStore',
            //'bundle.module.vue.store.allStore',
        ],

        run: function (request) {
            this.data.collection = bundle.module.vue.store.contactStore.all();
            /*bundle.module.vue.store.contactStore.update({
                id: 1,
                title: 'qwerty',
            });*/
            /*bundle.module.vue.store.contactStore.create({
                title: 'qw333',
                content: 'qwerty33333333333333333333333'
            });*/
        },

        onLoadDepends: function (request) {

        },

    };

});
