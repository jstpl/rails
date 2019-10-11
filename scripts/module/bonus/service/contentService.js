$(function() {

    namespace.define('bundle.bonus.service');

    /**
     * Сервис контента
     */
    window.bundle.bonus.service.contentService = {

        /**
         * Записать контент в память
         *
         * @param content HTML-код
         */
        set: function (content) {
            container.bonusStateStore.setContent(content);
        },

        /**
         * Получить контент из памяти
         * @returns HTML-код
         */
        get: function () {
            return container.bonusStateStore.getContent();
        },

    };

});