define(['jrails/spa/query', 'jrails/spa/controllerFactory'], function(spaQuery, controllerFactory) {

    var data = {};

    return {
        el: '#app-bskit-one',
        data: data,
        templateFile: 'module/bskit/view/one.html',
        onReady: function () {
            var self = this;
            var query = spaQuery.get();
            var templateFileName = 'text!module/bskit/view/'+query.id+'.html';
            $(this.el).html('...');
            require([templateFileName], function (templateHtml) {
                $(self.el).html(templateHtml);
            });
        },
    };

});
