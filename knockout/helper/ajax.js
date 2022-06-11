var page = require('page');

var Ajax = (function () {
  'use strict';

  function Ajax() {
    this.id = false;

    this.request = function(url, data = {}, model = false, type = 'get') {
      var that = this;

      return $.ajax({url: '//'+window.location.hostname+'/'+url,
              data: data,
              type: type,
              dataType: 'json',
              async: true,
              error: function(response) {
                if(!response.hasOwnProperty('status') ||
                   response.status === 200) {
                      page('/error/500');
                } else {
                      page('/error/'+response.status);
                }
              },
              success: function(response) {

              }
      });

    },

    this.set = function(model, data) {
      console.log("SET");
      console.log(model);
      console.log(data);

      var property = '';
      if(typeof model === 'object') {
        for(property in model) {
          if(model.hasOwnProperty(property) &&
            this.hasOwnProperty(property)) {
            this[property](model[property]);
          }
        }
      } else {
        for(property in this) {
          if(this.hasOwnProperty(property) &&
            ko.isObservable(this[property]) &&
            !ko.isComputed(this[property])) {
            this[property](false);
          }
        }
      }

    }

  }

  return Ajax;

})();

module.exports = new Ajax();
