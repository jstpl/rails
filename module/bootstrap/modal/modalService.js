$(function () {

    namespace.define('bundle.module.bootstrap.modal');

    var helper = {
        renderHeader: function (content) {
            var closeButtonHtml = '<button type="button" class="close" data-dismiss="modal" aria-label="Закрыть"><span aria-hidden="true">×</span></button>';
            var titleHeaderHtml = '<h4 class="modal-title">'+content+'</h4>';
            return '<div class="modal-header">'+closeButtonHtml+titleHeaderHtml+'</div>';
        },
        renderBody: function (content) {
            return  '<div class="modal-body">'+content+'</div>';
        },
        renderFooter: function (content) {
            return '<div class="modal-footer">'+content+'</div>';
        },
    };

    bundle.module.bootstrap.modal.modalService = {
        show: function (data, options) {
            var contentHtml = '';
            if(data.title) {
                contentHtml = contentHtml + helper.renderHeader(data.title);
            }
            if(data.body) {
                contentHtml = contentHtml + helper.renderBody(data.body);
            }
            if(data.foot) {
                contentHtml = contentHtml + helper.renderFooter(data.foot);
            }

            var modalEl = $('#myModal');
            modalEl.find('.modal-content').html(contentHtml);
            modalEl.modal();
        },
    };

});