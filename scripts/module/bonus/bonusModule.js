$(function () {

    namespace.define('bundle.bonus');

    /**
     * Модуль фильтра бонусов
     */
    var bonusModule = {

        controllerNamespace: bundle.bonus.controller,

        /**
         * Декларация сервисов в контейнере
         */
        initContainer: function () {
            container.bonusService = bundle.bonus.service.bonusService;
            container.contentService = bundle.bonus.service.contentService;
            container.bonusStateStore = window.bundle.bonus.store.bonusStore;
            container.bonusServerStore = window.bundle.bonus.store.bonusServerStore;
        },

        /**
         * Установка начального значения фильтров
         */
        setFormValue: function () {
            //container.bonusService.setFilter(window.controllerVars['bonusValue']);
            bundle.bonus.controller.filterController.setFilter({});
        },

        /**
         * Запуск модуля
         */
        run: function () {
            this.initContainer();
            this.initControllers();
            this.setFormValue();
            bundle.bonus.controller.filterController.registerHandlers();
            bundle.bonus.controller.filterController.updateDomState();
        }

    };

    window.bundle.bonus.bonusModule = bundle.helper.class.extends(bundle.ui.baseModule, bonusModule);

});