$(function() {

    namespace.define('bundle.bonus.store');

    /**
     * Класс хранилища для работы с удаленным сервером
     */
    window.bundle.bonus.store.bonusServerStore = {

        /**
         * Оправить AJAX-запрос
         *
         * request.atInterval:
         *  - false - оправить сейчас
         *  - true - оправить через отложенный вызов (значение интервала - 1000 милисекунд по умолчанию)
         *  - значение интервала - оправить через указанный интервал (в милисекундах)
         *
         * @param request объект запроса
         */
        sendAjaxRequest: function(request) {
            var atInterval = bundle.helper.value.default(request.atInterval, false);
            if(atInterval) {
                atInterval = bundle.helper.value.default(atInterval, 1000);
                return bundle.helper.ajax.sendAtInterval(request, 'bonusRequest', atInterval);
            } else {
                return bundle.helper.ajax.send(request);
            }
        },
    };

});