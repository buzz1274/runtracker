var Runs = (function () {
    'use strict';

    function Runs() {
        this.component = 'runs';
        this.runs = ko.observableArray();;

        var that = this;

        $.getJSON('http://dev.runtracker.zz50.co.uk/api/', function(data) {
            that.runs = data;
        });

        console.log(that.runs);

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