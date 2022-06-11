var Index = require('../views/index.js');

ko.components.register('index', {
  template: require('../templates/index.html'),
  viewModel: {
    createViewModel: function (params) {
      'use strict';
      return params instanceof Index ? params : ko.unwrap(params.option);
    }
  }
});
