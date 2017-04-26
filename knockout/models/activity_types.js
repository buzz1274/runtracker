var page = require('page'),
    ActivityTypes = (function () {

  'use strict';

  function ActivityTypes() {
    this.activity_types = ko.observableArray();

    this.load = function() {
      var that = this;

      $.ajax({url: '//'+window.location.hostname+'/api/activities/type',
              type: 'get',
              dataType: 'json',
              async: true,
        success: function(data) {
          console.log(data);
          that.activity_types = data;
        },
        error: function() {
          page('/error/500');
        }
      });

    };

    this.load();
  }

  return ActivityTypes;

})();

module.exports = new ActivityTypes();
