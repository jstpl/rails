define(['module/app/view/footerTemplate'], function(footerTemplate) {

    var data = {
        brand: '© JS Rails 2019',
        rightLinks: [
            {
                title: 'dist',
                url: '/dist',
            },
            {
                title: 'src',
                url: '/src',
            },
        ],
    };

    return {
        el: '#app-footer',
        data: data,
        created: function () {
            $('#app-footer').html(footerTemplate.template());
        }
    };

});