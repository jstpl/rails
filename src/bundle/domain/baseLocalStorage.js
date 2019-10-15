$(function() {

    namespace.define('bundle.domain');

    var localStorageHelper = bundle.helper.localStorage;

    /**
     * Базовый класс для хранилища состояния в Local Storage
     */
    window.bundle.domain.baseLocalStorage = {

        storageKey: null,

        get: function (defaultValue) {
            return localStorageHelper.get(this.storageKey, defaultValue);
        },

        set: function (data) {
            localStorageHelper.set(this.storageKey, data);
        },

        remove: function () {
            localStorageHelper.remove(this.storageKey);
        },

    };

});