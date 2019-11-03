cd ../..
::node "./node_modules/requirejs/bin/r.js" -o "node_modules/jrails/requirejs/requirejs-deps.js"
node build/dev.js
gulp build-dev-style
pause