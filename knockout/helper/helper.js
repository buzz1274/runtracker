let Helper = (function () {
    'use strict';

    this.overlay = function (show, show_spinner) {
        if(!show) {
            $('#ajax_loader').hide();
        } else {
            $('#ajax_loader').show();
            if(show_spinner) {
                $('#loader_spinner').show();
            } else {
                $('#loader_spinner').hide();
            }
        }
    };

});

module.exports = new Helper();
