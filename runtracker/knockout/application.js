var Header = require('./partials/header.js'),
    Index = require('./views/index.js'),
    Register = require('./views/register.js'),
    Login = require('./views/login.js');

module.exports = (function() {
    'use strict';

    function Application() {
        this.page = 'register';
        this.href = '';

        this.pages = {
            'home': new Index(),
            'register': new Register(),
            'login': new Login()
        };

        this.header = new Header();

        ko.track(this);

    }

    return Application;

})();