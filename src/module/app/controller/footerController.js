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

    var helper = {
        template: function () {
            var html = '<p class="pull-right" v-if="rightLinks">\n' +
                '            <span v-for="link in rightLinks">\n' +
                '                <a v-bind:href="link.url">{{link.title}}</a> |\n' +
                '            </span>\n' +
                '        </p>\n' +
                '        <p>{{brand}}</p>';
            return html;
        }
    };

    bundle.module.app.controller.footerController = {
        el: '#app-footer',
        data: data,
        created: function () {
            $('#app-footer').html(helper.template());
        }
    };

});