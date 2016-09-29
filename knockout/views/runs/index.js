var Runs = (function () {
    'use strict';

    function Runs() {
        this.component = 'runs';

        ko.track(this);
    }

    return Runs;

})();

ko.components.register('runs', {
    template: require('../../templates/views/runs/index.html'),
    viewModel: {
        createViewModel: function (params) {
            'use strict';
            return params instanceof Runs ? params : ko.unwrap(params.option);
        }
    }
});

module.exports = Runs;