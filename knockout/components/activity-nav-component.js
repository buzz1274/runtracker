var activityNav = require('../views/partials/activity-nav.js');

ko.components.register('activity-nav', {
  template: require('../templates/partials/activity-nav.html'),
  viewModel: {
    createViewModel: function (params) {
      'use strict';
      return params instanceof activityNav ? params : ko.unwrap(params.option);
    }
  }
});
