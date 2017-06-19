var Error = require('../views/error.js');

ko.components.register('error', {
  template: require('../templates/error.html'),
  viewModel: {
    createViewModel: function (params) {
      'use strict';
      return params instanceof Error ? params : ko.unwrap(params.option);
    }
  }
});
