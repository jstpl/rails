space(function() {

    namespace.define('bundle.spa');

    var store = {
        routes: {},
        routerInstance: null,
    };

    window.bundle.spa.router = {

        go: function (uri) {
            uri = _.defaultTo(uri, '');
            location.hash = '#' + uri;
        },

        goBack: function () {
            history.back();
        },

        goHome: function () {
            this.go();
        },

        addRoute: function (route, callback) {
            store.routes[route] = callback;
        },

        init: function () {
            store.routerInstance = Router(store.routes);
            store.routerInstance.init();
        },

    };

});