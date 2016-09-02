var Header = (function () {
    'use strict';

    function Header() {
        //ko.track(this);
    }

    return Header;

})();

ko.components.register('header-nav', {
    template: require('../templates/header-nav.html'),
    viewModel: {
        createViewModel: function (params) {
            'use strict';
            return params instanceof Header ? params : ko.unwrap(params.option);
        }
    }
});

module.exports = Header;