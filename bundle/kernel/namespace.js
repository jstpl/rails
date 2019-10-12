/**
 * Работа с пространствами имен
 *
 * Можно объявлять, получать пространства.
 * Пространства имен нужны для иерархичного расположения кода.
 * Есть бандл, это самодостаточный модуль, который содержит в себе все неоходимое для своей работы.
 * В бандле могут распологаться хэлперы, сервисы, хранилища, виджеты, драйвера...
 * В плоском списке содержать разные типы классов неудобно,
 * но можно легко выстроить иерархию, например:
 * - user
 *     - service
 *         - authService
 *         - registrationService
 *         - personService
 *     - helper
 *         - loginHelper
 *         - tokenHelper
 *     - store
 *         - identityStore
 *         - personStore
 *     - widget
 *         - avatarWidget
 * - notify
 *     - service
 *         - notifyService
 *     - driver
 *         - sms
 *             - smscDriver
 *             - a1Driver
 *             - beelineDriver
 *         - notify
 *             - pushDriver
 *             - socketDriver
 *             - firebaseDriver
 *
 * `user` и `notify` - это бандлы.
 *
 * notify.driver.sms.beelineDriver - это полное имя класса драйвера для отправки СМС через Beeline
 * 
 * Аналог "use" из PHP:
 *     var ArrayHelper = bundle.helper.array;
 *
 * Получить любой класс можно так:
 *     namespace.get('bundle.helper.url').setUrl('?post=123');
 * Для прозрачности кода, лучше обращаться к классам явно:
 *     bundle.helper.url.setUrl('?post=123');
 * Составные части:
 *     bundle.helper.url - полное имя класса
 *     bundle.helper - пространство имен
 *     setUrl - метод класса
 */
$(function() {

    var store = {
        loaded: {},
        aliases: {},
    };

    /**
     * Пространства имен
     */
    window.namespace = {

        _getAlias: function (className) {
            for(var i in store.aliases) {
                var from = i;
                var to = store.aliases[i];
                var isMatch = className.indexOf(from + '.') === 0;
                if(isMatch) {
                    return {
                        from: from,
                        to: to,
                    };
                }
            }
            return false;
        },

        setAlias: function (from, to) {
            store.aliases[from] = to;
        },

        getAlias: function (className) {
            var alias = this._getAlias(className);
            if(alias) {
                className = alias.to + className.substr(alias.from.length);
            }
            return className;
        },

        requireClasses: function(classesNameSource, callback) {
            for(var k in classesNameSource) {
                var className = classesNameSource[k];
                this.requireClass(className);
            }
        },

        requireClass: function(classNameSource, callback) {
            var className = classNameSource;
            callback = _.defaultTo(callback, function () {});
            if(this.isDefined(className)) {
                callback();
                return className;
            }
            className = this.getAlias(className);
            if(this.isDefined(className)) {
                callback();
                return className;
            }
            var scriptClassArr = className.split('.');
            var scriptUrl = '/' + scriptClassArr.join('/') + '.js';
            if(store.loaded[scriptUrl] === true) {
                callback();
                return className;
            }
            this.requireScript(scriptUrl, callback);
            store.loaded[scriptUrl] = true;
            console.info('Script loaded "' + scriptUrl + '"!');
            return this.get(classNameSource);
        },

        requireScript: function(url, callback) {
            jQuery.ajax({
                url: url,
                dataType: 'script',
                success: callback,
                async: true
            });
            //$('body').append('<script src="' + url + '"></script>');
        },

        /**
         * Объявлено ли пространство имен
         * @param path путь
         * @param value в каком значении искать
         * @returns {*|boolean}
         */
        isDefined: function(path, value) {
            //path = this.getAlias(path);
            value = value === undefined ? window : value;
            //value = bundle.helper.value.default(value, window);
            var arr = path.split('.');
            return helper.isDefined(arr, value);
        },

        /**
         * Объявить пространство имен
         *
         * Назначает объект по заданному пути
         * @param namespace
         */
        define: function(namespace) {
            //namespace = this.getAlias(namespace);
            var arr = namespace.split('.');
            helper.forgeNamespaceRecursive(arr, window);
        },

        /**
         * Получить значение по пути
         * @param namespace
         * @returns {*}
         */
        get: function(namespace) {
            //namespace = this.getAlias(namespace);
            var arr = namespace.split('.');
            return helper.forgeNamespaceRecursive(arr, window);
        },
    };

    /**
     * Приватный хэлпер
     */
    var helper = {
        forgeNamespaceRecursive: function (namespaceArray, object) {
            for (var key in namespaceArray) {
                var item = namespaceArray[key];
                if (typeof object[item] !== "object") {
                    object[item] = {};
                }
                object = object[item];
            }
            return object;
        },
        isDefined: function (namespaceArray, object) {
            for (var key in namespaceArray) {
                var item = namespaceArray[key];
                if (typeof object[item] === "object") {
                    object = object[item];
                } else if(typeof object[item] === "undefined") {
                    return false;
                }
            }
            return true;
        },
    };

    //console.log(namespace.isDefined('namespace'));
    //console.log(namespace.isDefined('bundle.helper444'));

    //var ff = namespace.define('component.rrr11.eee22.ttt33.uuu44');
    //d(ff);

});

/*window.space = function (func) {
    document.addEventListener('DOMContentLoaded', func);
};*/
