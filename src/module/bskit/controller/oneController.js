define([
    'jrails/spa/query',
    'text!module/bskit/view/one.html',

    //

    'text!module/bskit/view/example/badge.html',
    'text!module/bskit/view/example/button.html',
    'text!module/bskit/view/example/container.html',
    'text!module/bskit/view/example/dialog.html',
    'text!module/bskit/view/example/dropdown.html',
    'text!module/bskit/view/example/form.html',
    'text!module/bskit/view/example/indicator.html',
    'text!module/bskit/view/example/label.html',
    'text!module/bskit/view/example/modal.html',
    'text!module/bskit/view/example/nav.html',
    'text!module/bskit/view/example/navbar.html',
    'text!module/bskit/view/example/notification.html',
    'text!module/bskit/view/example/progressbar.html',
    'text!module/bskit/view/example/table.html',
    'text!module/bskit/view/example/thumbnail.html',
    'text!module/bskit/view/example/typography.html',
], function(spaQuery) {

    var data = {};

    return {
        el: '#app-bskit-one',
        data: data,
        templateFile: 'module/bskit/view/one.html',
        onReady: function () {
            var self = this;
            var query = spaQuery.get();
            var templateFileName = 'text!module/bskit/view/example/'+query.id+'.html';
            $(this.el).html('...');
            require([templateFileName], function (templateHtml) {
                $(self.el).html(templateHtml);
            });
        }
    };

});
