require( 'bootstrap-webpack!./styles/bootstrap.config.js');
require('./styles/main.css');

var Application = require('./application.js');

$(function() {
    'use strict';

    var app = new Application();

    ko.applyBindings(app, $('html')[0]);

});