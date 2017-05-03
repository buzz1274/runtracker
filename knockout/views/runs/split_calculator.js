var SplitCalculator = (function () {
  'use strict';

  function SplitCalculator() {
    this.component = 'split_calculator';

    this.reset_splits = function() {
      $(':input').each(function () {
        $(this).val('');
      });
    }

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

        }
      }

    }

    this.update_splits = function() {
      var total_distance = 0,
          total_time = 0,
          total_time_display;

      $('.segment').each(function () {
        var time = parseInt($(this).find('.minutes').val()) * 60,
            seconds = parseInt($(this).find('.seconds').val()),
            speed = parseFloat($(this).find('.speed').val());

        if(time && speed) {
          if (seconds) {
            time += seconds;
          }

          var distance = ((speed / 60) / 60) * time;

          total_distance += distance;
          total_time += time;
        }

      });

      total_time_display = parseInt(total_time / 60) + ' minutes';

      if(total_time % 60) {
        total_time_display += ' ' + (total_time % 60) + ' seconds';
      }

      if(total_distance && total_time) {
        $('#total_distance').html(total_distance.toFixed(2) + ' Km');
        $('#average_pace_km_hr').html(((3600 / total_time) * total_distance).toFixed(2) + ' Km/hr');
        $('#average_pace_min_km').html(((total_time / 60) / total_distance).toFixed(2) + ' min/Km');
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

ko.components.register('split_calculator', {
  template: require('../../templates/views/runs/split_calculator.html'),
  viewModel: {
    createViewModel: function (params) {
      'use strict';
      return params instanceof SplitCalculator ? params : ko.unwrap(params.option);
    }
  }
});

module.exports = SplitCalculator;
