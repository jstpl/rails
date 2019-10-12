$(function () {

    namespace.define('bundle.module.user.store');

    var store = {
        identity: undefined,
    };

    bundle.module.user.store.identityStore = {

        storageKey: 'user.identity_1',

        get: function () {
            if(store.identity === undefined) {
                var collectionJson = localStorage.getItem(this.storageKey);
                if(! _.isEmpty(collectionJson)) {
                    store.identity = JSON.parse(collectionJson);
                }
                if( ! _.isObject(store.identity)) {
                    store.identity = null;
                }
            }
            return store.identity;
        },

        set: function (identity) {
            store.identity = identity;
            localStorage.setItem(this.storageKey, JSON.stringify(identity));
        }

    };

});
