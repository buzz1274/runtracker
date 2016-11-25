var page = require('page');

var PersonalBests = (function () {
    'use strict';

    function PersonalBests() {
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