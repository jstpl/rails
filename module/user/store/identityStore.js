$(function () {

    namespace.define('bundle.module.user.store');

    bundle.module.user.store.identityStore = bundle.helper.class.extends(bundle.domain.baseLocalStorage, {

        storageKey: 'user.identity_1',

    });

});
