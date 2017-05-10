var activityCollection = require('../collections/activity-collection.js'),
    page = require('page');

var ActivitiesNav = (function () {
  'use strict';

  function ActivitiesNav() {
    this.activities = new activityCollection();
    this.page = page;

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
