var activityCollection = require('../../collections/activity-collection.js'),
    page = require('page');

module.exports = (function () {
  'use strict';

  function ActivityNav(user) {
    this.activities = new activityCollection();
    this.page = page;
    this.user = user;

    var that = this;

    this.user.user_id.subscribe(function() {
      if(that.user.user_id()) {
        that.activities.load(that.user.user_id());
      } else if(that.activities.activities().length) {
        that.activities.activities.removeAll();
      }
    });

    ko.track(this);

  }

  return ActivityNav;

})();
