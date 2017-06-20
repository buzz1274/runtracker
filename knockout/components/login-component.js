var Login = require('../views/login.js');

ko.components.register('login', {
  template: require('../templates/login.html'),
  viewModel: {
    createViewModel: function (params) {
      'use strict';
      return params instanceof Login ? params : ko.unwrap(params.option);
    }
  }
});
