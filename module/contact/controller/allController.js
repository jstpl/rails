$(function () {

    namespace.define('bundle.module.contact.controller');

    bundle.module.contact.controller.allController = {

        run: function (request) {

        },

        onLoadDepends: function (request) {
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