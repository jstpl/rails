
var requirejs = require('requirejs');
var config = require('./build/distConfig');

requirejs.optimize( config, function(results) {
    console.log(results);
});
