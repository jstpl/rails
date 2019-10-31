define(['text!module/app/view/footer.html'], function(templateCode) {

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
        //templateFile: 'module/app/view/footer.html',
        created: function () {
            $('#app-footer').html(templateCode);
        }
    };

});