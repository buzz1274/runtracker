var Activity = require('../views/activity.js');

ko.components.register('activity-view', {
  template: require('../templates/activity-view.html'),
  viewModel: {
    createViewModel: function (params) {
      'use strict';
      return params instanceof Activity ? params : ko.unwrap(params.option);
    }
  }
});
