module.exports = (function () {
    'use strict';

    function HeaderNav(user) {
        this.user = user;

        ko.track(this);
    }

    return HeaderNav;

})();
