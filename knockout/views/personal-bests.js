var page = require('page');

module.exports = (function () {
    'use strict';

    function PersonalBests() {
        this.component = 'personal-bests';
        this.activities = ko.observableArray();
        this.title = false

        this.loadData = function(personal_best_id) {
            var that = this;

            $('#ajax_loader').show();

            $.ajax({url: '//'+window.location.hostname+'/api/activities/personal_best',
                    type: 'get',
                    dataType: 'json',
                    data: {personal_best_id: personal_best_id},
                success: function(data) {
                    that.activities = data['activities'];
                    that.title = data['title'];

                    $('#ajax_loader').hide();

                },
                error: function() {
                    $('#ajax_loader').hide();
                    page('/error/500');
                }
            });
        }

        ko.track(this);

    }

    return PersonalBests;

})();
