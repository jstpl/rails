define(['vue', 'jrails/vue/vm', 'jrails/spa/router', 'jrails/vue/loader', 'jrails/spa/layer'], function(Vue, vm, router, vueLoader, spaLayer) {


    var controllerFactory = {
        initTemplate: function (controller, templateHtml) {
            spaLayer.hideAll();
            if( ! vm.has(controller.el)) {
                var id = controller.el.replace(/#/g, '');
                spaLayer.add222(templateHtml, id);
                vm.ensure(controller);
            }
            $(controller.el).show();
        },
        loadTemplate: function (controller) {
            var templateFileName = 'text!' + controller.templateFile;
            require([templateFileName], function (templateHtml) {
                controllerFactory.initTemplate(controller, templateHtml);
            });
        },
        createByClassName: function (controllerClassName) {
            require([controllerClassName], controllerFactory.loadTemplate);
        }
    };

    router.addRoute('/bskit', function () {

        var controllerClassName = 'module/bskit/controller/allController';
        controllerFactory.createByClassName(controllerClassName);

        /*vueLoader.run({
            controllerInstance: allController,
            controller: 'bskit',
            action: 'all',
        });*/
    });

    router.addRoute('/bskit/:id', function (id) {
        vueLoader.run({
            controller: 'bskit',
            action: id,
            query: {
                id: id,
            },
        });
    });

});