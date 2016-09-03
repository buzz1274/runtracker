var Index = (function () {
    'use strict';

    function Index() {
        this.component = 'index';
        ko.track(this);
    }

    return Index;

})();

ko.components.register('index', {
    template: require('../templates/views/index.html'),
    viewModel: {
        createViewModel: function (params) {
            'use strict';
            return params instanceof Index ? params : ko.unwrap(params.option);
        }
    }
});

module.exports = Index;