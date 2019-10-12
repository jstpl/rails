$(function () {

    namespace.define('bundle.module.vue.controller');

    bundle.module.vue.controller.oneController = {

        depends: [
            'bundle.module.vue.store.contactStore',
        ],

        run: function (request) {

        },

        onLoadDepends: function (request) {
            var contactEntity = this.forgeEntityFromId(request.query.id);
            this.setValue(contactEntity);
            this.dumpStateToConsole();
        },

        forgeEntityFromId: function (id) {
            var contactEntity = {};
            contactEntity.id = id;
            contactEntity.title = 'title ' + id;
            contactEntity.content = 'content ' + id;
            contactEntity.deleteAction = '#vue/delete/' + id;
            contactEntity.updateAction = '#vue/update/' + id;
            return contactEntity;
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