var PersonalBests = require('../views/personal-bests.js');

ko.components.register('personal-bests', {
  template: require('../templates/personal-bests.html'),
  viewModel: {
    createViewModel: function (params) {
      'use strict';

      return params instanceof PersonalBests ? params : params.option;
    }
  }
});
