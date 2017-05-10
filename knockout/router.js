var page = require('page');

module.exports = (function () {
  'use strict';

  function Router(app) {
    page.base('/');

    page('', function() {
      app.page = 'home';
      app.display_left_nav = false;
    });

    page('register', function() {
      app.page = 'register';
      app.display_left_nav = false;
    });

    page('login', function() {
      app.page = 'login';
      app.display_left_nav = false;
    });

    page('reset_password', function() {
      app.page = 'reset_password';
      app.display_left_nav = false;
    });

    page('split_calculator', function() {
      app.page = 'split-calculator';
      app.display_left_nav = true;
    });

    /*
    page('activity/add', function() {
      console.log("HERE");
      //app.pages['activity-view'].activity.load(ctx.params.activity_id);

      app.page = 'activity-view';
      app.display_left_nav = true;
    });
    */

    page('activity/:activity_id', function(ctx) {
      if(ctx.params.activity_id === 'add') {
        app.page = 'activity-add';
      } else {
        app.page = 'activity-view';
        app.pages['activity-view'].activity.load(ctx.params.activity_id);

      }

      app.display_left_nav = true;

    });

        page('activities/personal_best/:personal_best_id/', function(ctx) {
            app.pages.personal_bests.loadData(ctx.params.personal_best_id);

            app.page = 'personal_bests';
            app.display_left_nav = true;

        });

        page('runs/:date?/', function(ctx) {
            var date = ctx.params.date;

            if(!date) {
                date = 'all';
            }

            app.pages.runs.loadData(date);

            app.page = 'runs';
            app.display_left_nav = true;

        });

        page('error/:code', function(ctx) {
            var error = app.pages.error;

            error.SetError(ctx.params.code);
            app.page = 'error';
            app.display_left_nav = false;

        });

        page('*', function() {
          page('/error/404');
          app.display_left_nav = false;
        });

        page();

    }

    return Router;

})();
