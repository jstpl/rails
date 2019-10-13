$(function () {

    namespace.define('bundle.module.user.controller');

    var data = {
        entity: {},
        errors: {
            login: '',
            password: '',
        },
    };

    bundle.module.user.controller.authController = {

        data: data,
        depends: [
            //'bundle.module.user.store.authStore',
        ],
        methods: {
            auth: function (event) {
                var promise = container.authService.auth(bundle.module.user.controller.authController.data.entity);
                promise.then(function (identity) {
                    bundle.module.user.controller.authController.data.entity = {};
                    bundle.spa.router.go();
                    console.log(identity);
                }).catch(function (err) {
                    if(err.status === 422) {
                        bundle.module.user.controller.authController.data.errors = {};
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
        access: function () {
            return {
                auth: '?',
            };
        },
        created: function () {

        },
        run: function () {

        },
    };

});