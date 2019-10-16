$(function() {

    namespace.define('bundle.legalbet.component');

    /**
     * Ядро приложения
     *
     * Запускается 1 раз при запуске приложения
     *
     * Todo: переименовать в bundle.legalbet.bootstrap
     */
    window.bundle.legalbet.component.bootstrap = {

        /**
         * Регистрация сервисов в контейнере
         */
        initContainer: function () {
            container.cache = bundle.cache.cacheService;
            container.event = bundle.event.eventService;
            container.notify = bundle.notify.notifyService;
            container.queue = bundle.queue.queueService;
            container.loader = container.instance(bundle.ui.baseElementService, {
                selector: '.js-loader',
            });
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
            container.log.info('legalbet kernel launch');
        }
    };

});