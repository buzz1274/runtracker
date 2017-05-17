var page = require('page'),
    helper = require('../../helper/helper.js'),
    ActivityTypes = require('../../models/activity_types.js'),
    PersonalBestsNav = (function () {
      'use strict';

      function PersonalBestsNav() {
          this.activity_types = ActivityTypes.activity_types;
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

          this.filterActivities = function(id, parent_id, pb) {

            //ActivityTypes
            //console.log(id);
            //console.log(parent_id);
            //console.log(pb);

            //pb.activity_ids = id;
            //console.log(this.personal_bests[pb.id]);
            //console.log(this.personal_bests);

            console.log(this.personal_bests[pb]);

            this.personal_bests[pb].activity_ids = id;

            return true;

          }

          this.savePersonalBests = function() {
              console.log('SAVE PERSONAL BESTS');
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

          this.loadPersonalBests();

          ko.track(this);

      }

      return PersonalBestsNav;

})();

ko.components.register('personal-bests-nav', {
    template: require('../../templates/partials/personal_bests_nav.html'),
    viewModel: {
        createViewModel: function (params) {
            'use strict';
            return params instanceof PersonalBestsNav ? params : ko.unwrap(params.option);
        }
    }
});

module.exports = PersonalBestsNav;
