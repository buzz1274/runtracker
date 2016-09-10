var ErrorPage = (function () {
    'use strict';

    function ErrorPage() {
        this.title = 'Error';
        this.component = 'error_page';
        this.icon = 'warning';
        this.code = 500;
        this.message = '';

        ko.track(this);
    }

    return ErrorPage;

})();

ko.components.register('error_page', {
    template: require('../templates/views/error_page.html'),
    viewModel: {
        createViewModel: function (params) {
            'use strict';
            return params instanceof ErrorPage ? params : ko.unwrap(params.option);
        }
    }
});

module.exports = ErrorPage;