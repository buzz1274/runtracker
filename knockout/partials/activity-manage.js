var helper = require('../helper/helper.js'),
    activityModel = require('../models/activity.js');

var ActivityManage = (function () {
  'use strict';

  function ActivityManage() {
    this.activity = ko.observable(new activityModel());

    this.view = function(activity_id) {
      this.activity.load(activity_id);

      $('#view_activity_modal').modal('show');
      $('#view_activity_modal').on('hidden.bs.modal', function() {
        helper.overlay(false);
      });

      ////

    }

    ko.track(this);

  }

  return ActivityManage;

})();

ko.components.register('activity-manage', {
  template: require('../templates/partials/activity-manage.html'),
  viewModel: {
    createViewModel: function (params) {
      'use strict';
      return params instanceof ActivityManage ? params : ko.unwrap(params.option);
    }
  }
});

module.exports = ActivityManage;
