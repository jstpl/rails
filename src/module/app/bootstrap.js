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

        'text!module/app/template/body.html',
        'jrails/vue/vm',
        'module/app/vm/navbarVm',
        'module/app/vm/footerVm',

        //

        'module/bskit/config/route',
        'module/user/config/route',
        'module/person/config/route',
        'module/dashboard/config/route',

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

        bodyTemplateCode,
        vm,
        navbarVm,
        footerVm

        //


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
            container.event = eventService;
            container.authService = authService;
            container.notify = notifyService;
            container.notify.driver = toastrDriver;
            container.modal = modalService;
            restClient.baseUrl = mainConfig.apiServer;
            container.restClient = restClient;
        },

        /**
         * Конфигурация приложения
         */
        initConfig: function () {
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
         * Инициализация основного шаблона
         */
        initLayout: function () {
            $('body').append(bodyTemplateCode);
            vm.ensure(navbarVm);
            vm.ensure(footerVm);
        },

        /**
         * Запуск ядра приложения
         */
        run: function () {
            //bundle.kernel.bootstrap.run(params);
            this.initContainer();
            this.initConfig();
            this.initLayout();

            router.init();

            console.info('application kernel launch');
        }
    };

});