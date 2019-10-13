$(function() {

    namespace.define('bundle.event');

    /**
     * Работа с событиями
     */
    window.bundle.event.eventService = {

        handlers: {},
        holdList: {},

        /**
         * Регистрация обработчика события
         *
         * @param eventName {String|Array} имя события или массив имен
         * @param handler обработчик (функция или класс с методом "run")
         */
        registerHandler: function(eventName, handler) {
            if(_.isArray(eventName)) {
                for(var k in eventName) {
                    var eventNameItem = eventName[k];
                    this.registerHandler(eventNameItem, handler);
                }
            }
            this._initEventArray(eventName);
            this.handlers[eventName].push(handler);
            container.log.info('Register handler (' + bundle.helper.php.get_type(handler) + ') for event "' + eventName + '"');
        },

        /**
         * Удаление обработчика события
         *
         * @param eventName имя события
         * @param handler обработчик (функция или класс с методом "run")
         */
        removeHandler: function(eventName, handler) {
            this._initEventArray(eventName);
            var isRemoved = bundle.helper.array.removeByValue(this.handlers[eventName], handler);
            if(isRemoved) {
                container.log.info('Remove handler for event "' + eventName + '"');
            }
        },

        /**
         * Отключить обработку события
         *
         * @param eventName имя события
         */
        hold: function(eventName) {
            this.holdList[eventName] = true;
        },

        /**
         * Включить обработку события
         *
         * @param eventName имя события
         */
        unHold: function(eventName) {
            this.holdList[eventName] = false;
        },

        /**
         * Отключена ли обработка события
         *
         * @param eventName имя события
         * @returns {boolean}
         */
        isHold: function(eventName) {
            return ! _.isEmpty(this.holdList[eventName]);
        },

        /**
         * Вызов события
         *
         * @param eventName имя события
         * @param params параметры события
         */
        trigger: function(eventName, params) {
            if(this.isHold(eventName)) {
                container.log.info('Event "' + eventName + '" is hold!');
                return;
            }
            this._initEventArray(eventName);
            var handlers = this.handlers[eventName];
            this._runHandlersForEvent(eventName, handlers, params);
        },

        _initEventArray: function(eventName) {
            if(!bundle.helper.php.isset(this.handlers[eventName])) {
                this.handlers[eventName] = [];
            }
        },

        _runHandlersForEvent: function (eventName, handlers, params) {
            if(bundle.helper.php.empty(handlers)) {
                container.log.info('Not found handlers for event "' + eventName + '"');
                return;
            }

            var self = this;
            handlers.forEach(function(handler) {
                self._runHandler(eventName, handler, params);
            });

            /*for (var key in handlers) {
                var handler = handlers[key];
                this._run(handler, params);
            }*/
        },
        _runHandler: function (eventName, handler, params) {
            if(bundle.helper.php.is_object(handler)) {
                handler.run(params);
                container.log.info('Run handler (object) for event "' + eventName + '"');
            } else if(bundle.helper.php.is_function(handler)) {
                handler(params);
                container.log.info('Run handler (function) for event "' + eventName + '"');
            }
        }
    };

});