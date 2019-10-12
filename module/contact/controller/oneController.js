$(function () {

    namespace.define('bundle.module.contact.controller');

    bundle.module.contact.controller.oneController = {

        //moduleElement: null,

        registerEventHandlers: function (request) {
            var moduleElement = bundle.spa.layer.getModuleLayer(request);
            var elements = moduleElement.find($("*"));
            bundle.helper.dom.bindEventForList(elements, 'bundle.module.contact.store.contactStore.update');
            /*container.event.registerHandler('bundle.module.contact.store.contactStore.update', function (contactEntity) {
                moduleElement.find('#title').html(contactEntity.title);
                moduleElement.find('#content').html(contactEntity.content);
                moduleElement.find('#delete-action').attr('href', contactEntity.deleteAction);
                moduleElement.find('#update-action').attr('href', contactEntity.updateAction);
            });*/
        },

        run: function (request) {
            var self = this;
            var cb = function () {
                self.onLoad(request);
            };
            var className = 'bundle.module.contact.store.contactStore';
            namespace.requireClass(className, cb);
            this.registerEventHandlers(request);
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