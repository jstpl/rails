/**
 * Дайвера для работы с input-элементами
 */

space(function() {

    namespace.define('bundle.widget.form.interface');

    /**
     * Интерфейс драйвера
     */
    window.bundle.widget.form.interface.driver = {
        removeValue: function (formInstance, name) {},
        getValue: function (formInstance, name) {},
        setValue: function (formInstance, name, value) {},
    };

});

space(function() {

    namespace.define('bundle.widget.form.helper');

    /**
     * Хэлпер
     */
    window.bundle.widget.form.helper.element = {

        getByName: function (formInstance, name) {
            return $(formInstance).find('input[name='+name+']');
        },

        isArrayByName: function (formInstance, name) {
            var input = bundle.widget.form.helper.element.getByName(formInstance, name);
            return input.length > 1;
        },

        setCheckedValue: function (input, value) {
            if(value == 1) {
                input.attr("checked","checked");
            } else {
                input.removeAttr("checked");
            }
        },

    };

});

space(function() {

    namespace.define('bundle.widget.form.input');

    /**
     * Checkbox-элемент
     */
    window.bundle.widget.form.input.checkbox = {

        removeValue: function (formInstance, name) {
            this.setValue(formInstance, name, []);
        },

        setValue: function (formInstance, name, value) {
            var isArray = bundle.widget.form.helper.element.isArrayByName(formInstance, name);
            if(isArray) {
                this._setListValue(formInstance, name, value);
            } else {
                this._setOneValue(formInstance, name, value);
            }
        },

        getValue: function (formInstance, name) {
            var isArray = bundle.widget.form.helper.element.isArrayByName(formInstance, name);
            var value = null;
            if(isArray) {
                value = this._getListValue(formInstance, name);
            } else {
                value = this._getOneValue(formInstance, name);
            }
            return value;
        },

        _setOneValue: function (formInstance, name, value) {
            var input = bundle.widget.form.helper.element.getByName(formInstance, name);
            bundle.widget.form.helper.element.setCheckedValue(input, value);
        },

        _setListValue: function (formInstance, name, value) {
            $(formInstance).find('input[name=' + name + ']').each(function () {
                var input = $(this);
                var key = input.attr('value');
                //var val = $.inArray(key, value) != -1 ? 1 : 0;
                //var val = _.findIndex(value, key);
                var val = bundle.helper.php.in_array(key, value);
                bundle.widget.form.helper.element.setCheckedValue(input, val);
            });
        },

        _getOneValue: function (formInstance, name) {
            var input = bundle.widget.form.helper.element.getByName(formInstance, name);
            return input.is(":checked") ? 1 : 0;
        },

        _getListValue: function (formInstance, name) {
            var checked = [];
            $(formInstance).find('input[name=' + name + ']:checked').each(function () {
                checked.push($(this).attr('value'));
            });
            return checked;
        },

    };

});

space(function() {

    namespace.define('bundle.widget.form.input');

    /**
     * Radio-элемент
     */
    window.bundle.widget.form.input.radio = {

        removeValue: function (formInstance, name) {
            this.setValue(formInstance, name, undefined);
        },

        getValue: function (formInstance, name) {
            var value = null;
            $(formInstance).find('input[name=' + name + ']:checked').each(function () {
                if ($(this).is(":checked")) {
                    value = $(this).attr('value');
                }
            });
            return value;
        },

        setValue: function (formInstance, name, value) {
            var input = $(formInstance).find('input[name=' + name + ']');
            input.each(function () {
                var input = $(this);
                var inputValue = input.val();
                var isChecked = inputValue == value;
                bundle.widget.form.helper.element.setCheckedValue(input, isChecked);
            });
        },

    };

});

space(function() {

    namespace.define('bundle.widget.form.input');

    /**
     * Text-элемент
     */
    window.bundle.widget.form.input.text = {

        removeValue: function (formInstance, name) {
            this.setValue(formInstance, name, '');
        },

        getValue: function (formInstance, name) {
            var input = bundle.widget.form.helper.element.getByName(formInstance, name);
            return input.val();
        },

        setValue: function (formInstance, name, value) {
            var input = bundle.widget.form.helper.element.getByName(formInstance, name);
            input.val(value);
        },

    };

    /**
     * Hidden-элемент
     */
    window.bundle.widget.form.input.hidden = window.bundle.widget.form.input.text;

});

space(function() {

    namespace.define('bundle.widget.form.input');

    /**
     * Number-элемент
     */
    window.bundle.widget.form.input.number = {

        removeValue: function (formInstance, name) {
            this.setValue(formInstance, name, 0);
        },

        getValue: function (formInstance, name) {
            var input = bundle.widget.form.helper.element.getByName(formInstance, name);
            var value = input.val();
            return Number(value);
        },

        setValue: function (formInstance, name, value) {
            value = parseInt(value);
            var input = bundle.widget.form.helper.element.getByName(formInstance, name);
            input.val(value);
        },

    };

});
