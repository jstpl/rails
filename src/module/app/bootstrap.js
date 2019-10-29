define(
    [
        'jrails/spa/router',
        'jrails/event/eventService',
        'module/user/service/authService',
        'jrails/notify/notifyService',
        'jrails/notify/driver/toastrDriver',
        'jrails/bootstrap/modal/modalService',
        'app/config/main',
        'jrails/kernel/container',
    ],
    function(
        router,
        eventService,
        authService,
        notifyService,
        toastrDriver,
        modalService,
        mainConfig,
        container) {

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
            //container.cache = bundle.cache.cacheService;

            console.log(eventService);

            //window.container = {};

            container.event = eventService;

            container.authService = authService;
            //container.notify = bundle.module.notify.service.notifyService;

            container.notify = notifyService;
            container.notify.driver = toastrDriver;

            container.modal = modalService;

            //var restClient = use('bundle.rest.client');

            container.restClient = container.instance('jrails/rest/client', null, {
                baseUrl: mainConfig.apiServer,
            });
            //container.restClient.setBaseUrl(module.app.config.main.apiServer);
        },

        /**
         * Конфигурация приложения
         */
        initConfig: function () {
            /** Конфигурация приложения */

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
            //bundle.kernel.bootstrap.run(params);
            this.initContainer();
            //this.initConfig();

            router.init();

            /*$('body').append(bundle.module.app.view.bodyTemplate.template());
            bundle.spa.router.init();
            bundle.vue.vm.ensure(bundle.module.app.controller.navbarController);
            bundle.vue.vm.ensure(bundle.module.app.controller.footerController);*/

            console.info('application kernel launch');
        }
    };

});