var activityTypeCollection = require('../collections/activity-type-collection.js');

module.exports = (function () {
  'use strict';

  function ActivityType() {
    this.component = 'activity-type';
    this.activity_types = new activityTypeCollection();

    console.log(this.activity_types);

    ko.track(this);

  }

  return ActivityType;

})();
