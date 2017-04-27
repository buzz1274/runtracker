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
            $(this).removeClass('glyphicon-plus');
            $(this).addClass('glyphicon-minus');
            $(this).prop('title', 'Remove split');
          });

          row.after(clone.find('input:text').val('').end());

        }
      }

    }

    this.update_splits = function() {
      var total_distance = 0,
          total_time = 0;

      $('.segment').each(function () {
        var time = parseInt($(this).find('.minutes').val()),
            seconds = $(this).find('.seconds').val(),
            speed = parseFloat($(this).find('.speed').val());

        if(time && speed) {
          if (seconds) {
            time += parseFloat((seconds / 60).toFixed(2));
          }

          var distance = (speed / 60) * time;

          total_distance += distance;
          total_time += time;
        }

      });

      if(total_distance && total_time) {
        $('#total_distance').val(total_distance.toFixed(2));
        $('#average_pace_km_hr').val(((60 / total_time) * total_distance).toFixed(2));
        $('#average_pace_min_km').val((total_time / total_distance).toFixed(2));
        $('#total_time').val(total_time.toFixed(2));
      } else {
        $('#total_distance').val('');
        $('#average_pace_km_hr').val('');
        $('#average_pace_min_km').val('');
        $('#total_time').val('');
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
