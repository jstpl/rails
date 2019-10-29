define(['jrails/spa/router', 'jrails/spa/controllerFactory'], function(router, controllerFactory) {

    router.addRoute('/bskit', function () {
        var controllerClassName = 'module/bskit/controller/allController';
        controllerFactory.createByClassName(controllerClassName);
    });

    router.addRoute('/bskit/:id', function (id) {
        var controllerClassName = 'module/bskit/controller/oneController';
        controllerFactory.createByClassName(controllerClassName, {id: id});
    });

});