$(function() {

    namespace.define('bundle.bonus.widget');

    /**
     * Подборки бонусов
     */
    window.bundle.bonus.widget.compilationWidget = {

        axis: 'x',
        scrollInertia: 0,
        mouseWheelPixels: 100,
        updateOnContentResize: true,
        mouseWheel: {
            preventDefault: true
        },
        scrollButtons: true,
        alwaysShowScrollbar: 2,
        callbacks: {
            whileScrolling: function whileScrolling() {
                if (this.mcs.left < -16) {
                    $(this).closest('.bonuses-collections').addClass('left-active');
                } else {
                    $(this).closest('.bonuses-collections').removeClass('left-active');
                }

                if (this.mcs.leftPct > 97) {
                    $(this).closest('.bonuses-collections').removeClass('right-active');
                } else {
                    $(this).closest('.bonuses-collections').addClass('right-active');
                }
            }
        },

        init: function() {
            $(".bonuses-collections__list").mCustomScrollbar(window.bundle.bonus.widget.compilationWidget);
            var $collection = $('.bonuses-collections__list');
            var $items = $collection.find('.bonuses-collections__item');

            $('.bonuses-collections__next').on('click', function (e) {
                e.preventDefault();
                $collection.mCustomScrollbar('scrollTo', '-=120', {
                    scrollEasing: 'easeOut',
                    scrollInertia: 500
                });
            });

            $('.bonuses-collections__prev').on('click', function (e) {
                e.preventDefault();
                $collection.mCustomScrollbar('scrollTo', '+=120', {
                    scrollEasing: 'easeOut',
                    scrollInertia: 500
                });
            });
            /* -------------- End custom scrollbar --------------------- */

            /* ------------------- Handle click ------------------------ */
            $items.on('click', function (event) {
                event.stopPropagation();

                var types = $(this).data('types');
                var sports = $(this).data('sports');
                var conditions = $(this).data('conditions');
                var book = $(this).data('book');

                var filter = {
                    bonusType: [],
                    sport: [],
                    bonusCondition: [],
                    book: [],
                };

                types.forEach(function (type) {
                    filter.bonusType.push(type);
                });

                sports.forEach(function (sport) {
                    filter.sport.push(sport);
                });

                conditions.forEach(function (condition) {
                    filter.bonusCondition.push(condition);
                });

                if (!!book) {
                    filter.book.push(""+book);
                }

                container.event.trigger('compilationWidget.click', {filter: filter});

                // Снимает активный класс со всех
                $items
                    .removeClass('bonuses-collections__item_active')
                    .find('.bonuses-collections__close')
                    .remove();

                if ($(this).find('.bonuses-collections__close').length > 0) {
                    return;
                }

                // И добавляем только таргету
                $(this)
                    .addClass('bonuses-collections__item_active')
                    .prepend('<a class="icon circle icon-close bonuses-collections__close" href=""></a>')
                ;

                $(this).find('.bonuses-collections__close').on('click', function () {
                    //history.pushState(null, null, location.href.split('?')[0]);
                })

            });
            /* ----------------- End handle click ---------------------- */
        },

    };

});