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
    this.route = ko.observable();
    this.invalid_activity = ko.observable();

    this.save = function() {
      console.log('SAVE ACTIVITY MODEL');
    };

    this.load = function(activity_id) {
      var that = this;
      this.set('unset');

      ajax.request('api/activity/' + activity_id).then((response) => {
        if(response.hasOwnProperty('activity') &&
           response.activity.hasOwnProperty('id')) {
          that.set(response.activity);
        } else {
          that.invalid_activity(true);
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
      if(!this.seconds() || !this.kilometres()) {
        return 0;
      }

      return this.time(this.seconds() / this.kilometres());

    }, this);

    this.average_pace_distance = ko.computed(function() {
      if(!this.seconds() || !this.kilometres()) {
        return 0;
      }

      return (60 / ((this.seconds() / this.kilometres()) / 60)).toFixed(3);
    }, this);

    this.set = function(activity) {
      var property = '';
      if(typeof activity === 'object') {
        for(property in activity) {
          if(activity.hasOwnProperty(property) &&
             this.hasOwnProperty(property)) {
            this[property](activity[property]);
          }
        }
      } else {
        for(property in this) {
          if(this.hasOwnProperty(property) &&
             ko.isObservable(this[property]) &&
             !ko.isComputed(this[property])) {
            this[property](false);
          }
        }
      }

    };

    this.set(activity);

  }

  return ActivityModel;

})();
