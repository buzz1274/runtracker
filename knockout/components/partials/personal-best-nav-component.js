var PersonalBestNav = require('../../views/partials/personal-best-nav.js');

ko.components.register('personal-best-nav', {
  template: require('../../templates/partials/personal-best-nav.html'),
  viewModel: {
    createViewModel: function (params) {
      'use strict';
      return params instanceof PersonalBestNav ? params : ko.unwrap(params.option);
    }
  }
});
