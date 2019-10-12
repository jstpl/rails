$(function () {

    namespace.define('bundle.module.user.controller');

    bundle.module.user.controller.authController = {

        data: {
            entity: {},
            errors: {},
        },
        depends: [
            'bundle.module.user.store.authStore',
        ],
        methods: {
            auth: function (event) {
                var promise = bundle.module.user.store.authStore.auth(bundle.module.user.controller.authController.data.entity);
                promise.then(function (identity) {
                    bundle.spa.router.go();
                    console.log(identity);
                }).catch(function (err) {
                    if(err.status === 422) {
                        for(var k in err.responseJSON) {
                            var fieldName = err.responseJSON[k].field;
                            var fieldMessage = err.responseJSON[k].message;
                            bundle.module.user.controller.authController.data.errors[fieldName] = fieldMessage;
                            //console.log([fieldName, fieldMessage]);
                        }
                        console.log(bundle.module.user.controller.authController.data.errors);
                    }
                });
            },
        },
        created: function () {

        },
    };

});