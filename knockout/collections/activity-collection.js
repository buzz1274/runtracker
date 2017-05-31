var activityModel = require('../models/activity-model.js'),
    ajax = require('../helper/ajax.js');

module.exports = (function () {
  'use strict';

  function ActivityCollection() {
    this.activities = ko.observableArray();
    this.has_more_activities = ko.observable(false);
    this.current_page = ko.observable(1);
    this.title = ko.observable(false);

    this.load = function(action = false) {
      var that = this;

      if (action === 'next' && this.has_more_activities()) {
        this.current_page(this.current_page() + 1);
      } else if (action === 'prev' && this.current_page() > 1) {
        this.current_page(this.current_page() - 1);
      }

      ajax.request('api/activities',
                   {page: this.current_page}).then((response) => {

        that.parse(response);

      });

    };

    this.load_personal_best = function(personal_best_id = false) {
      var that = this,
          url = 'api/activities/personal_best';

      if(personal_best_id) {
        url += '/' + personal_best_id;
      }

      ajax.request(url).then((response) => {
        that.parse(response, personal_best_id);
      });

    }

    this.parse = function(response, depth = false) {
      if(response.hasOwnProperty('activities')) {

        if(response.activities.data[0].title) {
          this.title(response.activities.data[0].title);
        } else {
          this.title(false);
        }

        this.activities.removeAll();
        this.has_more_activities(response.has_more_activities);

        var activities = false;

        if(depth) {
          activities = response.activities.data[0].data;
        } else {
          activities = response.activities.data;
        }

        for (var i = 0; i < activities.length; i++) {
          this.activities.push(new activityModel(activities[i]));
        }

      }
    };


  }

  return ActivityCollection;

})();
