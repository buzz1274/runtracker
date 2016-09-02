var Index = (function () {
    'use strict';

    function Index() {
        //ko.track(this);
    }

    return Index;

})();

ko.components.register('index-main', {
    template: require('../templates/index.html'),
    viewModel: {
        createViewModel: function (params) {
            'use strict';
            return params instanceof Index ? params : ko.unwrap(params.option);
        }
    }
});

module.exports = Index;