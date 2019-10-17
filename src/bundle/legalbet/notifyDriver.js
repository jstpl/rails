$(function () {

    namespace.define('bundle.notify.driver');

    /**
     * Драйвер уведомлений для Legalbet
     */
    window.bundle.notify.driver.notifyDriver = {

        options: {},

        /**
         * Показать сообщение любого типа
         * @param entity сущность уведомления
         */
        show: function (entity) {
            intel.notify({
                status: entity.type,
                text: entity.message,
            });
        },

    };

});