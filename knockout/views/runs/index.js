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

        if(date == 'all') {
            var elements = $("td[class^='date_']"),
                add_class = '',
                remove_class = '';

            if($("#toggle_date_all").hasClass('glyphicon-menu-up')) {
                add_class = 'glyphicon-menu-up';
                remove_class = 'glyphicon-menu-down';
            } else {
                add_class = 'glyphicon-menu-down';
                remove_class = 'glyphicon-menu-up';
            }

            $("i[id^='toggle_date_']").each(function() {
                $(this).removeClass(remove_class);
                $(this).addClass(add_class);
            });

        } else {
            var elements = $(".date_"+date);
        }

        elements.each(function() {
            if($(this).data('activity') != 'All') {
                if ($(this).is(':visible')) {
                    $(this).hide();
                } else {
                    $(this).show();
                }
            }
        });

        var arrow_direction = '';

        $("i[id^='toggle_date_']").each(function() {
            if(this.id != 'toggle_date_all') {
                if(arrow_direction === '') {
                    if($(this).hasClass('glyphicon-menu-down')) {
                        arrow_direction = 'glyphicon-menu-down';
                    } else {
                        arrow_direction = 'glyphicon-menu-up';
                    }
                } else {
                    if(arrow_direction && !$(this).hasClass(arrow_direction)) {
                        arrow_direction = false;
                    }
                }
            }
        });

        if(arrow_direction) {
            if(arrow_direction == 'glyphicon-menu-up') {
                $("#toggle_date_all").removeClass('glyphicon-menu-down');
                $("#toggle_date_all").addClass('glyphicon-menu-up');
            } else {
                $("#toggle_date_all").removeClass('glyphicon-menu-up');
                $("#toggle_date_all").addClass('glyphicon-menu-down');
            }

        }

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