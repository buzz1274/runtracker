var activityCollection = require('../../collections/activity-collection.js'),
    page = require('page');

module.exports = (function () {
  'use strict';

  function PersonalBestNav(user) {
    this.page = page;
    this.user = user;
    this.personal_bests = new activityCollection();

    var that = this;

    this.user.user_id.subscribe(function() {
      if(that.user.user_id()) {
        that.personal_bests.load_personal_best();
      } else if(that.activities.activities().length) {
        that.activities.activities.removeAll();
      }
    });

    ko.track(this);

  }

  return PersonalBestNav;

})();
