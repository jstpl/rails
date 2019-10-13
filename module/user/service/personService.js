$(function () {

    namespace.define('bundle.module.user.service');

    //var identityStore = bundle.module.user.store.identityStore;

    bundle.module.user.service.personService = {

        oneSelf: function () {
            var request = {
                url: "person",
                //type: "GET",
            };
            var promise = container.restClient.sendRequestPromise(request);
            promise.then(function (entity) {
                //identityStore.set(identity);
                container.event.trigger('user.person.self', entity);
            });
            return promise;
        },

    };

});
