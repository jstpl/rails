define(['jrails/spa/template', 'jrails/spa/layer'], function(spaTemplate, spaLayer) {

    return {

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
            var moduleElement = spaLayer.getModuleLayer(request);
            spaTemplate.compileElement(moduleElement, value);
        },

    };

});