$(function() {

    namespace.define('bundle.bonus.service');

    /**
     * Сервис фильтра бонусов
     */
    window.bundle.bonus.service.bonusService = {

        /**
         * Установить значения фильтра с предварительной очисткой значений
         */
        setForceFilter: function (data) {
            container.bonusStateStore.cleanFilter();
            container.bonusStateStore.setFilter(data);
        },

        /**
         * Сбросить значения фильтра
         */
        resetFilter: function () {
            container.bonusStateStore.cleanFilter();
        },

        /**
         * Установить значения фильтра
         *
         * Значения не перезаписывают весь объект, а лишь дополняют его атрибуты
         *
         * @param data значения фильтра
         */
        setFilter: function (data) {
            container.bonusStateStore.setFilter(data);
        },

        /**
         * Получить значения фильтра
         * @returns {*}
         */
        getFilter: function () {
            return container.bonusStateStore.getFilter();
        },

        sendRequest: function(request) {
            var filterData = this.getFilter();
            request.url = 'filter?' + $.param(filterData);
            //request.url = 'qwertyu';
            return container.bonusServerStore.sendAjaxRequest(request);
        },

    };

});