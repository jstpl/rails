$(function () {

    namespace.define('bundle.module.contact.controller');

    bundle.module.contact.controller.allController = {

        run: function (request) {
            var moduleElement = bundle.spa.layer.getModuleLayer(request);

            var template = moduleElement.html();
            template = bundle.helper.string.unescapeHtml(template);
            //d(template);
            //var template = '<span class="title"><%-title%></span>';
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
            var html = _.template(template)(value);
            moduleElement.html(html);
            //$('.menu').show();

        },

    };

});