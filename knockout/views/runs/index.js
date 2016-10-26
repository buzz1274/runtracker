var Runs = (function (activity) {
    'use strict';

    function Runs(date, activity) {
        this.component = 'runs';
        this.runs = ko.observableArray();

        console.log(activity);
        console.log("DERP");

        var that = this;

        $.getJSON('http://dev.runtracker.zz50.co.uk/api/?activity=1', function(data) {
            that.runs = data;
        });

        this.toggleActivityData = function(date) {
            $(".date_"+date).each(function() {
                if($(this).data('activity') != 'All') {
                    if ($(this).is(':visible')) {
                        $(this).hide();
                    } else {
                        $(this).show();
                    }
                }
            });
        }

        ko.track(this);

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