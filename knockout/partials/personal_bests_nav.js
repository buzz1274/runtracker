var page = require('page');

var PersonalBestsNav = (function () {
    'use strict';

    function PersonalBestsNav() {
        this.personal_bests = ko.observableArray();

        this.loadPersonalBests = function() {
            var that = this;

            $.ajax({url: '//'+window.location.hostname+'/api/activities/personal_bests',
                type: 'get',
                dataType: 'json',
                async: true,
                success: function(data) {
                    that.personal_bests = data;
                },
                error: function() {
                    page('/error/500');
                }
            });
        }

        this.loadPersonalBests();

        ko.track(this);
    }

    return PersonalBestsNav;

})();

ko.components.register('personal-bests-nav', {
    template: require('../templates/partials/personal_bests_nav.html'),
    viewModel: {
        createViewModel: function (params) {
            'use strict';
            return params instanceof PersonalBestsNav ? params : ko.unwrap(params.option);
        }
    }
});

module.exports = PersonalBestsNav;