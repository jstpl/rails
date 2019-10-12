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
        all: function () {
            return {
                1: {
                    id: 1,
                    title: '111111',
                    content: '111111111111111111111',
                },
                2: {
                    id: 2,
                    title: '2222222',
                    content: '22222222222222222222222222222222222',
                },
            };
        },
        oneById: function (id) {
            var contactCollection = this.all();
            return contactCollection[id];
        },
    };

});
