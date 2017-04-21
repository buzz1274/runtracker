var SplitCalculator = (function () {
  'use strict';

  function SplitCalculator() {
    this.component = 'split_calculator';

    ko.track(this);
  }

  return SplitCalculator;

})();

ko.components.register('split_calculator', {
  template: require('../../templates/views/runs/split_calculator.html'),
  viewModel: {
    createViewModel: function (params) {
      'use strict';
      return params instanceof SplitCalculator ? params : ko.unwrap(params.option);
    }
  }
});

module.exports = SplitCalculator;
