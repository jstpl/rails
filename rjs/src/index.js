// For any third party dependencies, like jQuery, place them in the lib folder.

// Configure loading modules from the lib directory,
// except for 'app' ones, which are in a sibling
// directory.
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

// Start loading the main app file. Put all of
// your application logic in there.


requirejs(['app/run']);

console.log('index.js init');
