space(function() {

    /**
     * Функция вывода данных в консоль
     */
    window.dump = function(value) {
        if(typeof container.log.dump === 'function') {
            container.log.dump(value);
        } else {
            console.log(value);
        }
    };
    window.d = window.dump;

});
