var HeaderNav = require('../views/partials/header-nav.js');

ko.components.register('header-nav', {
  template: require('../templates/partials/header-nav.html'),
  viewModel: {
    createViewModel: function (params) {
      'use strict';
      return params instanceof HeaderNav ? params : ko.unwrap(params.option);
    }
  }
});
