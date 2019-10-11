$(function() {

    namespace.define('bundle.bonus.service');

    /**
     * Управление всплывающими кнопками
     */
    window.bundle.bonus.widget.foundWidget = {

        foundSelector: null,
        notFoundSelector: null,

        __construct: function (param) {

        },

        /**
         * Скрыть все всплывающие кнопки
         */
        hideAll: function() {
            $(this.notFoundSelector).hide();
            $(this.foundSelector).hide();
        },

        /**
         * Показать всплывающюю кнопку с количеством найденных бонусов
         */
        showFound: function() {
            this.hideAll();
            $(this.foundSelector).show();
        },

        /**
         * Показать всплывающюю кнопку "сброс фильтра"
         */
        showNotFound: function() {
            this.hideAll();
            $(this.notFoundSelector).show();
        },

    };

});