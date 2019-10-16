$(function() {

    namespace.define('bundle.notify.driver');

    /**
     * Работа с пользовательскими уведомлениями
     */
    window.bundle.notify.driver.toastrDriver = {

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