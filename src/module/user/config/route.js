define(['jrails/spa/router', 'jrails/spa/controllerFactory'], function(router, controllerFactory) {

    router.addRoute('/user/auth', function () {
        var controllerClassName = 'module/user/controller/authController';
        controllerFactory.createByClassName(controllerClassName);
    });

    router.addRoute('/user/logout', function () {
        var controllerClassName = 'module/user/controller/logoutController';
        controllerFactory.createByClassName(controllerClassName);
    });

});