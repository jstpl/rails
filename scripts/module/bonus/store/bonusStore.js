$(function() {

    namespace.define('bundle.bonus.store');

    var define = {
        filter: {},
        content: null,

        /**
         * Очистить фильтры
         */
        cleanFilter: function () {
            this.filter = {};
        },

        /**
         * Назначить фильтры
         * @param data
         */
        setFilter: function (data) {
            bundle.helper.array.merge(data, this.filter);
        },

        /**
         * Получить фильтры
         * @returns {define.filter|{}}
         */
        getFilter: function () {
            return this.filter;
        },

        /**
         * Записать контент в память
         *
         * @param content HTML-код
         */
        setContent: function (content) {
            this.content = content;
        },

        /**
         * Получить контент из памяти
         * @returns HTML-код
         */
        getContent: function () {
            return this.content;
        },
    };

    /**
     * Класс хранилища для фильтров
     */
    window.bundle.bonus.store.bonusStore = bundle.helper.class.extends(bundle.domain.baseMemoryStore, define);

});