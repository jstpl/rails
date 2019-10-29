define(['jrails/spa/router', 'jrails/spa/controllerFactory'], function(router, controllerFactory) {

    router.addRoute('/', function () {
        var controllerClassName = 'module/app/controller/mainController';
        controllerFactory.createByClassName(controllerClassName);
    });

});