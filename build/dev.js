
var requirejs = require('requirejs');
var config = require('./config/devConfig');

requirejs.optimize( config, function(results) {
    console.log(results);
});
