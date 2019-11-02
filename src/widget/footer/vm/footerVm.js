define(['text!widget/footer/template/footer.html'], function(templateCode) {

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
        //templateFile: 'app/template/footer.html',
        created: function () {
            $('#app-footer').html(templateCode);
        }
    };

});