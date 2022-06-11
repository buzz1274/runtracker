require( 'bootstrap-webpack!./styles/bootstrap.config.js');
require('./styles/main.css');

var Application = require('./application.js'),
    Router = require('./router.js');

$(function() {
    'use strict';

    var app = new Application();

    new Router(app);

    ko.applyBindings(app, $('html')[0]);

});