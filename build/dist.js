
var requirejs = require('requirejs');
var config = require('./config/distConfig');

requirejs.optimize( config, function(results) {
    console.log(results);
});
