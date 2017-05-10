var activity = require('../views/activity.js');

ko.components.register('activity-view', {
  template: require('../templates/views/activity-view.html'),
  viewModel: {
    createViewModel: function (params) {
      'use strict';
      return params instanceof activity ? params : ko.unwrap(params.option);
    }
  }
});

