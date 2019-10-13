$(function () {

    namespace.define('bundle.module.notify.service');

    var typeEnum = bundle.module.notify.enum.notifyTypeEnum;

    bundle.module.notify.service.notifyService = {

        options: {
            //timeOut: 5000,
        },

        info: function (message, options) {
            options = _.defaultTo(options, this.options);
            toastr.info(message, options);
        },

        warning: function (message, options) {
            options = _.defaultTo(options, this.options);
            toastr.warning(message, options);
        },

        success: function (message, options) {
            options = _.defaultTo(options, this.options);
            toastr.success(message, options);
        },

        error: function (message, options) {
            options = _.defaultTo(options, this.options);
            toastr.error(message, options);
        },

    };

});
