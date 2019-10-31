define([
    'jrails/spa/router',
    'jrails/spa/controllerFactory',
    'module/person/controller/viewController',
    'module/person/controller/updateController',
], function(
    router,
    controllerFactory,
    viewController,
    updateController
) {

    router.addRoute('/person/view', function () {
        controllerFactory.createByClass(viewController);
    });

    router.addRoute('/person/update', function () {
        controllerFactory.createByClass(updateController);
    });

});
