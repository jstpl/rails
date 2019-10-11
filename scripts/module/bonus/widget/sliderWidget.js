/**
 * slider widget
 */
$(function() {

    namespace.define('bundle.bonus.widget');

    /**
     * Объявления виджета для слайдера депозита бонусов
     */
    var widget = {

        sliderInstance: null,
        inputsInstance: [],

        // Здесь задается список настроек и их значений по умолчанию
        options: {
            start: [0, 0],
            step: 1,
            connect: true,
            range: {
                min: 0,
                max: 0
            },
            format: {
                // 'to' the formatted value. Receives a number.
                to: function to(value) {
                    return value.toFixed();
                },
                // 'from' the formatted value.
                // Receives a string, should return a number.
                from: function from(value) {
                    return Number(value);
                }
            }
        },

        // Функция, вызываемая при активации виджета на элементе
        _create: function() {
            this.getInputs(this.element);

            this.options.start[0] = bundle.helper.value.default(this.options.start[0], 0);
            this.options.start[1] = bundle.helper.value.default(this.options.start[1], this.options.range.max);
            if(this.options.start[1] == 0) {
                this.options.start[1] = this.options.range.max;
            }

            noUiSlider.create(this.sliderInstance, this.options);
            this.registerEventHandlers();
        },

        getInputs: function (slider) {
            var inputMin = $('input[name=bonusMin]');
            var inputMax = $('input[name=bonusMax]');
            this.inputsInstance = [inputMin, inputMax];
            this.sliderInstance = slider.find('.slider__range')[0];
        },

        registerSliderEventHandler: function () {
            // On slider drag
            var self = this;
            var callback = function (input1, values, handle) {
                var input = $(input1);
                input.val(values[handle]);
                input.change();
            };
            var callback2 = function (values, handle) {
                var inputHandlers = self.inputsInstance[handle];
                for(var k = 0; k < inputHandlers.length; k++) {
                    var input = inputHandlers[k];
                    callback(input, values, handle);
                }
            };
            this.sliderInstance.noUiSlider.on('update', callback2);
        },

        setValue: function(handle, value) {
            var range = _.values(this.options.range);
            value = _.isEmpty(value) ? range[handle] : value;
            this.sliderInstance.noUiSlider.setHandle(handle, value);
        },

        _registerInputEventHandler: function (input, handle) {
            var slider = this.sliderInstance;
            $(input).bind('change', function () {
                if(slider.noUiSlider.get()[handle] != this.value) {
                    slider.noUiSlider.setHandle(handle, this.value);
                }
            });

            // Up/down keys handle
            /*input.addEventListener('keydown', function (e) {
                var values = slider.noUiSlider.get();
                var value = Number(values[handle]); // [[handle0_down, handle0_up], [handle1_down, handle1_up]]
                var steps = slider.noUiSlider.steps(); // [down, up]
                var step = steps[handle];
                var position;
                switch (e.which) {
                    case 13: // 13 is enter
                        slider.noUiSlider.setHandle(handle, this.value);
                        break;
                    case 38: // 38 is key up
                        // Get step to go increase slider value (up)
                        position = step[1]; // false = no step is set
                        if (position === false) {
                            position = 1;
                        } // null = edge of slider
                        if (position !== null) {
                            slider.noUiSlider.setHandle(handle, value + position);
                        }
                        break;
                    case 40: // 40 is key down
                        position = step[0];
                        if (position === false) {
                            position = 1;
                        }
                        if (position !== null) {
                            slider.noUiSlider.setHandle(handle, value - position);
                        }
                        break;
                }
            });*/
        },

        registerInputEventHandler: function () {
            var inputHandlers = this.inputsInstance;
            for(var handle = 0; handle < inputHandlers.length; handle++) {
                var input = inputHandlers[handle];
                for(var k = 0; k < input.length; k++) {
                    this._registerInputEventHandler(input[k], handle);
                }
            }
        },

        registerEventHandlers: function () {
            this.registerSliderEventHandler();
            this.registerInputEventHandler();
        }

    };

    $.widget( "legalbet.sliderWidget", widget);

});