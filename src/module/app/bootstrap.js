$(function() {

    namespace.define('bundle.module.app');

    /**
     * Ядро приложения
     *
     * Запускается 1 раз при запуске приложения
     */
    window.bundle.module.app.bootstrap = {
        /**
         * Регистрация сервисов в контейнере
         */
        initContainer: function () {
            container.cache = bundle.cache.cacheService;
            container.event = bundle.event.eventService;
            //container.queue = bundle.queue.queueService;
            /*container.loader = container.instance(bundle.ui.baseElementService, {
                selector: '.js-loader',
            });*/
            container.authService = bundle.module.user.service.authService;
            container.notify = bundle.module.notify.service.notifyService;
            container.modal = bundle.module.bootstrap.modal.modalService;
            container.restClient = container.instance(bundle.rest.client);
            container.restClient.setBaseUrl('http://test-api.union.yuwert.kz/v1');
        },

        /**
         * Конфигурация приложения
         */
        initConfig: function () {
            /** Конфигурация приложения */
            //container.env.setMode(bundle.env.envEnum.develop);

            container.event.registerHandler('api.request.send.error', function (response) {
                if(response.status === 401) {
                    bundle.module.user.service.authService.logout();
                    bundle.module.user.service.authService.authRequired();
                } else if (response.status === 422) {
                    
                } else {
                    var msg = bundle.rest.client.getErrorMessage(response);
                    container.notify.error('Произошла ошибка запроса!' + "<br/>" + msg);
                }
            });

            container.event.registerHandler('user.auth.authRequired', function () {
                container.notify.info(lang.user.auth.authorizationRequiredMessage);
                bundle.spa.router.go('user/auth');
            });

        },

        /**
         * Запуск ядра приложения
         * @param params
         */
        run: function (params) {
            bundle.kernel.bootstrap.run(params);
            this.initContainer();
            this.initConfig();

            $('body').append(bundle.module.app.view.bodyTemplate.template());
            bundle.spa.router.init();
            bundle.vue.vm.ensure(bundle.module.app.controller.navbarController);
            bundle.vue.vm.ensure(bundle.module.app.controller.footerController);

            container.log.info('application kernel launch');
        }
    };

});