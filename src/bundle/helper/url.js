space(function() {

    namespace.define('bundle.helper');

    /**
     * Работа с ссылками
     */
    window.bundle.helper.url = {

        /**
         * Изменить URL страницы без перезагрузки
         * @param url относительный URL
         */
        setUrl: function (url) {
            var state = {};
            var title = '';
            history.pushState(state, title, url);
        },
    };

});