$(function () {

    bundle.spa.router.addRoute('/', function () {
        bundle.spa.module.run({
            controller: 'main',
        });
    });

    bundle.spa.router.addRoute('/about', function () {
        bundle.spa.module.run({
            controller: 'about',
        });
    });

});