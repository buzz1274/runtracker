var helper = require('../helper/helper.js'),
    activitiesModel = require('../models/activities-model.js'),
    activityModel = require('../models/activity.js'),
    ajax = require('../helper/ajax.js');

var ActivitiesNav = (function () {
    'use strict';

    function ActivitiesNav() {
      this.activities = new activitiesModel();
      this.current_page = 1;

      this.viewActivity = function(id) {
        helper.overlay(true);

        //this.load(id);

        $('#view_activity_modal').modal('show');
        $('#view_activity_modal').on('hidden.bs.modal', function() {
          helper.overlay(false);
        });

      }

      console.log('DERP');
      console.log(this.activities);

      ko.track(this);

    }

    return ActivitiesNav;

  })();

ko.components.register('activities-view', {
  template: require('../templates/partials/activities-view.html'),
});

ko.components.register('activities-nav', {
  template: require('../templates/partials/activities-nav.html'),
  template_activities_view: require('../templates/partials/activities-view.html'),
  viewModel: {
    createViewModel: function (params) {
      'use strict';
      return params instanceof ActivitiesNav ? params : ko.unwrap(params.option);
    }
  }
});

module.exports = ActivitiesNav;
