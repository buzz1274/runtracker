var Runs = (function () {
    'use strict';

    function Runs() {
        this.component = 'runs';
        this.runs = ko.observableArray();
        this.runs = this.loadData();

        ko.track(this);

    }

    Runs.prototype.loadData = function() {
        var activities = null;

        $.getJSON('http://dev.runtracker.zz50.co.uk/api/', function(data) {
            activities = data;
        });

        return activities;

    }

    Runs.prototype.toggleActivityData = function() {
        $('.activity_2015').show();
    }

    Runs.prototype.toggleActivityData = function() {
        $('.activity_2015').show();
    }

    return Runs;

})();

ko.components.register('runs', {
    template: require('../../templates/views/runs/index.html'),
    viewModel: {
        createViewModel: function (params) {
            'use strict';

            return params instanceof Runs ? params : params.option;
        }
    }
});

module.exports = Runs;