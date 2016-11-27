var Header = require('./partials/header.js'),
    Activities = require('./partials/activities.js'),
    PersonalBestsNav = require('./partials/personal_bests_nav.js'),
    Index = require('./views/index.js'),
    Register = require('./views/register.js'),
    Login = require('./views/login.js'),
    ErrorPage = require('./views/error_page.js'),
    ResetPassword = require('./views/reset_password.js'),
    Runs = require('./views/runs/index.js'),
    PersonalBests = require('./views/runs/personal_bests.js');

module.exports = (function() {
    'use strict';

    function Application() {
        this.page = 'register';
        this.href = '';
        this.display_left_nav = true;
        this.user = false;

        this.pages = {
            'home': new Index(),
            'register': new Register(),
            'login': new Login(),
            'reset_password': new ResetPassword(),
            'runs': new Runs(),
            'personal_bests': new PersonalBests(),
            'error': new ErrorPage()
        };

        this.header = new Header(this.user);
        this.personal_bests = new PersonalBestsNav(this.user);
        this.activities = new Activities(this.user);

        ko.track(this);

    }

    return Application;

})();