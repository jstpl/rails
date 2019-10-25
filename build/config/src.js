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
    rails: [
        './node_modules/jrails/kernel/namespace.js',
        './node_modules/jrails/kernel/container.js',
        './node_modules/jrails/kernel/bootstrap.js',
        './node_modules/jrails/kernel/func.js',

        './node_modules/jrails/helper/*.js',
        //'./node_modules/jrails/env/*.js',
        './node_modules/jrails/event/*.js',
        //'./node_modules/jrails/log/*.js',
        //'./node_modules/jrails/queue/*.js',
        './node_modules/jrails/ui/*.js',
        './node_modules/jrails/notify/*.js',
        './node_modules/jrails/notify/driver/*.js',
        './node_modules/jrails/domain/*.js',
        //'./node_modules/jrails/cache/*.js',
        './node_modules/jrails/rest/*.js',
        './node_modules/jrails/legalbet/*.js',
        './node_modules/jrails/widget/*.js',
        './node_modules/jrails/spa/*.js',
        './node_modules/jrails/vue/*.js',
        './node_modules/jrails/bootstrap/**/*.js',
    ],
    app: [
        config.src.path + '/module/user/store/*.js',
        config.src.path + '/module/user/service/*.js',
        config.src.path + '/module/user/lang/ru/*.js',

        config.src.path + '/module/contact/store/*.js',
        config.src.path + '/module/contact/service/*.js',

        //config.src.path + '/module/notify/service/*.js',

        config.src.path + '/module/person/service/*.js',
        //config.src.path + '/module/person/controller/*.js',
        config.src.path + '/module/person/lang/*.js',

        config.src.path + '/module/**/config/*.js',
        config.src.path + '/module/app/controller/*.js',
        config.src.path + '/module/app/view/*.js',

        config.src.path + '/module/app/bootstrap.js',
        config.src.path + '/module/app/run.js',
    ],
};

src.all = src.vendor.concat(src.rails).concat(src.app);

module.exports = src;
