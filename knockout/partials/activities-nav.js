var page = require('page');

var ActivitiesNav = (function () {
    'use strict';

    function ActivitiesNav() {
      this.activities = false;
      this.current_page = 1;
      this.has_more_pages = false;

      this.load = function(action) {
        var that = this;

        if(action === 'prev' && this.current_page > 1) {
          this.current_page--;
        }else if(action === 'next' && this.has_more_pages) {
          this.current_page++;
        }

        this.activities = false;

        $.ajax({url: '//'+window.location.hostname+'/api/activities',
                data: {page: this.current_page},
                type: 'get',
                dataType: 'json',
                async: true,
                success: function(data) {
                  if(data.hasOwnProperty('has_more_pages') &&
                     data.hasOwnProperty('activities')) {

                    that.activities = ko.observableArray();
                    that.has_more_pages = data.has_more_pages;

                    for(var i = 0; i < data.activities.length; i++) {
                      that.activities.push(data.activities[i]);
                    }

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
