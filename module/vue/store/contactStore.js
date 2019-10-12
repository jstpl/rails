$(function () {

    namespace.define('bundle.module.vue.store');

    bundle.module.vue.store.contactStore = {

        collection: [
            {
                id: 1,
                title: '111111',
                content: '111111111111111111111',
            },
            {
                id: 2,
                title: '2222222',
                content: '22222222222222222222222222222222222',
            },
        ],

        deleteById: function (id) {
            var entity = this.oneById(id);
            var index = this.collection.indexOf(entity);
            delete this.collection[index];
        },
        delete: function (entity) {
            var index = this.collection.indexOf(entity);
            delete this.collection[index];
        },
        create: function (contactEntity) {
            var lastEntity = _.maxBy(this.collection, 'id');
            if(_.isEmpty(contactEntity.id)) {
                contactEntity.id = lastEntity.id + 1;
            }
            this.collection.push(contactEntity) ;
        },
        update: function (contactEntity) {
            var entity = this.oneById(contactEntity.id);
            var index = this.collection.indexOf(entity);
            entity = _.assign(entity, contactEntity);
            this.collection[index] = entity;
        },
        one: function (query) {
            return _.find(this.collection, query);
        },
        all: function (query) {
            if(query) {
                return _.filter(this.collection, query);
            } else {
                return this.collection;
            }
        },
        oneById: function (id) {
            id = _.toInteger(id);
            return _.find(this.collection, { 'id': id });
        },
    };

});
