space('container', function() {

    /**
     * Контейнер
     */
    return {
        widget: {},
        dom: {},
        service: {},
        store: {},
        config: {
            mode: 'prod',
        },

        /**
         * Создать экземпляр объекта
         *
         * @param className класс
         * @param attributes назначаемые атрибуты
         * @param params параметры конструктора
         * @returns {Object}
         */
        instance: function (className, attributes, params) {
            return bundle.helper.class.create(className, attributes, params);
        },

        /**
         * Объявлен ли класс в контейнере
         *
         * @param className
         * @returns {Boolean}
         */
        has: function (className) {
            return namespace.isDefined(className, this);
        },

    };

});