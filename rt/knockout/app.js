require( 'bootstrap-webpack!./styles/bootstrap.config.js');
require('./styles/main.css');

var Application = function() {
    'use strict';

    this.headerNav = function() {
        
    };

    return this;

};

$(function() {
    'use strict';

    var app = new Application();

    console.log(app);

    ko.applyBindings(app, $('html')[0]);

    console.log("DONE");

});

module.exports = Application;