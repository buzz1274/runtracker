var activityCollection = require('../collections/activity-collection.js');

module.exports = (function () {
    'use strict';

  function PersonalBests() {
      this.component = 'personal-bests';
      this.activities = new activityCollection();

      ko.track(this);

  }

  return PersonalBests;

})();
