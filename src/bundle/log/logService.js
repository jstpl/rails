$(function() {

    namespace.define('bundle.log');

    /**
     * Логер
     */
    window.bundle.log.logService = {
        config: {},

        /**
         * Печатать инфо в консоль
         * @param value
         */
        info: function (value) {
           /* if(container.env.isProd()) {
                return;
            }*/
            window.console.info(value);
        },

        /**
         * Печатать данные в консоль
         * @param value
         */
        dump: function (value) {
            /*if(container.env.isProd()) {
                return;
            }*/
            window.console.log(value);
        },
    };

});