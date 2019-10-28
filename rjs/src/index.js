
requirejs.config({
    baseUrl: 'src',
    urlArgs: "bust=" + (new Date()).getTime(), // отмена кэширования скриптов браузером
    paths: {
        app: '../src/app',
        jrails: '../../node_modules/jrails',
        DirectorRouter: '../../node_modules/director/build/director.min',
    },
    shim: {
        'DirectorRouter': {
            exports: 'Router'
        },
    }
});

requirejs(['app/run']);
