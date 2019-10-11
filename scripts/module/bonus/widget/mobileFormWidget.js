
$(function() {

    namespace.define('bundle.bonus.widget');

    /**
     * Управление элементом мобильной формы
     */
    window.bundle.bonus.widget.mobileFormWidget = {

        selector: null,

        __construct: function (param) {

        },

        /**
         * Показать мобильную форму
         */
        show: function() {
            $(this.selector).addClass('active');
        },

        /**
         * Скрыть мобильную форму
         */
        hide: function() {
            $(this.selector).removeClass('active');
        },

    };

});