define(['text!widget/footer/template/footer.html'], function(templateCode) {

    var data = {
        brand: '© JS Rails 2019',
        rightLinks: [
            {
                title: 'dist',
                url: 'http://dist.rails.js',
            },
            {
                title: 'src',
                url: 'http://src.rails.js',
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