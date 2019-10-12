$(function () {

    namespace.define('bundle.module.contact.controller');

    bundle.module.contact.controller.oneController = {

        //moduleElement: null,

        registerEventHandlers: function (request) {
            container.event.registerHandler('bundle.module.contact.store.contactStore.update', function (contactEntity) {
                var moduleElement = bundle.spa.layer.getModuleLayer(request);
                moduleElement.find('#title').html(contactEntity.title);
                moduleElement.find('#content').html(contactEntity.content);
                moduleElement.find('#delete-action').attr('href', contactEntity.deleteAction);
                moduleElement.find('#update-action').attr('href', contactEntity.updateAction);
            });
        },

        run: function (request) {
            var self = this;
            var className = 'bundle.module.contact.store.contactStore';
            var cb = function () {
                var contactEntity = self.forgeEntityFromId(request.query.id);
                self.setValue(contactEntity);
                self.dumpStateToConsole();
            };
            namespace.requireClass(className, cb);
            this.registerEventHandlers(request);
        },

        forgeEntityFromId: function (id) {
            var contactEntity = {};
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