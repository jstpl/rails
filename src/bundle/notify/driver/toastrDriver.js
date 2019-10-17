$(function() {

    namespace.define('bundle.notify.driver');

    /**
     * Работа с пользовательскими уведомлениями
     */
    window.bundle.notify.driver.toastrDriver = {

        options: {},

        /**
         * Показать сообщение любого типа
         * @param entity сущность уведомления
         */
        show: function (entity) {
            entity.options = _.defaultTo(entity.options, this.options);
            var method = toastr[entity.type];
            method(entity.message, entity.options);
        },

    };

});