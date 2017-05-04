var helper = require('../helper/helper.js'),
    activityCollection = require('../collections/activity-collection.js');

var ActivitiesNav = (function () {
    'use strict';

    function ActivitiesNav() {
      this.activities = new activityCollection();
      this.activity = ko.observableArray();

      this.viewActivity = function(id) {
        helper.overlay(true);

        this.activity.push(this.activities.find(id));

        /*
        console.log("VIEW ACTIVITY");
        console.log(id);

        console.log(this.activity);
        */////

        $('#view_activity_modal').modal('show');
        $('#view_activity_modal').on('hidden.bs.modal', function() {
          helper.overlay(false);
        });

      }

      ko.track(this);

    }

    return ActivitiesNav;

  })();

ko.components.register('activities-view', {
  template: require('../templates/partials/activities-view.html'),
  viewModel: ActivitiesNav
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
