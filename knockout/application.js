require('./components/split-calculator-component.js');
require('./components/activity-add-component.js');
require('./components/activity-view-component.js');
require('./components/activity-nav-component.js');
require('./components/header-nav-component.js');
require('./components/index-component.js');

var User = require('./models/user-model.js'),
    HeaderNav = require('./views/partials/header-nav.js'),
    ActivityNav = require('./views/partials/activity-nav.js'),
    Activity = require('./views/activity.js'),
    PersonalBestsNav = require('./views/partials/personal-best-nav.js'),
    Index = require('./views/index.js'),
    Register = require('./views/register.js'),
    Login = require('./views/login.js'),
    ErrorPage = require('./views/error_page.js'),
    ResetPassword = require('./views/reset_password.js'),
    Runs = require('./views/runs/index.js'),
    SplitCalculator = require('./views/split-calculator.js'),
    PersonalBests = require('./views/runs/personal_bests.js');

module.exports = (function() {
    'use strict';

    function Application() {
        this.page = 'index';
        this.href = '';
        this.display_left_nav = true;
        this.user = new User();

        this.pages = {
            'index': new Index(),
            'register': new Register(),
            'login': new Login(),
            'reset_password': new ResetPassword(),
            'activity-add': new Activity('activity-add'),
            'activity-view': new Activity('activity-view'),
            'runs': new Runs(),
            'personal_bests': new PersonalBests(),
            'split-calculator': new SplitCalculator(),
            'error': new ErrorPage()
        };

        this.header = new HeaderNav(this.user);
        this.personal_bests_nav = new PersonalBestsNav(this.user);
        this.activity_nav = new ActivityNav(this.user);

        ko.track(this);

    }

    return Application;

})();
