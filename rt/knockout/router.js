var page = require('page');

module.exports = (function () {
    'use strict';

    function Router(app) {
        this.app = app;
        page.base($('base').attr('href'));

        /*
        page('*', function (ctx, next) {
            app.href = ctx.pathname.substr(1);
            next();
        });
        */

        page('', function (ctx, next) {
            app.page = 'home';
            next();
        });

        page('register', function (ctx, next) {
            app.page = 'register';
            next();
        });

        page('login', function (ctx, next) {



            app.page = 'login';
            next();
        });

        /*
        page('*', function (ctx, next) {
            var errorPage = app.pages['error'];
            errorPage.code = 404;
            errorPage.message = 'Route Not Found';
            app.page = 'error';
        });
        */


        page();

    }

    return Router;

})();