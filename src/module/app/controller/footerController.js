$(function () {

    namespace.define('bundle.module.app.controller');

    var data = {
        brand: '© JS Rails 2019',
        rightLinks: [
            {
                title: 'min',
                url: '/min.html',
            },
            {
                title: 'dist',
                url: '/dist.html',
            },
            {
                title: 'dev',
                url: '/.',
            },
        ],
    };

    bundle.module.app.controller.footerController = {
        el: '#app-footer',
        data: data,
        created: function () {
            $('#app-footer').html(bundle.module.app.view.footerTemplate.template());
        }
    };

});