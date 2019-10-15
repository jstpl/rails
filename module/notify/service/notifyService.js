$(function () {

    namespace.define('bundle.module.notify.service');

    var typeEnum = bundle.module.notify.enum.notifyTypeEnum;

    bundle.module.notify.service.notifyService = {

        options: {
            //timeOut: 5000,
        },

        info: function (message, options) {
            this.show(typeEnum.info, message, options);
        },

        warning: function (message, options) {
            this.show(typeEnum.warning, message, options);
        },

        success: function (message, options) {
            this.show(typeEnum.success, message, options);
        },

        error: function (message, options) {
            this.show(typeEnum.error, message, options);
        },

        show: function (type, message, options) {
            //helper.forgeWrapper();
            options = _.defaultTo(options, this.options);
            var method = toastr[type];
            method(message, options);
        },

    };

    var helper = {
        forgeWrapper: function () {
            var wrapperElement = $('toastjs');
            if(_.isEmpty(wrapperElement.length)) {
                bundle.helper.dom.appendToBody('<div id="toastjs"></div>');
            }
        },
    };

});
