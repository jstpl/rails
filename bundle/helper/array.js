$(function () {

    namespace.define('bundle.helper');

    /**
     * Работа с Local Storage
     */
    window.bundle.helper.localStorage = {

        get: function (key, defaultValue) {
            var data = null;
            var dataJson = localStorage.getItem(key);
            if(! _.isEmpty(dataJson)) {
                data = JSON.parse(dataJson);
            }
            data = _.defaultTo(data, defaultValue);
            return data;
        },

        set: function (key, data) {
            var dataJson = JSON.stringify(data);
            localStorage.setItem(key, dataJson);
        },

        remove: function (key) {
            localStorage.removeItem(key);
        },

    };

});

$(function () {

    namespace.define('bundle.helper');

    /**
     * Работа со строками
     */
    window.bundle.helper.dom = {

        bindEventForList: function (elements, eventName) {
            elements.each(function (index, value) {
                bundle.helper.dom.bindEvent(this, eventName);
            });
        },

        bindEventForAttribute: function (jElement, eventName, attributeName) {
            var aName = attributeName.substr(2);
            var handler = function (params) {
                var compiled = bundle.spa.template.compile(jElement.attr(attributeName), params);
                if (aName === 'html') {
                    jElement.html(compiled);
                } else {
                    jElement.attr(aName, compiled);
                }
            };
            container.event.registerHandler(eventName, handler);
        },

        bindEvent: function (element, eventName) {
            var jElement = $(element);
            var attributes = bundle.helper.dom.getAttributes(element);
            $.each(attributes, function(attributeName, value) {
                var isMatch = attributeName.indexOf('m-') === 0;
                if(isMatch) {
                    bundle.helper.dom.bindEventForAttribute(jElement, eventName, attributeName);
                }
            });
        },

        getAttributes: function (element) {
            var attrs = {};
            $.each(element.attributes, function() {
                if(this.specified) {
                    attrs[this.name] = this.value;
                    //console.log(this.name, this.value);
                }
            });
            return attrs;
        },

    };

});

$(function () {

    namespace.define('bundle.helper');

    /**
     * Работа со строками
     */
    window.bundle.helper.string = {

        escapeHtml: function (unsafe) {
            return unsafe
                .replace(/&/g, "&amp;")
                .replace(/</g, "&lt;")
                .replace(/>/g, "&gt;")
                .replace(/"/g, "&quot;")
                .replace(/'/g, "&#039;");
        },

        /*unescapeHtml: function (safe) {
            return safe
                .replace("&amp;", /&/g)
                .replace("&lt;", /</g)
                .replace("&gt;", />/g)
                .replace("&quot;", /"/g)
                .replace("&#039;", /'/g);
        },*/

        unescapeHtml: function (safe) {
            return safe.replace(/&amp;/g, '&')
                .replace(/&lt;/g, '<')
                .replace(/&gt;/g, '>')
                .replace(/&quot;/g, '"')
                .replace(/&#039;/g, "'");
        }

    };

});

$(function() {

    namespace.define('bundle.helper');

    /**
     * Работа с массивами и объектами
     */
    window.bundle.helper.array = {

        /**
         * Получить уникальные ключи объекта
         * @param keyList
         * @returns {*}
         */
        uniqueFilter: function(keyList) {
            keyList = keyList.filter(function(itm, i, a) {
                return i == a.indexOf(itm);
            });
            return keyList;
        },

        /**
         * Удалить значение из массива
         * @param arr
         * @param value
         * @returns {boolean}
         */
        removeByValue: function(arr, value) {
            var index = arr.indexOf(value);
            if (index >= 0) {
                arr.splice( index, 1 );
                return true;
            }
            return false;
        },

        /**
         * Получить ключи объекта
         * @param object
         * @returns {[]}
         * @deprecated use _.keys
         */
        getKeys: function(object) {
            return _.keys(object);
            /*var keys = [];
            for (var k in object) keys.push(k);
            return keys;*/
        },

        /**
         * Слить объекты
         * @param from
         * @param to
         */
        merge: function(from, to) {
            for(var k in from) {
                to[k] = from[k];
            }
        },
    };

});