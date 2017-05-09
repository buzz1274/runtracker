var activityModel = require('../models/activity.js'),
    ajax = require('../helper/ajax.js');

var ActivitiesCollection = (function () {
  'use strict';

  function ActivitiesCollection() {
    this.activities = ko.observableArray();
    this.has_more_activities = ko.observable(false);;
    this.has_activities = ko.observable(false);
    this.current_page = ko.observable(1);

    this.load = function(action) {
      var that = this;

      if(action === 'next' && this.has_more_activities()) {
        this.current_page(this.current_page()+1);
      } else if(action === 'prev' && this.current_page() > 1) {
        this.current_page(this.current_page()-1);
      }

      ajax.request('api/activities',
                   {page: this.current_page}).then((response) => {

        if(response.hasOwnProperty('has_more_activities') &&
           response.hasOwnProperty('activities')) {

          that.activities.removeAll();
          that.has_more_activities(response.has_more_activities);
          that.has_activities(true);

          for (var i = 0; i < response.activities.length; i++) {
            that.activities.push(new activityModel(response.activities[i]));
          }

        }

      });

    };

    if(!this.activities.length) {
      this.load();
    }

  }

  return ActivitiesCollection;

})();

module.exports = ActivitiesCollection;
