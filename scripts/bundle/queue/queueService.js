$(function() {

    namespace.define('bundle.queue');

    /**
     * Базовый класс очередей
     */
    window.bundle.queue.queueService = {
        collection: [],

        /**
         * Добавить команду в очередь
         * @param command объект команды с методом "run"
         * @param params параметры команды
         */
        add: function(command, params) {

        },

        /**
         * Выполнить стек команд
         */
        run: function() {

        },
    };

});