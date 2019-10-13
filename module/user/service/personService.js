$(function () {

    namespace.define('bundle.module.user.service');

    bundle.module.user.service.personService = {

        oneSelf: function () {
            var promise = container.restClient.get('person');
            promise.then(function (entity) {
                container.event.trigger('user.person.self', entity);
            });
            return promise;
        },

    };

});
