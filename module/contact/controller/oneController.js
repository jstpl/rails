$(function () {

    namespace.define('bundle.module.contact.controller');

    bundle.module.contact.controller.oneController = {

        depends: [
            'bundle.module.contact.store.contactStore'
        ],

        run: function (request) {
            var self = this;
            var cb = function () {
                self.onLoad(request);
            };
            for(var k in this.depends) {
                var dependClass = this.depends[k];
                namespace.requireClass(dependClass, cb);
            }
        },

        onLoad: function (request) {
            var contactEntity = this.forgeEntityFromId(request.query.id);
            this.setValue(contactEntity);
            this.dumpStateToConsole();
        },

        forgeEntityFromId: function (id) {
            var contactEntity = {};
            contactEntity.id = id;
            contactEntity.title = 'title ' + id;
            contactEntity.content = 'content ' + id;
            contactEntity.deleteAction = '#contact/delete/' + id;
            contactEntity.updateAction = '#contact/update/' + id;
            return contactEntity;
        },

        setValue: function (contactEntity) {
            bundle.module.contact.store.contactStore.update(contactEntity);
        },

        dumpStateToConsole: function () {
            var contactEntity = bundle.module.contact.store.contactStore.one();
            console.log('STATE:', contactEntity);
        },

    };

});