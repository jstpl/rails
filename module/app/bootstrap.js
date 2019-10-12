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
            bundle.legalbet.component.bootstrap.run(params);
            this.initContainer();
            this.initConfig();
            container.log.info('application kernel launch');
        }
    };

});