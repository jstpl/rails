$(function () {

    namespace.define('bundle.module.vue.controller');

    bundle.module.vue.controller.allController = {

        run: function (request) {

        },

        onLoadDepends: function (request) {
            //bundle.spa.module.registerEventHandlers(request);

            new Vue({
                el: '#example-3',
                data: {
                    checkedNames: [],
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
                }
            });

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