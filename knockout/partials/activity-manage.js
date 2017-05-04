var helper = require('../helper/helper.js'),
    activityModel = require('../models/activity.js');

var ActivitiesManage = (function () {
  'use strict';

  function ActivitiesManage() {

    this.view = function(activity_id) {
      console.log("VIEW ACTIVITY  ActivitiesManage  " + activity_id);

      $('#view_activity_modal').modal('show');
      $('#view_activity_modal').on('hidden.bs.modal', function() {
        helper.overlay(false);
      });


    }

    ko.track(this);

  }

  return ActivitiesManage;

})();

ko.components.register('activities-manage', {
  template: require('../templates/partials/activities-manage.html'),
  viewModel: {
    createViewModel: function (params) {
      'use strict';
      return params instanceof ActivitiesManage ? params : ko.unwrap(params.option);
    }
  }
});

module.exports = ActivitiesManage;
