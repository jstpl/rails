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

    /**
     *
     */
    window.bundle.spa.module = {

        getControllerClassName: function (request) {
            var className = 'bundle.module.' + request.controller + '.' + request.action+'.script';
            return className;
        },

        isTemplate: function (data) {
            return data.search(/<!DOCTYPE html>/g) === -1;
        },

        load: function (request, callback) {
            var self = this;
            //var className = 'bundle.module.'+request.namespace+'.script';
            var className = bundle.spa.module.getControllerClassName(request);
            $.ajax({
                url: '/' + request.path + '/' + request.controller + '/view/' + request.action + '.html',
                success: function (data) {
                    namespace.requireClass(className, callback);
                    callback();
                    if (self.isTemplate(data)) {
                        bundle.spa.layer.add(data, request);
                    }
                }
            });
        },

        run: function (requestSource) {
            bundle.spa.layer.hideAll();
            var request = _.clone(requestSource);
            this.prepareRequest(request);
            var callback = function () {
                bundle.spa.layer.show(request);
                var className = bundle.spa.module.getControllerClassName(request);
                //console.log(className);
                //className = namespace.getAlias(className)
                var controller = namespace.get(className);
                if( ! _.isEmpty(controller)) {
                    controller.run(request);
                }
            };
            this.doRequest(request, callback);
        },

        doRequest: function (request, callback) {
            var isExists = bundle.spa.layer.has(request);
            if (isExists) {
                callback();
            } else {
                this.load(request, callback);
            }
        },

        prepareRequest: function (request) {
            request.action = _.defaultTo(request.action, 'index');
            request.path = _.defaultTo(request.path, 'scripts/module');
            request.namespace = request.controller + '.' + request.action;
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