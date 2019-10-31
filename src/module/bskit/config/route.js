define([
    'jrails/spa/router',
    'jrails/spa/controllerFactory',
    'module/bskit/controller/allController',
    'module/bskit/controller/oneController',
], function(
    router,
    controllerFactory,
    allController,
    oneController
) {

    router.addRoute('/bskit', function () {
        controllerFactory.createByClass(allController);
    });

    router.addRoute('/bskit/:id', function (id) {
        controllerFactory.createByClass(oneController, {id: id});
    });

});