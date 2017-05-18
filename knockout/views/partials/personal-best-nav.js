var page = require('page'),
    helper = require('../../helper/helper.js'),
    ActivityTypes = require('../../models/activity_types.js');

module.exports = (function () {
      'use strict';

      function PersonalBestsNav() {
          this.page = page;
          this.activity_types = ActivityTypes.activity_types;
          this.personal_bests = ko.observableArray();

          this.loadPersonalBests = function() {
              var that = this;

              $.ajax({url: '//'+window.location.hostname+'/api/activities/personal_bests',
                  type: 'get',
                  dataType: 'json',
                  async: true,
                  success: function(data) {
                      that.personal_bests = data;
                  },
                  error: function() {
                      page('/error/500');
                  }
              });
          }

          this.loadPersonalBests();

          ko.track(this);

      }

      return PersonalBestsNav;

})();
