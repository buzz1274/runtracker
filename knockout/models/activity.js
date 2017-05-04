var ajax = require('../helper/ajax.js');

var ActivityModel = (function () {
  'use strict';

  function ActivityModel(activity = false) {
    this.id = ko.observable();
    this.activity_date = ko.observable();
    this.metres = ko.observable();
    this.seconds = ko.observable();

    this.save = function() {
      console.log('SAVE ACTIVITY MODEL');
    };

    this.load = function(activity_id) {
      var that = this;

      ajax.request('api/activity/' + activity_id).then((response) => {
        if(response.hasOwnProperty('activity')) {
          that.set(response.activity[0]);
        }
      });

    };

    this.set = function(activity) {
      if(typeof activity === 'object') {
        for(var property in activity) {
          if(activity.hasOwnProperty(property)) {
            if(property === 'activity_date' || property === 'id') {
              this[property](activity[property]);
            } else {
              this[property] = ko.observable(activity[property]);
            }
          }
        }
      }
    }

    this.set(activity);

  }

  return ActivityModel;

})();

module.exports = ActivityModel;
