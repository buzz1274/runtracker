var ajax = require('../helper/ajax.js');

var ActivityModel = (function () {
  'use strict';

  function ActivityModel(activity = false) {
    this.id = 1;
    this.activity = ko.observableArray();

    this.save = function() {
      console.log('SAVE ACTIVITY MODEL');
    };

    this.load = function(activity_id) {
      var that = this;

      ajax.request('api/activity/' + activity_id).then((response) => {
        if(response.hasOwnProperty('activity')) {
          that.activity.push(response.activity[0]);
        }
      });

    };

    this.set = function(activity) {
      if(typeof activity === 'object') {
        for(var property in activity) {
          if(activity.hasOwnProperty(property)) {
            if(property === 'id') {
              this[property] = activity[property];
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
