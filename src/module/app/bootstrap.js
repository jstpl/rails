define(
    [
        'jquery',
        'twitterBootstrap',
        'jrails/spa/router',
        'jrails/event/eventService',

        'module/user/service/authService',
        'jrails/notify/notifyService',
        'jrails/notify/driver/toastrDriver',
        'jrails/bootstrap/modal/modalService',

        'app/config/main',
        'jrails/kernel/container',
        'jrails/rest/client',
        'module/user/lang/ru/auth',

        'module/app/view/bodyTemplate',
        'jrails/vue/vm',
        'module/app/controller/navbarController',
        'module/app/controller/footerController',

        'module/bskit/config/route',
        'module/user/config/route',
    ],
    function(
        $,
        twitterBootstrap,
        router,
        eventService,

        authService,
        notifyService,
        toastrDriver,
        modalService,

        mainConfig,
        container,
        restClient,
        authLang,

        bodyTemplate,
        vm,
        navbarController,
        footerController,

        bskitRouteConfig,
        userRouteConfig,
    ) {

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

            //window.container = {};

            container.event = eventService;

            container.authService = authService;
            //container.notify = bundle.module.notify.service.notifyService;

            container.notify = notifyService;
            container.notify.driver = toastrDriver;

            container.modal = modalService;

            //var restClient = use('bundle.rest.client');

            restClient.baseUrl = mainConfig.apiServer;

            container.restClient = restClient;
            //container.restClient.setBaseUrl(module.app.config.main.apiServer);
        },

        /**
         * Конфигурация приложения
         */
        initConfig: function () {
            /** Конфигурация приложения */

            container.event.registerHandler('api.request.send.error', function (response) {
                if(response.status === 401) {
                    authService.logout();
                    authService.authRequired();
                } else if (response.status === 422) {
                    
                } else {
                    var msg = restClient.getErrorMessage(response);
                    container.notify.error('Произошла ошибка запроса!' + "<br/>" + msg);
                }
            });

            container.event.registerHandler('user.auth.authRequired', function () {
                container.notify.info(authLang.authorizationRequiredMessage);
                router.go('user/auth');
            });

        },

        /**
         * Запуск ядра приложения
         */
        run: function () {
            //bundle.kernel.bootstrap.run(params);
            this.initContainer();
            this.initConfig();

            $('body').append(bodyTemplate.template());
            router.init();
            vm.ensure(navbarController);
            vm.ensure(footerController);

            console.info('application kernel launch');
        }
    };

});