$(function() {

    namespace.define('bundle.kernel.component');

    /**
     * Ядро приложения
     *
     * Запускается 1 раз при запуске приложения
     */
    window.bundle.kernel.bootstrap = {
        /**
         * Регистрация сервисов в контейнере
         */
        initContainer: function () {
            container.env = bundle.env.envService;
            container.log = bundle.log.logService;
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
            this.initContainer();
            this.initConfig();
            container.log.info('default kernel launch');

            /** Запуск приложения */
            //app.run();
        }
    };

});