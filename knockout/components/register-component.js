var Register = require('../views/register.js');

ko.components.register('register', {
  template: require('../templates/register.html'),
  viewModel: {
    createViewModel: function (params) {
      'use strict';
      return params instanceof Register ? params : ko.unwrap(params.option);
    }
  }
});
