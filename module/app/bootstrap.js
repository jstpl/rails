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
            container.authService = bundle.module.user.service.authService;
            container.notify = bundle.module.notify.service.notifyService;
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

            bundle.spa.router.init();
            bundle.vue.vm.ensure(bundle.module.navbar.navbarConretoller);

            container.log.info('application kernel launch');
        }
    };

});