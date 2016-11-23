var PersonalBests = (function () {
    'use strict';

    function PersonalBests() {
        ko.track(this);
    }

    return PersonalBests;

})();

ko.components.register('personal-bests-nav', {
    template: require('../templates/partials/personal_bests.html'),
    viewModel: {
        createViewModel: function (params) {
            'use strict';
            return params instanceof PersonalBests ? params : ko.unwrap(params.option);
        }
    }
});

module.exports = PersonalBests;