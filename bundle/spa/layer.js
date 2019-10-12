$(function () {

    namespace.define('bundle.spa');

    /**
     *
     */
    window.bundle.spa.layer = {

        getModuleLayer: function (request) {
            return $('#app-' + request.controller + '-' + request.action);
        },

        has: function (request) {
            var layerWrapper = this.getModuleLayer(request);
            return layerWrapper.length;
        },

        show: function (request) {
            bundle.spa.layer.hideAll();
            var layerWrapper = this.getModuleLayer(request);
            layerWrapper.show();
        },

        add: function (data, request) {
            var layerHtml =
                '<div class="page-layer" id="app-' + request.controller + '-' + request.action + '">' +
                data +
                '</div>';
            $('#app').append(layerHtml);
        },

        hideAll: function () {
            $('#app div.page-layer').hide();
        },

    };

    window.bundle.spa.helper = {

        getClassName: function (request, type) {
            var className = 'bundle.module.' + request.controller + '.'+type+'.' + request.action;
            return className;
        },

        isTemplate: function (data) {
            return data.search(/<!DOCTYPE html>/g) === -1;
        },

        prepareRequest: function (request) {
            request.action = _.defaultTo(request.action, 'index');
            request.path = _.defaultTo(request.path, 'module');
            request.namespace = request.controller + '.' + request.action;
        },
    };

    /**
     *
     */
    window.bundle.spa.module = {

        loadTemplate: function (request, callback) {
            $.ajax({
                url: '/' + request.path + '/' + request.controller + '/view/' + request.action + '.html',
                success: function (data) {

                    callback();
                    if (window.bundle.spa.helper.isTemplate(data)) {
                        bundle.spa.layer.add(data, request);
                    }
                }
            });
        },

        run: function (requestSource) {
            var request = _.clone(requestSource);
            bundle.spa.helper.prepareRequest(request);
            var callback = function () {
                var className = window.bundle.spa.helper.getClassName(request, 'controller');

                bundle.spa.layer.show(request);
                var cb = function () {
                    var controller = namespace.get(className);
                    if( ! _.isEmpty(controller)) {
                        controller.run(request);
                    }
                };
                namespace.requireClass(className, cb);

            };
            this.doRequest(request, callback);
        },

        doRequest: function (request, callback) {

            //callback();

            var isExists = bundle.spa.layer.has(request);
            if (isExists) {
                callback();
            } else {

                this.loadTemplate(request, callback);
            }
        },

    };

});

/*$("a").each(function(index, element) {
            $(element).click(function (event) {
                var el = $(event.target);
                var uri = el.attr('href');
                uri = _.trim(uri, '#/');
                uri = '/#' + uri;
                console.log(uri);
                bundle.helper.url.setUrl(uri);
                return false;
            });
        });*/