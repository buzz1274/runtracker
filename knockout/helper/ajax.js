var page = require('page');

var Ajax = (function () {
  'use strict';

  function Ajax() {
    this.id = false;

    this.request = function(url, data = {}, type = 'get') {

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
                     }
             });
    };



  }

  return Ajax;

})();

module.exports = new Ajax();
