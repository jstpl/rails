$(function () {

    bundle.spa.router.addRoute('/', function () {
        bundle.spa.module.run({
            controller: 'main',
        });
    });

});