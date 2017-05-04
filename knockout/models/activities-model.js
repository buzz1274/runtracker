var activityModel = require('../models/activity.js'),
    ajax = require('../helper/ajax.js');

var ActivitiesModel = (function () {
  'use strict';

  function ActivitiesModel() {
    this.activities = ko.observableArray();
    this.has_more_activities = false;
    this.has_activities = ko.observable(false);

    this.load = function (page) {
      var that = this;

      ajax.request('api/activities', {page: page}).then((response) => {

        if(response.hasOwnProperty('has_more_activities') &&
           response.hasOwnProperty('activities')) {

          that.activities.removeAll();
          that.has_more_activities = response.has_more_activities;
          that.has_activities(true);

          for (var i = 0; i < response.activities.length; i++) {
            that.activities.push(new activityModel(response.activities[i]));
          }

        }

      });

    };

    this.find = function(key, value) {
      console.log(key + ' ' + value);
    }

    this.test = function() {
      return true;
    }

    if(!this.activities.length) {
      this.load(1);
    }

  }

  return ActivitiesModel;

})();

module.exports = ActivitiesModel;
