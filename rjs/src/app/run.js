define(function (require) {
    // Load any app-specific modules
    // with a relative require call,
    // like:
    //var messages = require('./messages');

    var bootstrap = require('./bootstrap');

    bootstrap.run();

   // console.log('bootstrap', bootstrap);

    // Load library/vendor modules using
    // full IDs, like:
    /*var print = require('print');

    print(messages.getHello());*/


});

console.log('run.js init');
