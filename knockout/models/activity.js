var ajax = require('../helper/ajax.js'),
    Moment = require('moment');

module.exports = (function () {
  'use strict';

  function ActivityModel(activity = false) {
    this.id = ko.observable();
    this.activity_date = ko.observable();
    this.metres = ko.observable();
    this.seconds = ko.observable();
    this.parent_activity_type = ko.observable();
    this.activity_type = ko.observable();
    this.route = ko.observable();//////

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

    this.display_time = function() {
      var hours = parseInt(this.seconds() / 3600),
          minutes = parseInt((this.seconds() % 3600) / 60),
          seconds = parseInt((this.seconds() % 3600) % 60);

      return (hours < 9 ? '0' + hours : hours) + ':' +
             (minutes < 9 ? '0' + minutes : minutes) + ':' +
             (seconds < 9 ? '0' + seconds : seconds);
    }

    this.display_activity = function() {
      return this.parent_activity_type() + ' »» ' + this.activity_type();
    }

    this.display_distance = function() {
      return (this.metres() / 1000).toFixed(3);
    }

    this.display_date = function() {
      return Moment(this.activity_date()).format('Do MMMM, YYYY');
    }

    this.set = function(activity) {
      if(typeof activity === 'object') {
        for(var property in activity) {
          if(activity.hasOwnProperty(property) &&
             this.hasOwnProperty(property)) {
            this[property](activity[property]);
          }
        }
      }
    }

    this.set(activity);

  }

  return ActivityModel;

})();
