$(function() {

    namespace.define('bundle.bonus.event');

    /**
     * Обработчик события изменения значений фильтра
     *
     * Делает запрос на получение списка и кол-ва бонусов.
     * !!! Не обновляет список бонусов на странице.
     *
     * @returns {boolean}
     */
    window.bundle.bonus.event.filterChangeHandler = {
        run: function(data) {
            var valueList = data.plugin.getValues();
            container.bonusService.setFilter(valueList);
            bundle.bonus.controller.filterController.preRequest();
        }
    };

});