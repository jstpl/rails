
requirejs.config({
    baseUrl: 'src',
    urlArgs: "bust=" + (new Date()).getTime(), // отмена кэширования скриптов браузером
    paths: {
        module: '../module',
        app: '../module/app',
        jrails: '../../node_modules/jrails',
        DirectorRouter: '../../node_modules/director/build/director.min',
        lodash: '../../node_modules/lodash/lodash.min',
        jquery: '../../node_modules/jquery/dist/jquery.min',
        text: '../module/app/text',
        twitterBootstrap: '../../node_modules/bootstrap/dist/js/bootstrap.min',
        //redux: '../../node_modules/redux/dist/redux.min',
        vue: '../../node_modules/vue/dist/vue.min',
        toastr: '../../node_modules/toastr/build/toastr.min',
        jqueryUi: '../../node_modules/jquery-ui/jquery-ui.min',
    },
    shim: {
        'DirectorRouter': {
            exports: 'Router'
        },
        'lodash': {
            exports: '_'
        },
        'jquery': {
            exports: '$'
        },
        "jqueryUi": {
            exports: "$",
            deps: ['jquery']
        },
        "twitterBootstrap": {
            deps: ["jquery"]
        },
        'toastr': {
            exports: 'toastr'
        },
        'vue': {
            exports: 'Vue'
        },
    }
});

requirejs(['app/bootstrap'], function (bootstrap) {
    bootstrap.run();
});
