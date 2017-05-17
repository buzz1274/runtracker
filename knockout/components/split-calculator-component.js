var SplitCalculator = require('../views/split-calculator.js');

ko.components.register('split-calculator', {
  template: require('../templates/split-calculator.html'),
  viewModel: {
    createViewModel: function (params) {
      'use strict';
      return params instanceof SplitCalculator ? params : ko.unwrap(params.option);
    }
  }
});
