require( 'bootstrap-webpack!./styles/bootstrap.config.js');
require('./styles/main.css');

var Header = require('./views/header.js');

var Application = (function() {
    'use strict';

    function Application() {
        this.page = 'home';
        this.header = new Header();
    }

    return Application;

})();

$(function() {
    'use strict';

    var app = new Application();

    console.log(app);

    ko.applyBindings(app, $('html')[0]);
    
});

module.exports = Application;