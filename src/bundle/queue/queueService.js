space('window.bundle.queue.queueService', function() {

    namespace.define('bundle.queue');

    /**
     * Базовый класс очередей
     */
    return {
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