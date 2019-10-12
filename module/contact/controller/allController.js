$(function () {

    namespace.define('bundle.module.contact.controller');

    bundle.module.contact.controller.allController = {

        run: function (request) {
            var self = this;
            var cb = function () {
                self.onLoad(request);
            };
            /*for(var k in this.depends) {
                var dependClass = this.depends[k];
                namespace.requireClass(dependClass, cb);
            }*/
            cb();
        },

        onLoad: function (request) {
            var value = {
                collection: [
                    {
                        id: 123,
                        title: 'item 123',
                        content: '',
                    },
                    {
                        id: 456,
                        title: 'item 456',
                        content: '',
                    },
                ],
            };
            var moduleElement = bundle.spa.layer.getModuleLayer(request);
            bundle.spa.template.compileElement(moduleElement, value);
        },

    };

});