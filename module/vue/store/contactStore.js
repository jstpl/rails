$(function () {

    var actionEnum = {
        update: 'update',
    };

    var userReducer = function(state, action) {
        if (state === undefined) {
            state = {};
        }
        if (action.type === actionEnum.update) {
            state = _.clone(action.data);
            container.event.trigger('bundle.module.vue.store.contactStore.update', state);
        }
        return state;
    };

    var store = Redux.createStore(userReducer);

    namespace.define('bundle.module.vue.store');

    bundle.module.vue.store.contactStore = {
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
