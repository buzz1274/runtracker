module.exports = (function () {
  'use strict';

  function SplitCalculator() {
    this.component = 'split-calculator';

    this.reset_splits = function() {
      $(':input').each(function () {
        $(this).val('');
      });
      $('.cumulative_km').each(function() {
        $(this).html('');
      });
      $('.cumulative_pace').each(function() {
        $(this).html('');
      });
      $('.cumulative_time').each(function() {
        $(this).html('');
      });
    };

    this.add_split = function(data, event) {
      var element = $(event.target)

      if(element.hasClass('glyphicon')) {
        var row = element.closest('.segment');

        if(element.hasClass('glyphicon-minus')) {
          row.remove();
          this.update_splits();
        } else {
          var clone = row.clone();

          $('.glyphicon-plus').each(function() {
            if($(this).attr('id') === 'add_split') {
              $(this).removeClass('glyphicon-plus');
              $(this).removeAttr('id');
              $(this).removeAttr('tabindex');
              $(this).addClass('glyphicon-minus');
              $(this).prop('title', 'Remove split');
            }
          });

          row.after(clone.find('input:text').val('').end());
          row.after(clone.find('.cumulative_km').html('').end());
          row.after(clone.find('.cumulative_pace').html('').end());
          row.after(clone.find('.cumulative_time').html('').end());

        }
      }

    };

    this.update_splits = function() {
      var total_distance = 0,
          total_time = 0,
          distance = 0,
          average_pace_min_km = 0,
          total_time_display, average_pace_min_km_display;

      $('.segment').each(function () {
        var time = (parseInt($(this).find('.minutes').val()) || 0) * 60 +
                   (parseInt($(this).find('.seconds').val()) || 0),
            speed = parseFloat($(this).find('.speed').val());

        if(time && speed) {
          distance = ((speed / 60) / 60) * time;

          total_distance += distance;
          total_time += time;

          total_time_display = parseInt(total_time / 60) + ' minutes';

          if(total_time % 60) {
            total_time_display += ' ' + (total_time % 60) + ' seconds';
          }

          average_pace_min_km = parseInt((3600 / total_time) * total_distance).toFixed(2) + ' Km/hr';

          $(this).children().find('.cumulative_km').html(total_distance.toFixed(2));
          $(this).children().find('.cumulative_pace').html(average_pace_min_km);
          $(this).children().find('.cumulative_time').html(total_time_display);

        }

      });

      total_time_display = parseInt(total_time / 60) + ' minutes';
      average_pace_min_km = parseInt(total_time / total_distance);
      average_pace_min_km_display = parseInt(average_pace_min_km / 60) + ' minutes';

      if(total_time % 60) {
        total_time_display += ' ' + (total_time % 60) + ' seconds';
      }

      if(parseInt(average_pace_min_km % 60)) {
        average_pace_min_km_display += ' ' +
          parseInt(average_pace_min_km % 60) + ' seconds';
      }

      average_pace_min_km_display += ' per Km';

      if(total_distance && total_time) {
        $('#total_distance').html(total_distance.toFixed(2) + ' Km');
        $('#average_pace_km_hr').html(((3600 / total_time) * total_distance).toFixed(2) + ' Km/hr');
        $('#average_pace_min_km').html(average_pace_min_km_display);
        $('#total_time').html(total_time_display);
      } else {
        $('#total_distance').html('-');
        $('#average_pace_km_hr').html('-');
        $('#average_pace_min_km').html('-');
        $('#total_time').html('-');
      }

    }

    ko.track(this);

  }

  return SplitCalculator;

})();
