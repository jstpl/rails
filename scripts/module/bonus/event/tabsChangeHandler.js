$(function() {

    namespace.define('bundle.bonus.event');

    /**
     * Обработчик события переключения табов по:
     * - Новым игрокам
     * - Действующим игрокам
     * - Все
     */
    window.bundle.bonus.event.tabsChangeHandler = {
        run: function(data) {
            var filter = container.bonusService.getFilter();
            var forNewVal = filter.forNew;
            if(forNewVal == data.name) {
                return;
            }
            container.bonusService.setFilter({forNew: data.name});
            bundle.bonus.controller.filterController.requestAndShow();
        }
    };

});