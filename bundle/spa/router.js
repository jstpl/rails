$(function () {

    var store = {
        routes: {},
        routerInstance: null,
    };

    window.bundle.spa.router = {

        addRoute: function (route, callback) {
            store.routes[route] = callback;
        },

        init: function () {
            store.routerInstance = Router(store.routes);
            store.routerInstance.init();
        },

    };

});