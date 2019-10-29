define(['jrails/vue/vm', 'jrails/spa/router', 'jrails/vue/loader', 'module/bskit/controller/allController'], function(vm, router, vueLoader, allController) {

    router.addRoute('/bskit', function () {
        /*allController.el = '#app-bskit-all';
        vm.ensure(allController);*/

        //alert(111);
        vueLoader.run({
            controllerInstance: allController,
            controller: 'bskit',
            action: 'all',
        });
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