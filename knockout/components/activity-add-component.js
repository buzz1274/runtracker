var activity = require('../views/activity.js');

ko.components.register('activity-add', {
  template: require('../templates/views/activity-add.html'),
  viewModel: {
    createViewModel: function (params) {
      'use strict';
      return params instanceof activity ? params : ko.unwrap(params.option);
    }
  }
});

