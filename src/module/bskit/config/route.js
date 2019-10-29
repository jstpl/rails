define(['jrails/spa/router', 'jrails/vue/loader', 'jrails/spa/controllerFactory'], function(router, vueLoader, controllerFactory) {

    router.addRoute('/bskit', function () {

        var controllerClassName = 'module/bskit/controller/allController';
        controllerFactory.createByClassName(controllerClassName);

        /*vueLoader.run({
            controllerInstance: allController,
            controller: 'bskit',
            action: 'all',
        });*/
    });

    router.addRoute('/bskit/:id', function (id) {

        var controllerClassName = 'module/bskit/controller/oneController';
        controllerFactory.createByClassName(controllerClassName, {id: id});

        /*vueLoader.run({
            controller: 'bskit',
            action: id,
            query: {
                id: id,
            },
        });*/
    });

});