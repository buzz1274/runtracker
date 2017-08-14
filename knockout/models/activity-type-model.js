var ajax = require('../helper/ajax.js');

module.exports = (function () {
  'use strict';

  function ActivityTypeModel() {
    this.activity_types = ko.observableArray();

    this.load = function() {
      //var that = this;

      ajax.request('api/activities/type', {}, this);

      /*
      .then((response) => {
        console.log(response);
        for(var i = 0; i < response.length; i++) {
          that.activity_types.push(response[i]);
        }
      });
      */

      /*
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
          //page('/error/500');
        }
      });
      */

    };

    this.load();

  }

  return ActivityTypeModel;

})();
