var Activity = require('../views/activity.js');

ko.components.register('activity-add', {
  template: require('../templates/activity-add.html'),
  viewModel: {
    createViewModel: function (params) {
      'use strict';
      return params instanceof Activity ? params : ko.unwrap(params.option);
    }
  }
});

