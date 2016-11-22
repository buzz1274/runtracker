var Moment = require('moment');

var Runs = (function () {
    'use strict';

    function Runs() {
        this.component = 'runs';
        this.has_data = false;
        this.runs = ko.observableArray();
        this.selected_activites = ko.observableArray();
        this.summary = false;
        this.year = '';
        this.month = '';
        this.activity_types = false;

        var that = this;

        this.loadData = function(date = false) {
            var that = this;

            if(date) {
                if(date == 'all') {
                    this.year = '';
                    this.month = '';
                } else {
                    date = date ? date.split("-") : false;
                    this.year = date[0] ? date[0] : '';
                    this.month = this.year && date[1] ? date[1] : '';
                }
            }

            $('#ajax_loader').show();

            return $.ajax({url: '//'+window.location.hostname+'/api/',
                type: 'get',
                dataType: 'json',
                async: true,
                data: {year: that.year,
                       month: that.month,
                       activity_id: that.selected_activites.join()},
                success: function(data) {
                    if(data['activities'].length) {
                        that.has_data = true;
                    } else {
                        that.has_data = false;
                    }

                    that.runs = data['activities'];
                    that.summary = data['summary'];

                    $('#ajax_loader').hide();

                },
                failure: function() {
                    console.log("FAILURE");
                }
            });
        }

        this.filterActivities = function(id) {
            if(this.selected_activites.indexOf(id) == -1) {
                this.selected_activites.push(id);
            } else {
                this.selected_activites.remove(id);
            }
            return true;
        }

        this.flattenedActivityDisplay = function(activity) {
            if(this.year && this.month) {
                if (activity == 'All') {
                    return false;
                } else {
                    return true;
                }
            } else if(this.selected_activites.length == 1 && activity != 'All') {
                return true;
            } else if(activity == 'All' && this.selected_activites.length != 1) {
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

        this.loadActivityTypes = function() {
            var that = this;

            $.ajax({url: '//'+window.location.hostname+'/api/activities/type',
                type: 'get',
                dataType: 'json',
                async: true,
                success: function(data) {
                    that.activity_types = data;
                }
            });


        }

        this.loadActivityTypes();

        this.selected_activites.subscribe(function() {
            $(".dropdown").removeClass('open');
            that.loadData();
        });

        this.runs.subscribe(function() {
            //re-draw graph
        });

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