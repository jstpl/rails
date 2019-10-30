define(['jrails/spa/router', 'jrails/spa/controllerFactory'], function(router, controllerFactory) {


    router.addRoute('/person/view', function () {
        var controllerClassName = 'module/person/controller/viewController';
        controllerFactory.createByClassName(controllerClassName);
    });

    router.addRoute('/person/update', function () {
        var controllerClassName = 'module/person/controller/updateController';
        controllerFactory.createByClassName(controllerClassName);
    });

});
