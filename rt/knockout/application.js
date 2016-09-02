var Header = require('./views/header.js'),
    Index = require('./views/index.js');

module.exports = (function() {
    'use strict';

    function Application() {
        this.page = new Index();
        this.header = new Header();
    }

    return Application;

})();