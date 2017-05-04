var ActivityModel = (function () {
  'use strict';

  function ActivityModel(activity) {
    if(typeof activity === 'object') {
      for(var property in activity) {
        if(activity.hasOwnProperty(property)) {
          if(property === 'id') {
            this[property] =activity[property];
          } else {
            this[property] = ko.observable(activity[property]);
          }
        }
      }
    }

    this.save = function() {
      console.log('SAVE ACTIVITY MODEL');
    };


  }

  return ActivityModel;

})();

module.exports = ActivityModel;
