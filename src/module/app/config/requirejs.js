({
    name: "app/index",
    out: "../../../../dist/main-built.js",
    baseUrl: "../..",
    paths: {
        module: '../module',
        app: '../module/app',
        jrails: '../../node_modules/jrails/src',
        DirectorRouter: '../../node_modules/director/build/director.min',
        lodash: '../../node_modules/lodash/lodash.min',
        jquery: '../../node_modules/jquery/dist/jquery.min',
        text: '../module/app/text',
        twitterBootstrap: '../../node_modules/bootstrap/dist/js/bootstrap.min',
        //redux: '../../node_modules/redux/dist/redux.min',
        vue: '../../node_modules/vue/dist/vue.min',
        //toastr: '../../node_modules/toastr/build/toastr.min',
        toastr: '../module/app/toastr',
        jqueryUi: '../../node_modules/jquery-ui/jquery-ui.min',
        templates: '../module/app/view',
    },
    include: [
        "text!module/app/view/main.html",
        "module/app/controller/mainController",
    ],
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
            exports: 'toastr',
            deps: ["jquery"]
        },
        'vue': {
            exports: 'Vue'
        },
    }
})