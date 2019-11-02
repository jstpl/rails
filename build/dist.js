
var requirejs = require('requirejs');
var config = require('./distConfig');

requirejs.optimize( config, function(results) {
    console.log(results);
});
