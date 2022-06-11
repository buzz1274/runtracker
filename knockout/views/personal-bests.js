var activityCollection = require('../collections/activity-collection.js'),
    page = require('page');

module.exports = (function () {
    'use strict';

  function PersonalBests() {
      this.component = 'personal-bests';
      this.activities = new activityCollection();
      this.page = page;

      ko.track(this);

  }

  return PersonalBests;

})();
