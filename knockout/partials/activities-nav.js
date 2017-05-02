var page = require('page'),
    helper = require('../helper/helper.js');

var ActivitiesNav = (function () {
    'use strict';

    function ActivitiesNav() {
      this.activities = ko.observableArray();

      this.load = function() {
        var that = this;

        console.log("LOAD ACTIVITES NAV");

        $.ajax({url: '//'+window.location.hostname+'/api/activities',
                type: 'get',
                dataType: 'json',
                async: true,
                success: function(data) {
                  for(var i = 0; i < data.length; i++) {
                    that.activities.push(data[i]);
                  }
                },
                error: function() {
                  page('/error/500');
                }
        });
      };

      this.load();
      ko.track(this);

    }

    return ActivitiesNav;

  })();

ko.components.register('activities-nav', {
  template: require('../templates/partials/activities-nav.html'),
  viewModel: {
    createViewModel: function (params) {
      'use strict';
      return params instanceof ActivitiesNav ? params : ko.unwrap(params.option);
    }
  }
});

module.exports = ActivitiesNav;
