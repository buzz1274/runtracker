var Runs = (function () {
    'use strict';

    function Runs() {
        this.component = 'runs';
        this.runs = ko.observableArray();
        this.year = false;
        this.month = false;

        ko.track(this);

    }

    Runs.prototype.toggleActivityData = function(date) {
        if($("#toggle_date_"+date).hasClass('glyphicon-menu-up')) {
            $("#toggle_date_"+date).removeClass('glyphicon-menu-up');
            $("#toggle_date_"+date).addClass('glyphicon-menu-down');
        } else {
            $("#toggle_date_"+date).removeClass('glyphicon-menu-down');
            $("#toggle_date_"+date).addClass('glyphicon-menu-up');
        }
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

        date = date ? date.split("-") : false;
        this.year = date[0] ? date[0] : '';
        this.month = this.year && date[1] ? date[1] : '';

        console.log(this.year);
        console.log(this.month);

        return $.ajax({url: 'http://dev.runtracker.zz50.co.uk/api/',
            type: 'get',
            dataType: 'json',
            async: true,
            data: {year: that.year,
                   month: that.month,
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