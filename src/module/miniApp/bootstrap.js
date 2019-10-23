space('bundle.module.app.bootstrap', function() {

    /**
     * Ядро приложения
     *
     * Запускается 1 раз при запуске приложения
     */
    return {
        /**
         * Регистрация сервисов в контейнере
         */
        initContainer: function () {
            container.event = bundle.event.eventService;
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

            container.log.info('application kernel launch');

            alert('Hello World!');
        }
    };

});