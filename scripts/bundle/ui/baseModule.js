$(function() {

    namespace.define('bundle.ui');

    /**
     * Базовый класс модуля
     */
    window.bundle.ui.baseModule = {

        controllerNamespace: null,

        /**
         * Инициализация контроллеров
         */
        initControllers: function () {
            bundle.helper.class.callMethodInClasses(this.controllerNamespace, 'init');
        },

    };

});