var Runs = (function () {
    'use strict';

    function Runs() {
        this.component = 'runs';
        this.runs = ko.observableArray();

        ko.track(this);

    }

    Runs.prototype.toggleActivityData = function(date) {
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

    Runs.prototype.loadData = function(activity_id, date) {
        var that = this;

        return $.ajax({url: 'http://dev.runtracker.zz50.co.uk/api/',
            type: 'get',
            dataType: 'json',
            async: true,
            data: {date: date,
                   activity_id: activity_id},
            success: function(data) {
                that.runs = data;
            }
        });
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