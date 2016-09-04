var Register = (function () {
    'use strict';

    function Register() {
        this.component = 'register';

        ko.track(this);
    }

    return Register;

})();

ko.components.register('register', {
    template: require('../templates/views/register.html'),
    viewModel: {
        createViewModel: function (params) {
            'use strict';
            return params instanceof Register ? params : ko.unwrap(params.option);
        }
    }
});

module.exports = Register;