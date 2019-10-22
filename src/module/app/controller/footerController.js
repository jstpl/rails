space('bundle.module.app.controller.footerController', function() {

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

    return {
        el: '#app-footer',
        data: data,
        created: function () {
            $('#app-footer').html(bundle.module.app.view.footerTemplate.template());
        }
    };

});