module.exports = (function () {
  'use strict';

  function User() {
    this.user_id = ko.observable(false);

    this.authenticate = function() {
      this.user_id(1);
    }

    this.logout = function() {
      this.user_id(0);
    }

    var that = this;

    setTimeout(function() { that.authenticate(); }, 1000);


  }

  return User;

})();
