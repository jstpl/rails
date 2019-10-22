space(function() {

    namespace.define('bundle.module.app.view');

    window.bundle.module.app.view.footerTemplate = {
        template: function () {
            return '<p class="pull-right" v-if="rightLinks">\n' +
                '            <span v-for="link in rightLinks">\n' +
                '                <a v-bind:href="link.url">{{link.title}}</a> |\n' +
                '            </span>\n' +
                '        </p>\n' +
                '        <p>{{brand}}</p>';
        }
    };
});