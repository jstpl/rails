$(function () {

    namespace.define('bundle.module.vue.controller');

    bundle.module.vue.controller.allController = {

        el: '#app-vue-all',
        data: {
            collection: [],
        },

        depends: [
            'bundle.module.vue.store.contactStore',
            //'bundle.module.vue.store.allStore',
        ],

        run: function (request) {
            this.data.collection = bundle.module.vue.store.contactStore.all();
        },

        onLoadDepends: function (request) {
            var users = [
                { 'user': 'barney', 'age': 36, 'active': true },
                { 'user': 'fred',   'age': 40, 'active': false }
            ];
            d(_.filter(users, { 'age': 36, 'active': true }));
        },

    };

});
