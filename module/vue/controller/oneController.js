$(function () {

    namespace.define('bundle.module.vue.controller');

    bundle.module.vue.controller.oneController = {

        el: '#app-vue-one',
        model: {
            entity: {},
        },

        depends: [
            'bundle.module.vue.store.contactStore',
        ],

        run: function (request) {
            //d('---run');
            this.model.entity = bundle.module.vue.store.contactStore.oneById(request.query.id);
        },

        onLoadDepends: function (request) {
            //d('---onLoadDepends');
            /*bundle.spa.module.registerEventHandlers(request);
            var contactEntity = this.forgeEntityFromId(request.query.id);
            this.setValue(contactEntity);
            this.dumpStateToConsole();*/

            bundle.spa.helper.getVueInstance(this.el, {
                el: '#app-vue-one',
                data: this.model,
            })
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