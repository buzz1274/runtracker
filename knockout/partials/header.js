var Header = (function () {
    'use strict';

    function Header(user) {
        this.user = user;

        ko.track(this);
    }

    return Header;

})();

ko.components.register('header-nav', {
    template: require('../templates/partials/header-nav.html'),
    viewModel: {
        createViewModel: function (params) {
            'use strict';
            return params instanceof Header ? params : ko.unwrap(params.option);
        }
    }
});

module.exports = Header;