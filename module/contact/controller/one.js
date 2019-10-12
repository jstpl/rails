$(function () {

    namespace.define('bundle.module.contact.controller');

    bundle.module.contact.controller.one = {

        registerEventHandlers: function () {
            container.event.registerHandler('bundle.module.contact.store.contact.update', function (contactEntity) {
                $('#title').html(contactEntity.title);
                $('#content').html(contactEntity.content);
            });
        },

        /*load: function (request, callback) {
            var self = this;
            //var templateUrl
            //var className = 'bundle.module.'+request.namespace+'.script';
            //var className = window.bundle.spa.helper.getClassName(request, 'controller');
            $.ajax({
                url: '/' + request.path + '/' + request.controller + '/view/' + request.action + '.html',
                success: function (data) {

                    callback();

                    if (bundle.spa.helper.isTemplate(data)) {
                        bundle.spa.layer.add(data, request);
                    }
                }
            });
        },*/

        run: function (request) {
            var self = this;

            /*var templateFileName = '/' + request.path + '/' + request.controller + '/view/' + request.action + '.html';
            var cb1 = function () {

            };
            this.load(templateFileName, cb1);
            d(templateFileName);*/

            var className = 'bundle.module.contact.store.contact';
            var cb = function () {
                var contactEntity = self.forgeEntityFromId(request.query.id);
                self.setValue(contactEntity);
                self.dumpStateToConsole();
            };
            namespace.requireClass(className, cb);
            this.registerEventHandlers();
        },

        forgeEntityFromId: function (id) {
            var contactEntity = {};
            contactEntity.title = 'title ' + id;
            contactEntity.content = 'content ' + id;
            return contactEntity;
        },

        setValue: function (contactEntity) {
            bundle.module.contact.store.contact.update(contactEntity);
        },

        dumpStateToConsole: function () {
            var contactEntity = bundle.module.contact.store.contact.one();
            console.log('STATE:', contactEntity);
        },

    };

});