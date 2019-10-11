console.log('------------------------------');

$(function () {

    namespace.define('bundle.contact.enum');

    var actionEnum = {
        update: 'update',
    };

    var userReducer = function(state, action) {
        if (state === undefined) {
            state = {};
        }
        if (action.type === actionEnum.update) {
            state = _.clone(action.data);
            container.event.trigger('bundle.contact.store.contact.update', state);
        }
        return state;
    };

    var store = Redux.createStore(userReducer);

    namespace.define('bundle.contact.store');

    bundle.contact.store.contact = {
        update: function (contactEntity) {
            store.dispatch({
                type: actionEnum.update,
                data: contactEntity,
            });
        },
        one: function () {
            return store.getState();
        },
    };

});

$(function () {

    namespace.define('bundle.module.contact.controller');

    bundle.module.contact.view.script = {

        registerEventHandlers: function () {
            container.event.registerHandler('bundle.contact.store.contact.update', function (contactEntity) {
                $('#title').html(contactEntity.title);
                $('#content').html(contactEntity.content);
            });
        },

        run: function (request) {
            this.registerEventHandlers();

            var contactEntity = {};
            contactEntity.title = 'title ' + request.query.id;
            contactEntity.content = 'content ' + request.query.id;
            bundle.contact.store.contact.update(contactEntity);

            var contactEntity222 = bundle.contact.store.contact.one();
            console.log('STATE:', contactEntity222);

        },

    };

});