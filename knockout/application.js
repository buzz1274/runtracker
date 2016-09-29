var Header = require('./partials/header.js'),
    Index = require('./views/index.js'),
    Register = require('./views/register.js'),
    Login = require('./views/login.js'),
    ErrorPage = require('./views/error_page.js'),
    ResetPassword = require('./views/reset_password.js'),
    Runs = require('./views/runs/index.js');

module.exports = (function() {
    'use strict';

    function Application() {
        this.page = 'register';
        this.href = '';

        this.pages = {
            'home': new Index(),
            'register': new Register(),
            'login': new Login(),
            'reset_password': new ResetPassword(),
            'runs': new Runs(),
            'error': new ErrorPage()
        };

        this.header = new Header();

        ko.track(this);

    }

    return Application;

})();