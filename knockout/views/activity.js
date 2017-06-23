var activityModel = require('../models/activity-model.js'),
    activityTypeModel = require('../models/activity-type-model.js');

module.exports = (function () {
  'use strict';

  function Activity(component) {
    this.component = component;
    this.activity = ko.observable(new activityModel());
    this.activity_types = ko.observable(new activityTypeModel());

    ko.track(this);

  }

  return Activity;

})();
