module.exports = {
    baseUrl: ".",
    name: "src/app/index",
    out: "dist/assets/built.js",
    //writeBuildTxt: true,
    paths: {
        module: 'src/module',
        widget: 'src/widget',
        app: 'src/app',
        jrails: 'node_modules/jrails/src',
        DirectorRouter: 'node_modules/director/build/director.min',
        lodash: 'node_modules/lodash/lodash.min',
        jquery: 'node_modules/jquery/dist/jquery.min',
        text: 'node_modules/text/text',
        twitterBootstrap: 'node_modules/bootstrap/dist/js/bootstrap.min',
        //redux: 'node_modules/redux/dist/redux.min',
        vue: 'node_modules/vue/dist/vue.min',
        //toastr: 'node_modules/toastr/build/toastr.min',
        toastr: 'src/app/toastr',
        jqueryUi: 'node_modules/jquery-ui/jquery-ui.min',
    },
    include: [
        'node_modules/requirejs/require',
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
};
