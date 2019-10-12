$(function () {

    namespace.define('bundle.module.vue.controller');

    bundle.module.vue.controller.oneController = {

        depends: [
            'bundle.module.vue.store.contactStore',
        ],

        run: function (request) {

        },

        onLoadDepends: function (request) {

            /*bundle.spa.module.registerEventHandlers(request);*/
            var contactEntity = this.forgeEntityFromId(request.query.id);
            this.setValue(contactEntity);
            this.dumpStateToConsole();

            new Vue({
                el: '#app-vue-one',
                data: {
                    entity: contactEntity,
                }
            });

        },

        forgeEntityFromId: function (id) {
            return bundle.module.vue.store.contactStore.oneById(id);
        },

        setValue: function (contactEntity) {
            bundle.module.vue.store.contactStore.update(contactEntity);
        },

        dumpStateToConsole: function () {
            var contactEntity = bundle.module.vue.store.contactStore.one();
            console.log('STATE:', contactEntity);
        },

    };

});