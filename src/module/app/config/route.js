define([
    'jrails/spa/router',
    'jrails/spa/controllerFactory',
    'module/app/controller/mainController',
], function(
    router,
    controllerFactory,
    mainController
) {

    router.addRoute('/', function () {
        controllerFactory.createByClass(mainController);
    });

});