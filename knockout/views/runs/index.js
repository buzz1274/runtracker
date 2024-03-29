var Moment = require('moment'),
    ActivityTypes = require('../../models/activity-type-model'),
    page = require('page'),
    Runs = (function () {
    'use strict';

    function Runs() {
        this.component = 'runs';
        this.page = page;
        this.has_data = false;
        this.runs = ko.observableArray();
        this.selected_activites = ko.observableArray();
        this.summary = false;
        this.year = '';
        this.month = '';
        this.activity_types = new ActivityTypes();
        this.activity_types = this.activity_types.activity_types;

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

            $.ajax({url: '//'+window.location.hostname+'/api/',
                type: 'get',
                dataType: 'json',
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
                error: function() {
                    $('#ajax_loader').hide();
                    page('/error/500');
                }
            });
        }

        this.filterActivities = function(id, parent_id) {
            var that = this;

            if(!id && !parent_id) {
                this.selected_activites.removeAll();
                this.loadData();

                return true;

            }

            if(this.selected_activites.indexOf(id) == -1) {
                this.selected_activites.push(id);

                if(!parent_id) {
                    $.each(this.activity_types, function (key, activity_type) {
                        if(activity_type.parent_id == id &&
                           that.selected_activites.indexOf(activity_type.id) == -1) {
                            that.selected_activites.push(activity_type.id);
                        }
                    });
                }

            } else {
                this.selected_activites.remove(id);

                if(!parent_id) {
                    $.each(this.activity_types, function (key, activity_type) {
                        if(activity_type.parent_id == id &&
                           that.selected_activites.indexOf(activity_type.id) != -1) {
                            that.selected_activites.remove(activity_type.id);
                        }
                    });
                }
            }

            if(parent_id) {
                var all_children_checked = true;

                $.each(this.activity_types, function (key, activity_type) {
                    if(activity_type.parent_id == parent_id) {
                        if(that.selected_activites.indexOf(activity_type.id) == -1) {
                            that.selected_activites.remove(parent_id);
                            all_children_checked = false;
                        }
                    }
                });

                if(all_children_checked) {
                    that.selected_activites.push(parent_id);
                }
            }

            this.loadData();

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
                return Moment(date).format('Do MMM, YYYY');
            }

        }

        this.selected_activites.subscribe(function() {
            $(".dropdown").removeClass('open');

            if(that.selected_activites.length >= 1) {
                $('#activity_filter_icon').addClass('red');
            } else {
                $('#activity_filter_icon').removeClass('red');
            }
        });

        this.runs.subscribe(function() {
            //re-draw graph
        });

        ko.track(this);

    }

    return Runs;

})();

ko.components.register('runs', {
    template: require('../../templates/runs/index.html'),
    viewModel: {
        createViewModel: function (params) {
            'use strict';

            return params instanceof Runs ? params : params.option;
        }
    }
});

module.exports = Runs;
