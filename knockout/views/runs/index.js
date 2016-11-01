var Moment = require('moment');

var Runs = (function () {
    'use strict';

    function Runs() {
        this.component = 'runs';
        this.has_data = false;
        this.runs = ko.observableArray();
        this.year = '';
        this.month = '';
        this.activity_id = false;

        this.filterActivities = function(activity_id) {
            console.log("FILTER Act");
            this.loadData(activity_id, false);

            return true;

        }

        this.loadData = function(activity_id, date) {
            var that = this;

            date = date ? date.split("-") : false;
            this.year = date[0] ? date[0] : '';
            this.month = this.year && date[1] ? date[1] : '';

            console.log()

            this.activity_id = activity_id;

            return $.ajax({url: 'http://dev.runtracker.zz50.co.uk/api/',
                type: 'get',
                dataType: 'json',
                async: true,
                data: {year: that.year,
                    month: that.month,
                    activity_id: activity_id},
                success: function(data) {
                    if(data.length) {
                        that.has_data = true;
                    } else {
                        that.has_data = false;
                    }

                    that.runs = data;
                }
            });
        }

        this.flattenedActivityDisplay = function(activity) {
            if(this.year && this.month) {
                if (activity == 'All') {
                    return false;
                } else {
                    return true;
                }
            } else if(this.activity_id && activity != 'All') {
                return true;
            } else if(activity == 'All' && !this.activity_id) {
                return true;
            } else {
                return false;
            }
        }

        this.toggleActivityData = function(date) {
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

        this.formatDate = function(date) {
            var d = date.split('-');

            if(d.length == 1) {
                return date;
            } else if(d.length == 2) {
                return Moment(date).format('MMMM YYYY');
            } else {
                return Moment(date).format('MMMM D, YYYY');
            }

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