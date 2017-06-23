var ActivityType = require('../views/activity-type.js');

ko.components.register('activity-type', {
  template: require('../templates/activity-type.html'),
  viewModel: {
    createViewModel: function (params) {
      'use strict';
      return params instanceof ActivityType ? params : ko.unwrap(params.option);
    }
  }
});
