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
            container.restClient = container.instance(bundle.rest.api);
            container.restClient.setBaseUrl('http://api.union.project/v1');
        },

        /**
         * Конфигурация приложения
         */
        initConfig: function () {
            /** Конфигурация приложения */
            //container.env.setMode(bundle.env.envEnum.develop);

        },

        /**
         * Запуск ядра приложения
         * @param params
         */
        run: function (params) {
            bundle.kernel.bootstrap.run(params);
            this.initContainer();
            this.initConfig();

            bundle.spa.router.init();
            bundle.vue.vm.ensure(bundle.module.navbar.navbarConretoller);

            container.log.info('application kernel launch');
        }
    };

});