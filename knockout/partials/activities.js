var Activities = (function () {
    'use strict';

    function Activities() {
        ko.track(this);
    }

    return Activities;

})();

ko.components.register('activities-nav', {
    template: require('../templates/partials/activities.html'),
    viewModel: {
        createViewModel: function (params) {
            'use strict';
            return params instanceof Activities ? params : ko.unwrap(params.option);
        }
    }
});

module.exports = Activities;