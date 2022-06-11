var ResetPassword = require('../views/reset-password.js');

ko.components.register('reset_password', {
  template: require('../templates/reset-password.html'),
  viewModel: {
    createViewModel: function (params) {
      'use strict';
      return params instanceof ResetPassword ? params : ko.unwrap(params.option);
    }
  }
});
