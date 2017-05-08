var activityModel = require('../../models/activity.js');

var ActivityManage = (function () {
  'use strict';

  function ActivityManage() {
    this.component = 'activity-manage';
    this.activity = ko.observable(new activityModel());

    this.load = function(activity_id) {
      this.activity.load(activity_id);
    }

    this.edit = function() {

    }

    this.delete = function() {

    }

    this.add = function() {

    }

    ko.track(this);

  }

  return ActivityManage;

})();

ko.components.register('activity-manage', {
  template: require('../../templates/views/runs/activity-manage.html'),
  viewModel: {
    createViewModel: function (params) {
      'use strict';
      return params instanceof ActivityManage ? params : ko.unwrap(params.option);
    }
  }
});

module.exports = ActivityManage;
