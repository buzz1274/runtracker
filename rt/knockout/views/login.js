var Login = (function () {
    'use strict';

    function Login() {
        this.component = 'login';
        ko.track(this);
    }

    return Login;

})();

ko.components.register('login', {
    template: require('../templates/views/login.html'),
    viewModel: {
        createViewModel: function (params) {
            'use strict';
            return params instanceof Login ? params : ko.unwrap(params.option);
        }
    }
});

module.exports = Login;