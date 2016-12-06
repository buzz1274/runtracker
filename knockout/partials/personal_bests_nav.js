var page = require('page'),
    helper = require('../helper/helper.js'),
    helper = new helper();

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

        this.savePersonalBests = function() {

        }

        this.managePersonalBests = function() {
            helper.overlay(true);

            $('#personal_bests_management_modal').modal('show');
            $('#personal_bests_management_modal').on('hidden.bs.modal', function() {
                helper.overlay(false);
            });
        }

        this.redirectToPersonalBest = function(id) {
            page('/activities/personal_best/' + id);
        }

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