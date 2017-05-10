var activityModel = require('../models/activity-model.js');

module.exports = (function () {
  'use strict';

  function Activity(component) {
    this.component = component;
    this.activity = ko.observable(new activityModel());

    ko.track(this);

  }

  return Activity;

})();
