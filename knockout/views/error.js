module.exports = (function () {
    'use strict';

    function Error() {
        this.title = 'Error';
        this.component = 'error_page';
        this.icon = 'warning';
        this.code = 500;
        this.message = '';

        this.SetError = function(errorCode) {
          this.code = errorCode;

          if(this.code === '500') {
            this.message = 'An error occurred';
          } else if(this.code === '404') {
            this.message = 'Not found';
          }

        }

        ko.track(this);
    }

    return Error;

})();
