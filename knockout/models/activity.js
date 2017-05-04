var helper = require('../helper/helper.js');

var ActivityModel = (function () {
  'use strict';

  function ActivityModel(activity) {
    this.id = 1;

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

    this.save = function() {
      console.log('SAVE ACTIVITY MODEL');
    };

    this.view = function() {
      $('#view_activity_modal').modal('show');
      $('#view_activity_modal').on('hidden.bs.modal', function() {
        helper.overlay(false);
      });
    };


  }

  return ActivityModel;

})();

module.exports = ActivityModel;
