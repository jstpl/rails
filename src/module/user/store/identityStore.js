space('bundle.module.user.store.identityStore', function() {

    namespace.define('bundle.module.user.store');

    return bundle.helper.class.extends(bundle.domain.baseLocalStorage, {

        storageKey: 'user.identity_1',

    });

});
