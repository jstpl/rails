define([
    'jrails/spa/router',
    'jrails/spa/controllerFactory',
    'module/user/controller/authController',
    'module/user/controller/logoutController'
], function(
    router,
    controllerFactory,
    authController,
    logoutController
) {

    router.addRoute('/user/auth', function () {
        controllerFactory.createByClass(authController);
    });

    router.addRoute('/user/logout', function () {
        controllerFactory.createByClass(logoutController);
    });

});