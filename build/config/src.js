var config = require('./config');

var src = {
    style: [
        './node_modules/bootstrap/dist/css/bootstrap.css',
        './node_modules/bootstrap/dist/css/bootstrap-theme.css',
        './node_modules/toastr/build/toastr.min.css',
    ],
    vendor: [
        './node_modules/jquery/dist/jquery.min.js',
        './node_modules/lodash/lodash.min.js',
        './node_modules/bootstrap/dist/js/bootstrap.min.js',
        './node_modules/director/build/director.min.js',
        './node_modules/redux/dist/redux.min.js',
        './node_modules/vue/dist/vue.min.js',
        './node_modules/toastr/build/toastr.min.js',
        './node_modules/jquery-ui/jquery-ui.min.js',
    ],
    bundle: [
        config.src.path + '/bundle/kernel/namespace.js',
        config.src.path + '/bundle/kernel/container.js',
        config.src.path + '/bundle/kernel/bootstrap.js',
        config.src.path + '/bundle/kernel/func.js',

        config.src.path + '/bundle/helper/*.js',
        config.src.path + '/bundle/env/*.js',
        config.src.path + '/bundle/event/*.js',
        config.src.path + '/bundle/log/*.js',
        config.src.path + '/bundle/queue/*.js',
        config.src.path + '/bundle/ui/*.js',
        config.src.path + '/bundle/notify/*.js',
        config.src.path + '/bundle/notify/driver/*.js',
        config.src.path + '/bundle/domain/*.js',
        config.src.path + '/bundle/cache/*.js',
        config.src.path + '/bundle/rest/*.js',
        config.src.path + '/bundle/legalbet/*.js',
        config.src.path + '/bundle/widget/*.js',
        config.src.path + '/bundle/spa/*.js',
        config.src.path + '/bundle/vue/*.js',
        config.src.path + '/bundle/bootstrap/**/*.js',
    ],
    app: [
        config.src.path + '/module/user/store/*.js',
        config.src.path + '/module/user/service/*.js',
        config.src.path + '/module/user/lang/ru/*.js',

        config.src.path + '/module/contact/store/*.js',
        config.src.path + '/module/contact/service/*.js',

        //config.src.path + '/module/notify/service/*.js',

        config.src.path + '/module/person/service/*.js',
        config.src.path + '/module/person/controller/*.js',
        config.src.path + '/module/person/lang/*.js',

        config.src.path + '/module/**/config/*.js',
        config.src.path + '/module/app/controller/*.js',
        config.src.path + '/module/app/view/*.js',

        config.src.path + '/module/app/bootstrap.js',
        config.src.path + '/module/app/run.js',
    ],
};

src.all = src.vendor.concat(src.bundle).concat(src.app);

module.exports = src;
