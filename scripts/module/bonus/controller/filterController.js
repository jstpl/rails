$(function() {

    namespace.define('bundle.bonus.controller');

    /**
     * Приватный контейнер для данных
     */
    var widget = {
        form: null,
        mobileForm: null,
        forNew: null,
        showAction: null,
        content: null,
        found: null
    };

    /**
     * Контроллер фильтра бонусов
     */
    window.bundle.bonus.controller.filterController = {

        /**
         * Инициализация UI компонентов
         */
        init: function () {

            /** Форма фильтра бонусов */
            $("#filterForm").formWidget();

            /** Табы фильтрации по игрокам */
            $("#forNew").tabsWidget({
                childSelector: '.button',
                override: {
                    /** Переопределяем метод приведения значения к нужному виду */
                    prepareValue: function(name) {
                        return name === undefined ? '' : name;
                    }
                }
            });

            /** Всплывающие кнопки "Показать..." и "Сбросить" */
            widget.found = container.instance(bundle.bonus.widget.foundWidget, {
                foundSelector: '.bonuses-filter-found',
                notFoundSelector: '.bonuses-filter-not-found',
                countSelector: '.bonusCount'
            });

            /** форма для мобильных устройств */
            widget.mobileForm = container.instance(window.bundle.bonus.widget.mobileFormWidget, {
                selector: '.bonuses-filter_mobile'
            });

            /** кнопка показа бонусов */
            widget.showAction = container.instance(bundle.ui.baseElementService, {
                id: 'showAction',
                selector: '.show'
            });

            /** кнопка сброса фильтра */
            $(".reset").actionWidget({id: 'resetAction'});
            /*container.instance(bundle.ui.baseElementService, {
                id: 'resetAction',
                selector: '.reset'
            });*/

            /**кнопка "Сбросить" в мобильной версии */
            $(".reset-show").actionWidget({id: 'resetShowAction'});
            /*container.instance(bundle.ui.baseElementService, {
                id: 'resetShowAction',
                selector: '.reset-show'
            });*/

            /** кнопка "Фильтровать" в мобильной версии */
            $(".filter-button").actionWidget({id: 'showMobileFilterAction'});
            /*container.instance(bundle.ui.baseElementService, {
                id: 'showMobileFilterAction',
                selector: '.filter-button'
            });*/

            /** кнопка закрытия формы в мобильной версии */
            $(".mob-bonuses-filter-close").actionWidget({id: 'hideMobileFilterAction'});
            /*container.instance(bundle.ui.baseElementService, {
                id: 'hideMobileFilterAction',
                selector: '.mob-bonuses-filter-close'
            });*/

            /** элемент списка бонусов */
            widget.content = container.instance(bundle.ui.baseElementService, {
                selector: '#listContent'
            });

            /** Инициализация слайдера */
            //var maxAmount = window.controllerVars['bonusMax'];
            //var amountValues = controllerVars['bonusValue'];
            $(".bonuses-filter__slider").sliderWidget({
                start: [0, 100],
                range: {
                    min: 0,
                    max: 100
                }
            });

            widget.slider = $('.bonuses-filter__slider').data("legalbetSliderWidget");
            widget.form = $('#filterForm').data('legalbetFormWidget');
            widget.forNew = $('#forNew').data('legalbetTabsWidget');

            helper.initInner();
        },

        /**
         * Регистрация обработчиков событий
         */
        registerHandlers: function() {

            /** Обработчик события при клике на кнопку "Показать..." */
            container.event.registerHandler('baseElementService.showAction.click', bundle.bonus.controller.filterController.showContentFromStore);

            /** Обработчик события при клике на кнопку "Сбросить" */
            container.event.registerHandler('baseElementService.resetAction.click', function () {
                bundle.bonus.controller.filterController.resetFilter();
                bundle.bonus.controller.filterController.preRequest();
            });

            /** Обработчик события при клике на кнопку "Сбросить" в мобильной версии */
            container.event.registerHandler('baseElementService.resetShowAction.click', function () {
                bundle.bonus.controller.filterController.resetFilter();
                bundle.bonus.controller.filterController.requestAndShow();
            });

            /** Обработчик события при клике на элемент подборки бонусов */
            container.event.registerHandler('compilationWidget.click', function (data) {
                bundle.bonus.controller.filterController.setForceFilter(data['filter']);
                bundle.bonus.controller.filterController.requestAndShow();
            });

            /** Обработчик события при клике на кнопку "Фильтровать" в мобильной версии */
            container.event.registerHandler('baseElementService.showMobileFilterAction.click', function () {
                widget.mobileForm.show();
            });

            /** Обработчик события при клике на кнопку закрытия формы в мобильной версии */
            container.event.registerHandler('baseElementService.hideMobileFilterAction.click', function () {
                widget.mobileForm.hide();
            });

            /** имена событий можно подсмотреть в консоли, при вызове события в лог пишется инфо */

            /** Обработчик события при выборе таба */
            container.event.registerHandler('tabsWidget.forNew.change', bundle.bonus.event.tabsChangeHandler);

            /** Обработчик события при изменении значений в форме */
            container.event.registerHandler('formWidget.filterForm.change', bundle.bonus.event.filterChangeHandler);
        },

        /**
         * Установка значения кол-ва найденных бонусов
         * @param count
         */
        setCount: function(count) {
            $("#filterForm").find('.bonusCount').html(count);
            widget.found.hideAll();
            if(count > 0) {
                widget.showAction.enable();
                widget.found.showFound();
            } else {
                widget.showAction.disable();
                widget.found.showNotFound();
            }
        },

        /**
         * Отправить запрос без обновления списка бонусов
         */
        preRequest: function() {
            widget.showAction.disable();
            var request = {
                success: function (data) {
                    container.contentService.set(data['listContent']);
                    bundle.bonus.controller.filterController.setCount(data.count);
                }
            };
            request.atInterval = true;
            container.bonusService.sendRequest(request);
        },

        /**
         * Отправить запрос и обновить список бонусов
         */
        requestAndShow: function() {
            var request = {
                success: function (data) {
                    bundle.bonus.controller.filterController.showData(data);
                    widget.found.hideAll();
                }
            };
            request.atInterval = false;
            container.bonusService.sendRequest(request);
        },

        /**
         * Установить значения фильтра с предварительной очисткой значений
         */
        setForceFilter: function (data) {
            widget.found.hideAll();
            container.bonusService.setForceFilter(data);
            helper.updateDomState();
            return false;
        },

        /**
         * Сбросить значения фильтра
         */
        resetFilter: function () {
            widget.found.hideAll();
            container.bonusService.resetFilter();
            helper.updateFormState();
            // костыль
            widget.slider.setValue(0, null);
            widget.slider.setValue(1, null);
            // костыль
            return false;
        },

        /**
         * Установить значения фильтра
         *
         * Значения не перезаписывают весь объект, а лишь дополняют его атрибуты
         *
         * @param data значения фильтра
         */
        setFilter: function (data) {
            widget.found.hideAll();
            container.bonusService.setFilter(data);
            helper.updateFormState();
            return false;
        },

        /**
         * Показать контент результата запроса
         */
        showContentFromStore: function() {
            var listContent = container.contentService.get();
            if(!bundle.helper.php.empty(listContent)) {
                widget.content.instance.html(listContent);
                helper.initInner();
                helper.setUrl();
            }
            widget.found.hideAll();
            widget.mobileForm.hide();
            widget.showAction.disable();
            helper.updateDomState();
        },

        /**
         * Показать список бонусов и их количество
         * @param data значения фильтра
         * @private
         */
        showData: function(data) {
            widget.content.instance.html(data['listContent']);
            bundle.bonus.controller.filterController.setCount(data.count);
            helper.initInner();
            helper.setUrl();
            widget.found.hideAll();
            widget.showAction.disable();
        },

        /**
         * Обновить состояние формы и табов
         */
        updateDomState: function () {
            helper.updateDomState();
        }

    };

    /**
     * Приватный хэлпер
     */
    var helper = {

        /**
         * Инициализация UI компонентов, которые находятся внутри контента
         */
        initInner: function () {
            //bundle.bonus.widget.compilationWidget.init();
        },

        /**
         * Установить ссылку со значениями фильтра
         */
        setUrl: function() {
            var filterData = container.bonusService.getFilter();
            var url = $.param(filterData);
            if( ! _.isEmpty(url)) {
                url = '?' + url;
            } else {
                url = './';
            }
            bundle.helper.url.setUrl(url);
        },

        /**
         * Обновить состояние формы и табов
         */
        updateDomState: function () {
            this.updateFormState();
            this.updateForNewState();
        },

        /**
         * Обновить табов
         */
        updateForNewState: function () {
            var filter = container.bonusService.getFilter();
            widget.forNew.selectItem(filter.forNew);
        },

        /**
         * Обновить состояние формы
         */
        updateFormState: function () {
            var filter = container.bonusService.getFilter();
            widget.form.setValues(filter);
        },
    };

});