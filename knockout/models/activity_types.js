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
          for(var i = 0; i < data.length; i++) {
            that.activity_types.push(data[i]);
          }

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
