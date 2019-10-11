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

    /**
     * Пространства имен
     */
    window.namespace = {

        /**
         * Объявлено ли пространство имен
         * @param path путь
         * @param value в каком значении искать
         * @returns {*|boolean}
         */
        isDefined: function(path, value) {
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
            var arr = namespace.split('.');
            helper.forgeNamespaceRecursive(arr, window);
        },

        /**
         * Получить значение по пути
         * @param namespace
         * @returns {*}
         */
        get: function(namespace) {
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
