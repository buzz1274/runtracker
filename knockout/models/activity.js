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

    this.kilometres = function() {
      if(!this.metres()) {
        return 0;
      }

      return (this.metres() / 1000).toFixed(3);

    };

    this.date = function(format = 'Do MMMM, YYYY') {
      if(!this.activity_date()) {
        return '-';
      }

      return Moment(this.activity_date()).format(format);

    };

    this.time = function(seconds = this.seconds()) {
      if(!seconds) {
        return 0;
      }

      var hours = parseInt(seconds / 3600),
          minutes = parseInt((seconds % 3600) / 60),
          seconds = parseInt((seconds % 3600) % 60);

      return (hours <= 9 ? '0' + hours : hours) + ':' +
             (minutes <= 9 ? '0' + minutes : minutes) + ':' +
             (seconds <= 9 ? '0' + seconds : seconds);
    };

    this.average_pace_time = ko.computed(function() {
      return this.time(this.seconds() / this.kilometres());
    }, this);

    this.average_pace_distance = ko.computed(function() {
      return (60 / ((this.seconds() / this.kilometres()) / 60)).toFixed(3);
    }, this);

    this.set = function(activity) {
      if(typeof activity === 'object') {
        for(var property in activity) {
          if(activity.hasOwnProperty(property) &&
             this.hasOwnProperty(property)) {
            this[property](activity[property]);
          }
        }
      }
    };

    this.set(activity);

  }

  return ActivityModel;

})();
