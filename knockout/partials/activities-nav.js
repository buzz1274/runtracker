var helper = require('../helper/helper.js'),
    activityModel = require('../models/activity.js'),
    activityCollection = require('../collections/activity-collection.js');

var ActivitiesNav = (function () {
    'use strict';

    function ActivitiesNav() {
      this.page = require('page');
      this.activities = new activityCollection();
      this.activity = ko.observableArray();

      this.activity.push(new activityModel());

      this.viewActivity = function(id) {
        helper.overlay(true);

        //var test = this.activities.find(id);

        //this.activity.push(this.activities.find(id));

        console.log("VIEW ACTIVITY");
        console.log(id);

        //

        console.log(this.activity);


        $('#view_activity_modal').modal('show');
        $('#view_activity_modal').on('hidden.bs.modal', function() {
          helper.overlay(false);
        });

      }

      this.test = function() {
        return this.activity;
      }

      ko.track(this);

    }

    return ActivitiesNav;

  })();

ko.components.register('activities-nav', {
  template: require('../templates/partials/activities-nav.html'),
  viewModel: {
    createViewModel: function (params) {
      'use strict';
      return params instanceof ActivitiesNav ? params : ko.unwrap(params.option);
    }
  }
});

module.exports = ActivitiesNav;
