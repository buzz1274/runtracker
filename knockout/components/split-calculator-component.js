var splitCalculator = require('../views/split-calculator.js');

ko.components.register('split-calculator', {
  template: require('../templates/views/split-calculator.html'),
  viewModel: {
    createViewModel: function (params) {
      'use strict';
      return params instanceof splitCalculator ? params : ko.unwrap(params.option);
    }
  }
});
