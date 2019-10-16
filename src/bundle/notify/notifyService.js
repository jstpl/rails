$(function() {

    namespace.define('bundle.notify');

    /**
     * Работа с пользовательскими уведомлениями
     */
    window.bundle.notify.notifyService = {

        /**
         * Показать сообщение об ошибке
         * @param message текст сообщения
         */
        error: function (message) {
            this.show(bundle.notify.notifyTypeEnum.error, message);
        },

        /**
         * Показать сообщение о критической ошибке
         * @param message текст сообщения
         */
        danger: function (message) {
            this.show(bundle.notify.notifyTypeEnum.danger, message);
        },

        /**
         * Показать сообщение с информацией
         * @param message текст сообщения
         */
        info: function (message) {
            this.show(bundle.notify.notifyTypeEnum.info, message);
        },

        /**
         * Показать сообщение об успешной операции
         * @param message текст сообщения
         */
        success: function (message) {
            this.show(bundle.notify.notifyTypeEnum.success, message);
        },

        /**
         * Показать сообщение любого типа
         * @param type тип сообщения (перечнь типов смотреть в классе bundle.notify.notifyTypeEnum)
         * @param message текст сообщения
         */
        show: function (type, message) {
            intel.notify({
                status: type,
                text: message,
            });
        },

    };

});