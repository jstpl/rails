space(function() {

    namespace.define('bundle.helper');

    /**
     * Работа с JQuery
     */
    window.bundle.helper.jquery = {

    };

    /**
     * Работа с JQuery UI
     */
    window.bundle.helper.jqueryUi = {

        eventTrigger: function (widget, eventType, data) {
            var names = this.getElementEventNames(widget, eventType);
            names.forEach(function(item) {
                container.event.trigger(item, data);
            });
        },

        getElementEventNames: function (widget, eventType) {
            var elementId = widget.element.attr('id');
            var names = [];
            if(!bundle.helper.php.empty(elementId)) {
                names.push(widget.widgetEventPrefix+'.'+elementId+'.'+eventType);
            }
            names.push(widget.widgetEventPrefix+'.'+eventType);
            return names;
        },

    };

});