var ResetPassword = (function () {
    'use strict';

    function ResetPassword() {
        this.component = 'reset_password';

        ko.track(this);
    }

    return ResetPassword;

})();

ko.components.register('reset_password', {
    template: require('../templates/views/reset_password.html'),
    viewModel: {
        createViewModel: function (params) {
            'use strict';
            return params instanceof ResetPassword ? params : ko.unwrap(params.option);
        }
    }
});

module.exports = ResetPassword;