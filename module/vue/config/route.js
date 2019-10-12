$(function () {

    bundle.spa.router.addRoute('/vue', function () {
        bundle.spa.module.run({
            controller: 'vue',
            action: 'all',
        });
    });

});