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
            this._hideAll();
            layerWrapper.show();
            var controllerClass = 'bundle.' + request.controller + '.controller.' + request.action;

            if(namespace.isDefined(controllerClass)) {
                var controller = namespace.get(controllerClass);
                controller.run(request);
            }
        },

        add: function (data, request) {
            var layerHtml =
                '<div class="page-layer" id="app-' + request.controller + '-' + request.action + '">' +
                data +
                '</div>';
            $('#app').append(layerHtml);
        },

        addScript: function (url) {
            $('body').append('<script src="' + url + '"><\/script>');
        },

        _hideAll: function () {
            $('#app div.page-layer').hide();
        },

    };

    /**
     *
     */
    window.bundle.spa.module = {

        isTemplate: function (data) {
            return data.search(/<!DOCTYPE html>/g) === -1;
        },

        load: function (request, callback) {
            var self = this;
            $.ajax({
                url: '/' + request.path + '/' + request.controller + '/' + request.action + '/template.html',
                success: function (data) {
                    if (self.isTemplate(data)) {
                        bundle.spa.layer.add(data, request);
                        //bundle.spa.layer.show(request);
                        callback();
                        //bundle.spa.layer.addScript('/'+request.path+'/'+request.controller+'/'+request.action+'/script.js');
                        //bundle[request.controller].controller
                    }
                }
            });
        },

        run: function (requestSource) {

            var request = _.clone(requestSource);

            //d(request);
            request.action = _.defaultTo(request.action, 'index');
            request.path = _.defaultTo(request.path, 'scripts/module');
            var isExists = bundle.spa.layer.has(request);

            var self = this;

            var callback = function () {
                bundle.spa.layer.show(request);
            };

            if (isExists) {
                callback();
            } else {
                self.load(request, callback);
            }
        }

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