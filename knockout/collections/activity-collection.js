var activityModel = require('../models/activity-model.js'),
    ajax = require('../helper/ajax.js');

module.exports = (function () {
  'use strict';

  function ActivityCollection() {
    this.activities = ko.observableArray();
    this.has_more_activities = ko.observable(false);
    this.current_page = ko.observable(1);

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
      var that = this;

      ajax.request('api/activities/personal_best',
        {personal_best_id: personal_best_id}).then((response) => {

        that.parse(response);

      });

    }

    this.parse = function(response) {
      if(response.hasOwnProperty('activities')) {

        this.activities.removeAll();
        this.has_more_activities(response.has_more_activities);

        for (var i = 0; i < response.activities.data.length; i++) {
          this.activities.push(new activityModel(response.activities.data[i]));
        }

      }
    };


  }

  return ActivityCollection;

})();
